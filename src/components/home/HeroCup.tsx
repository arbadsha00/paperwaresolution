// src/components/home/HeroCup.tsx
import { Environment, View, PerspectiveCamera } from "@react-three/drei";
import { PaperCup } from "./PaperCup";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { int } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function HeroCup() {
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
        gsap.to(cup.rotation, {
          y: "+=6.28319",
          duration: 10,
          repeat: -1,
          ease: "linear",
        });

     gsap.to(cup.rotation, {
        y: "+=6.28", // Rotate 360 degrees
        repeat: -1, // Infinite loop
        duration: 8, // Rotation duration
        ease: "circ.inOut", // No easing for continuous rotation
      });

        const handleMouseMove = (event: MouseEvent) => {
          const x = (event.clientX / window.innerWidth - 0.5) * 2;
          const y = (event.clientY / window.innerHeight - 0.5) * -2;

          gsap.to(cup.rotation, {
            x: y * -0.1,
            z: x * 0.1,
            duration: 0.7,
            ease: "power2.out",
          });
        };

        document.addEventListener("mousemove", handleMouseMove);

        const heroTimeline = gsap.timeline({
          delay: 1,
          scrollTrigger: "#hero-paper",
        });
        heroTimeline.from(document.querySelector("#hero-paper"), {
          duration: 0.8,
          scale: 0,
          marginBottom: 0,
          autoAlpha: 0,
        });
        const heroTitle = new SplitType("#hero-title", { types: "words" });
        heroTimeline.from(heroTitle.words, {
          duration: 0.7,
          y: 20,
          autoAlpha: 0,
          stagger: 0.15,
        });
        const heroDescription = new SplitType("#hero-description", {
          types: "words",
        });
        heroTimeline.from(heroDescription.words, {
          duration: 1,
          x: 20,
          autoAlpha: 0,
          stagger: 0.1,
        });

        heroTimeline.from(viewRef.current, {
          duration: 0.7,
          y: 200,
          autoAlpha: 0,
        });
        heroTimeline.from(
          cup.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
          },
          "<"
        );
        heroTimeline.from("#hero-download-brochure", {
          duration: 0.5,
          y: 100,
          autoAlpha: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-download-brochure",
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          viewRef.current,
          {
            top: "33vh",
            right: "50%",
            left: "unset",
            translateX: "50%", // this must be reversed to look right
            zIndex: 10,
          },
          {
            right: 0,
            left: "unset",
            translateX: "15%",
            top: "unset",
            bottom: 0,
            duration: 3,
            zIndex: -200,
            ease: "power2.inOut",
          }
        );
        // tl.to(
        //   cup.scale,
        //   {
        //     x: 8,
        //     y: 8,
        //     z: 8,
        //     duration: 3,
        //     ease: "power2.inOut",
        //   },
        //   "<"
        // );

        tl.to(
          camera.rotation,
          {
            z: -0.5,
            duration: 3,
            ease: "power2.inOut",
          },
          "<"
        );

        tl.to(
          camera.position,
          {
            y: 5,
            z: 3.3,
            duration: 3,
            ease: "power2.inOut",
          },
          "<"
        );
        ScrollTrigger.refresh();
        // Cleanup
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
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
      ref={viewRef}
      id="hero-paper"
      className="absolute z-10 top-[33vh] right-1/2 translate-x-1/2 min-w-40 min-h-40 max-w-5xl max-h-[64rem] size-[60vh] place-items-center place-content-center select-none pointer-events-none "
    >
      <PerspectiveCamera
        ref={cameraRef} // Use a ref to access the camera
        makeDefault
        fov={75}
        aspect={1} // you can also dynamically compute this with window.innerWidth/window.innerHeight or use 'useThree'
        near={0.1}
        far={1000}
        position={[0, 3.7, 4]}
        rotation={[-0.4, 0, 0]}
      />
      <Environment files="/courtyard_1k.hdr" />
      {/* <ambientLight intensity={0.5} /> */}
      <PaperCup ref={paperCupRef} scale={10} />
    </View>
  );
}
