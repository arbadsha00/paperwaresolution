import React, { forwardRef, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
type PrimitiveProps = React.ComponentProps<"group">;

export const Cup3_3d = forwardRef<THREE.Group, PrimitiveProps>((props, ref) => {
  const { nodes } = useGLTF("/doubleWall_cup.glb") as any;
  const texture = useTexture("./textures/texture-8.webp");
  const material1 = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0,
      metalness: 0,
    });
  }, []);

  const material3 = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xe2e2e2,
      roughness: 0,
    });
  }, []);

  const material2 = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      color: new THREE.Color(1, 1, 1),
      roughness: 0.5,
      metalness: 0,
    });
  }, [texture]);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        name="Paper_Cup_Top"
        castShadow
        receiveShadow
        geometry={nodes.Paper_Cup_Top.geometry}
        material={material1}
      />
      <mesh
        name="Paper_Cup_Bottom"
        castShadow
        receiveShadow
        geometry={nodes.Paper_Cup_Bottom.geometry}
        material={material3}
      />
      <mesh
        name="Paper_Cup_Body"
        castShadow
        receiveShadow
        geometry={nodes.Paper_Cup_Body.geometry}
        material={material2}
      />
    </group>
  );
});

useGLTF.preload("/doubleWall_cup.glb");
