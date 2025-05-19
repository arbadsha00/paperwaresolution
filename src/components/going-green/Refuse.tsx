// src/components/home/HeroCup.tsx
import {
  Environment,
  View,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import * as THREE from "three";
import { Refuse_3d } from "./Refuse_3d";
gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function Refuse() {
  const viewRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <View
      id="refuse-3d"
      className="size-[140px] md:size-[180px] pointer-events-auto absolute"
      ref={viewRef}
    >
      <PerspectiveCamera
        ref={cameraRef} // Use a ref to access the camera
        makeDefault
        fov={75}
        aspect={1} // you can also dynamically compute this with window.innerWidth/window.innerHeight or use 'useThree'
        near={0.1}
        far={1000}
        position={[0, 0, 1]}
      />
      <ambientLight intensity={1.25} />
      <Environment files="/courtyard_1k.hdr" />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.01}
        screenSpacePanning={false}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <Refuse_3d rotation={[0, 0.5, 0]} scale={5} />
    </View>
  );
}
