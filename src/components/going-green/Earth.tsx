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
import { useRef } from "react";
import * as THREE from "three";
import { Earth_3d } from "./Earth_3d";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function Earth() {
  const viewRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <View
      id="earth-3d"
      className="w-[85vw] h-auto max-w-[512px] mx-auto aspect-square z-5 pointer-events-auto overflow-visible relative"
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
      <Environment files="/courtyard_1k.hdr" environmentIntensity={0.85} />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.01}
        screenSpacePanning={false}
        enableZoom={false}
        enablePan={false}
      />
      <Earth_3d rotation={[0, 2, 1]} scale={11.5} />
    </View>
  );
}
