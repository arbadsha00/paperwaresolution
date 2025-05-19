import React, { forwardRef} from "react";
import { useGLTF} from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type PrimitiveProps = React.ComponentProps<"group">;

export const Recycle_3d = forwardRef<THREE.Group, PrimitiveProps>(
  (props, ref) => {
    const { nodes, materials } = useGLTF("/recycle.glb") as any;
    // Reference for main group animation
    const groupRef = useRef<THREE.Group>(null);
     // Apply GSAP animation with useEffect
     useEffect(() => {
       if (!groupRef.current) return;
   
       // Rotate Earth endlessly
       const tween = gsap.to(groupRef.current.rotation, {
         y: "+=6.2831", // ≈ 2 * PI radians for full rotation
         repeat: -1, // infinite loop
         duration: 30, // 30 seconds per full rotation
         ease: "none", // linear
       });
   
       return () => {
         tween.kill(); // Clean up on unmount
       };
     }, []);
    return (
        <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.111}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['Material.003']}
        position={[0, 0, 0.018]}
        rotation={[-1.608, -1.007, -3.111]}
        scale={0.016}
      />
    </group>
    );
  }
);

useGLTF.preload("/recycle.glb");
