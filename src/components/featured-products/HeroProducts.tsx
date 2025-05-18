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
import { HeroProducts_3d } from "./HeroProducts_3d";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function HeroProducts() {
  const paperCupRef = useRef<THREE.Group>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
 
  return (
    <View
      id="products-3d"
      className="w-full h-auto aspect-square z-5 pointer-events-auto relative"
      ref={viewRef}
    >
      <PerspectiveCamera
        ref={cameraRef} // Use a ref to access the camera
        makeDefault
        fov={75}
        aspect={1} // you can also dynamically compute this with window.innerWidth/window.innerHeight or use 'useThree'
        near={0.1}
        far={1000}
        position={[0, 0.3, 1]}
      />
      <Environment files="/courtyard_1k.hdr" />
  <OrbitControls
        enableDamping={true}
        dampingFactor={0.04}
        screenSpacePanning={false}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 14}
        maxAzimuthAngle={Math.PI / 14}
        target={[0, 0.15, 0]}
      />
      <HeroProducts_3d scale={1.4} />
      <ContactShadows opacity={0.6 } scale={3} />
    </View>
  );
}
