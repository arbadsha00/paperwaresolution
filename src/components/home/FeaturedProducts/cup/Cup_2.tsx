// src/components/home/HeroCup.tsx
import { Environment, View, PerspectiveCamera } from "@react-three/drei";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PaperCup } from "../../PaperCup";
import { Cup2_3d } from "./Cup2_3d";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function Cup_2() {
  const paperCupRef = useRef<THREE.Group>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  useEffect(() => {
    let animationFrame: number;
    let mounted = true;

    const waitForRef = () => {
      if (
        paperCupRef.current &&
        mounted &&
        viewRef.current &&
        cameraRef.current
      ) {
        const cup = paperCupRef.current;
          const camera = cameraRef.current;
           const tl = gsap.timeline({
                    scrollTrigger: {
                      trigger: "#featured-cup-2",
                      start: "top 70%",
                      toggleActions: "play none none reverse",
                    },
                  });
                  tl.from(cup.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                    delay: 0.3,
                  });

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

        // Mouse movement effect for specific cup
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
        const container = document.getElementById("featured-cup-2");
        container?.addEventListener("mouseenter", () => {
          document.addEventListener("mousemove", onMouseMove);
        });

        container?.addEventListener("mouseleave", () => {
          document.removeEventListener("mousemove", onMouseMove);
        });

        // Cleanup
        return () => {
          document.removeEventListener("mousemove", onMouseMove);
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
      id="featured-cup-2"
      className="relative z-10 aspect-square w-full h-auto lg:max-w-[339px] max-w-md mx-auto"
      data-aos="fade-up"
      data-aosdelay={1.3}
      data-aosstart="top center"
      ref={viewRef}
    >
      <PerspectiveCamera
        ref={cameraRef} // Use a ref to access the camera
        makeDefault
        fov={50}
        aspect={1} // you can also dynamically compute this with window.innerWidth/window.innerHeight or use 'useThree'
        near={0.1}
        far={1000}
        position={[0, 3.5, 5]}
        rotation={[-0.3, 0, 0]}
      />
      <Environment files="/courtyard_1k.hdr" />

      <Cup2_3d ref={paperCupRef} scale={10} />
    </View>
  );
}
