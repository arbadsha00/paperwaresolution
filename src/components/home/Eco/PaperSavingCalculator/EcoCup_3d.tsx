import React, { forwardRef, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

type PrimitiveProps = React.ComponentProps<"group">;

export const EcoCup_3d = forwardRef<THREE.Group, PrimitiveProps>(
  (props, ref) => {
    const { nodes } = useGLTF("/Paper_Cup.glb") as any;
    const texture = useTexture("./textures/texture-5.webp");

    const material1 = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0,
        metalness: 0,
      });
    }, []);

    const texturedMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.5,
        metalness: 0.1,
      });
    }, [texture]);
    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Paper_Cup_Top as THREE.Mesh).geometry}
          material={material1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Paper_Cup_Bottom as THREE.Mesh).geometry}
          material={material1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Paper_Cup_Body as THREE.Mesh).geometry}
          material={texturedMaterial}
        />
      </group>
    );
  }
);

useGLTF.preload("/Paper_Cup.glb");
