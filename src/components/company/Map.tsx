// src/components/home/HeroCup.tsx
import {
  Environment,
  View,
  PerspectiveCamera,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Map_3d } from "./Map_3d";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function Map() {
  const groupRef = useRef<THREE.Group>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let hoveredObject: THREE.Object3D | null = null;
  let lastHoveredObject: THREE.Object3D | null = null;
  useEffect(() => {
    let animationFrame: number;
    let mounted = true;

    const waitForRef = () => {
      if (groupRef.current && mounted && viewRef.current && cameraRef.current) {
        function setupInteractivity() {
          const container = viewRef.current;
          const map = groupRef.current;
          const camera = cameraRef.current;

          if (!map || !container || !camera) return;

          container.addEventListener("mousemove", (event) => {
            if (!map || !camera) return;

            const rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(map.children, true);

            const object = intersects.length > 0 ? intersects[0].object : null;

            if (object) {
              if (hoveredObject === object) {
                if (object.name !== lastHoveredObject?.name) {
                  showPopup(object.name || "Unnamed section");
                }
                return;
              }

              // New object hovered
              if (hoveredObject) resetObjectAppearance(hoveredObject);

              hoveredObject = object;
              highlightObject(hoveredObject);
              showPopup(hoveredObject.name || "Unnamed section");

              lastHoveredObject = hoveredObject;
            } else if (hoveredObject) {
              // Mouse left all objects
              resetObjectAppearance(hoveredObject);
              hoveredObject = null;
              hidePopup();
            }
          });

          // Hide when mouse leaves container
          container.addEventListener("mouseleave", () => {
            if (hoveredObject) {
              resetObjectAppearance(hoveredObject);
              hoveredObject = null;
              hidePopup();
            }
          });
        }

        function highlightObject(obj: THREE.Object3D) {
          if (!(obj instanceof THREE.Mesh)) return;

          // Clone the material if not already cloned
          if (!obj.userData.originalMaterial) {
            obj.userData.originalMaterial = obj.material.clone();
            obj.material = obj.material.clone(); // Important: assign the clone so changes only apply to this mesh
            obj.userData.originalPosition = obj.position.clone();
          }

          const highlightColor = new THREE.Color(0xffd753);
          const heightIncrease = 0.2;

          gsap.to(obj.material.color, {
            r: highlightColor.r,
            g: highlightColor.g,
            b: highlightColor.b,
            duration: 0.5,
          });

          gsap.to(obj.position, {
            y: obj.userData.originalPosition.y + heightIncrease,
            duration: 0.5,
          });
        }

        function resetObjectAppearance(obj: THREE.Object3D) {
          if (!(obj instanceof THREE.Mesh)) return;

          if (obj.userData.originalMaterial) {
            gsap.to(obj.material.color, {
              r: obj.userData.originalMaterial.color.r,
              g: obj.userData.originalMaterial.color.g,
              b: obj.userData.originalMaterial.color.b,
              duration: 0.5,
            });
          }

          if (obj.userData.originalPosition) {
            gsap.to(obj.position, {
              y: obj.userData.originalPosition.y,
              duration: 0.5,
            });
          }
        }

        function hidePopup() {
          const popup = document.getElementById(
            "company-coverage-area-location"
          ) as HTMLElement | null;
          if (popup) {
            gsap.to(popup, {
              opacity: 0,
              duration: 0.5,
            });
          }
        }

        function showPopup(sectionName: string) {
          const popup = document.getElementById(
            "company-coverage-area-location"
          ) as HTMLElement | null;

          if (popup && typeof sectionName !== "undefined") {
            popup.textContent = sectionName;
            gsap.to(popup, {
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
            });
          }
        }

        setupInteractivity();

        return () => {
          const container = viewRef.current;
          if (container) {
            container.removeEventListener("mousemove", () => {});
            container.removeEventListener("mouseleave", () => {});
          }
        };
      } else {
        animationFrame = requestAnimationFrame(waitForRef);
      }
    };

    waitForRef();

    return () => {
      mounted = false;
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <View
      id="map-3d"
      className="w-[95vw] max-w-[900px] mx-auto aspect-square z-5 pointer-events-auto overflow-visible relative"
      ref={viewRef}
    >
      <PerspectiveCamera
        ref={cameraRef} // Use a ref to access the camera
        makeDefault
        fov={75}
        aspect={1} // you can also dynamically compute this with window.innerWidth/window.innerHeight or use 'useThree'
        near={0.1}
        far={1000}
        position={[8, 18, 1]}
      />
      <Environment files="/courtyard_1k.hdr" />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        screenSpacePanning={false}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 4}
      />
      <ContactShadows scale={20} opacity={0.5} blur={3} />
      <Map_3d ref={groupRef} rotation={[0, Math.PI / 1.8, 0]} scale={1.4} />
    </View>
  );
}
