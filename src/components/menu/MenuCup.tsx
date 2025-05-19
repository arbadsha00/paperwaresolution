// src/components/home/HeroCup.tsx

import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Cup2_3d } from "../home/FeaturedProducts/cup/Cup2_3d";
import Loading from "../Loading";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function MenuCup() {
  const paperCupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    let mounted = true;

    const waitForRef = () => {
      const cup = paperCupRef.current;

      if (cup && mounted) {
        gsap.to(cup.rotation, {
          y: "+=6.28319",
          duration: 10,
          repeat: -1,
          ease: "linear",
        });

        gsap.to(cup.position, {
          y: "+=0.1",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        // Mouse movement effect
        const onMouseMove = (event: MouseEvent) => {
          const x = (event.clientX / window.innerWidth - 0.5) * 2;
          const y = (event.clientY / window.innerHeight - 0.5) * -2;

          gsap.to(cup.rotation, {
            x: y * -0.1,
            z: x * 0.1,
            duration: 0.7,
            ease: "power2.out",
          });
        };

        const container = document.getElementById("menu-cup-container");
        container?.addEventListener("mouseenter", () => {
          document.addEventListener("mousemove", onMouseMove);
        });

        container?.addEventListener("mouseleave", () => {
          document.removeEventListener("mousemove", onMouseMove);
        });

        return () => {
          document.removeEventListener("mousemove", onMouseMove);
        };
      } else {
        requestAnimationFrame(waitForRef);
      }
    };

    waitForRef();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      id="menu-cup-container"
      className="absolute top-2/5 -translate-y-1/2 translate-x-1/2 right-8 -z-0 !aspect-square w-full max-w-2xl"
      >
     
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera
            
            makeDefault
            fov={50}
            aspect={1}
            near={0.1}
            far={1000}
            position={[0, 3.5, 5]}
            rotation={[-0.3, 0, 0]}
          />
          <Environment files="/courtyard_1k.hdr" />
          <Cup2_3d ref={paperCupRef} scale={10} />
        </Suspense>
      </Canvas>
    </div>
  );
}
