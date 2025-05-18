import React, { forwardRef, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type PrimitiveProps = React.ComponentProps<"group">;

export const Earth_3d = forwardRef<THREE.Group, PrimitiveProps>((props) => {
  const { nodes, materials } = useGLTF("/Earth.glb") as any;
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

  const texture = useTexture("./textures/earth.avif");
  const texturedMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.5,
      metalness: 0.1,
    });
  }, [texture]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere004.geometry}
        material={materials.water}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere004_1.geometry}
        material={texturedMaterial}
        scale={0.99}
      />
    </group>
  );
});

useGLTF.preload("/Earth.glb");
