import * as THREE from "three";
import React, { forwardRef, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
type PrimitiveProps = React.ComponentProps<"group">;

export const Cup2_3d = forwardRef<THREE.Group, PrimitiveProps>((props, ref) => {
  const { nodes } = useGLTF("/ripple_cup7.glb") as any;
  const normalMap = useTexture("/map512.webp");
  useMemo(() => {
    if (normalMap) {
      normalMap.wrapS = THREE.RepeatWrapping;
      normalMap.wrapT = THREE.RepeatWrapping;
      normalMap.colorSpace = THREE.LinearSRGBColorSpace;
      normalMap.center.set(0.5, 0.5);
      normalMap.rotation = Math.PI;
      normalMap.repeat.set(1, 1);
    }
  }, [normalMap]);

  const material1 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0,
        metalness: 0,
      }),
    []
  );

  const material2 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xe05100,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(1, -1),
        roughness: 0.5,
        metalness: 0,
      }),
    [normalMap]
  );
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        name="Paper_Cup_Top"
        castShadow
        receiveShadow
        geometry={nodes.Paper_Cup_Top.geometry}
              material={material1}
               position={[0, -0.01, 0]}
        scale={0.975}
      />
      <mesh
        name="Paper_Cup_Body"
        castShadow
        receiveShadow
        geometry={nodes.Paper_Cup_Body.geometry}
        material={material2}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.132}
      />
    </group>
  );
});

useGLTF.preload("/ripple_cup7.glb");
