import React, { forwardRef, useMemo, useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

type PrimitiveProps = React.ComponentProps<"group">;

export const Map_3d = forwardRef<THREE.Group, PrimitiveProps>((props, ref) => {
  const { nodes } = useGLTF("/map4.glb") as any;

  const texture = useTexture("/textures/paper.webp");

  const createMaterial = () =>
    new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 1,
      roughness: 1,
    });

  // Highlight and Reset Functions

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        name="Rajshahi"
        geometry={nodes.Rajshahi.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Rangpur"
        geometry={nodes.Rangpur.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Mymensing"
        geometry={nodes.Mymensing.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Sylhet"
        geometry={nodes.Sylhet.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Dhaka"
        geometry={nodes.Dhaka.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Khulna"
        geometry={nodes.Khulna.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Chittagong"
        geometry={nodes.Chittagong.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Barisal"
        geometry={nodes.Barisal.geometry}
        material={createMaterial()}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

useGLTF.preload("/map4.glb");
