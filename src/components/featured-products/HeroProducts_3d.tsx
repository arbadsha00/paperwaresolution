import React, { forwardRef, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type PrimitiveProps = React.ComponentProps<"group">;

export const HeroProducts_3d = forwardRef<THREE.Group, PrimitiveProps>(
  (props, ref) => {
    const { nodes, materials } = useGLTF("/fp2c.glb") as any;
    // Reference for main group animation
    const groupRef = useRef<THREE.Group>(null);

    // Apply GSAP animation with useEffect
    useEffect(() => {
      if (!groupRef.current) return;
      const t1 = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: 2.5, ease: "power1.inOut" },
      });
      t1.to(groupRef.current.rotation, { y: -0.1 }).to(
        groupRef.current.rotation,
        { y: 0.1 }
      );
      return () => {
        t1.kill();
      };
    }, []);

    return (
      <group ref={groupRef} {...props} dispose={null}>
        <group position={[0.039, 0.001, 0.071]} rotation={[0, -0.195, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["bag-0241-Handles"].geometry}
            material={materials.Handles}
            position={[-0.052, -0.001, -0.062]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Shoppingbag-2"].geometry}
            material={materials["Material.005"]}
            position={[-0.052, -0.001, -0.062]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Meatbox.geometry}
          material={materials["Material.010"]}
          position={[-0.008, 0, 0]}
          rotation={[0, Math.PI / 6, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box-1"].geometry}
          material={materials["Material.011"]}
          rotation={[0, -0.216, 0]}
        />
        <group position={[-0.262, 0.165, -0.148]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Burgerbox-4"].geometry}
            material={materials["Material.014"]}
            position={[0.262, -0.165, 0.148]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Pizzabox-2"].geometry}
          material={materials["Material.003"]}
          position={[-0.008, 0, 0]}
          rotation={[0, 0.095, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Pizzabox-3"].geometry}
          material={materials["Material.004"]}
          position={[-0.008, 0, 0]}
          rotation={[0, 0.149, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Pizzabox-1"].geometry}
          material={materials["Material.002"]}
          position={[-0.008, 0, 0]}
          rotation={[0, -0.761, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Pizzabox-4"].geometry}
          material={materials["Material.009"]}
          rotation={[0, 1.061, 0]}
        />
        <group position={[-0.15, 0.165, -0.148]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Burgerbox-3"].geometry}
            material={materials["Material.013"]}
            position={[0.15, -0.165, 0.148]}
          />
        </group>
        <group position={[-0.209, 0.064, 0.086]} rotation={[0, -0.47, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Burgerbox-1"].geometry}
            material={materials["Material.008"]}
            position={[0.147, -0.064, -0.171]}
          />
        </group>
        <group
          position={[-0.145, 0.228, -0.134]}
          rotation={[-0.078, 0.821, 0.01]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Burgerbox-2002"].geometry}
            material={materials["Material.015"]}
            position={[0.011, -0.238, 0.185]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box-2"].geometry}
          material={materials["Material.012"]}
          rotation={[0, 0.2, 0]}
        />
        <group position={[0.141, 0, -0.019]} rotation={[0, -0.168, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["bag-024-Handles"].geometry}
            material={materials.Handles}
            position={[-0.136, 0, 0.042]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Shoppingbag-1"].geometry}
            material={materials["Material.001"]}
            position={[-0.136, 0, 0.042]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Paper_Cup_Top.geometry}
          material={materials.paper_cup_mat}
          scale={0.311}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Paper_Cup_Bottom.geometry}
          material={materials.paper_cup_mat}
          scale={0.311}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Papercup.geometry}
          material={materials["Material.006"]}
          position={[0.001, 0.051, 0.148]}
          rotation={[Math.PI, -0.674, Math.PI]}
          scale={0.311}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.window001.geometry}
          material={materials["Material.017"]}
          position={[-0.006, -0.001, -0.005]}
          rotation={[0, 0.804, 0]}
        />
      </group>
    );
  }
);

useGLTF.preload("/fp2c.glb");
