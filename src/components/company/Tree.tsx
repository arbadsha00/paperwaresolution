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
import { Tree_3d } from "./Tree_3d";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function Tree() {
  const viewRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <View
      id="tree-3d"
      className="w-[95vw] max-w-[400px] aspect-square mx-auto -mt-[10%]  pointer-events-auto overflow-visible z-30"
      ref={viewRef}
    >
      <PerspectiveCamera
        ref={cameraRef} // Use a ref to access the camera
        makeDefault
        fov={75}
        aspect={1} // you can also dynamically compute this with window.innerWidth/window.innerHeight or use 'useThree'
        near={0.1}
        far={1000}
        position={[0, 0, 12]}
      />
      <Environment files="/courtyard_1k.hdr" />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        screenSpacePanning={false}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        target={[0, 12, 0]} // Center the target
      />

      <Tree_3d scale={1.3} />
    </View>
  );
}
