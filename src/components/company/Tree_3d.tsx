import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type PrimitiveProps = React.ComponentProps<"group">;

export const Tree_3d = forwardRef<THREE.Group, PrimitiveProps>(
  (props, ref) => {
    const { nodes, materials } = useGLTF("/tree2.glb") as any;
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
        geometry={nodes.Plane.geometry}
        material={materials['branch color']}
        position={[-1.386, 0.066, -0.288]}
        rotation={[0, -1.555, 0]}
        scale={0.411}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['branch color']}
        position={[1.271, 0.063, 0.776]}
        rotation={[0.081, -1.303, -3.102]}
        scale={[-0.197, -0.297, -0.197]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranch.geometry}
        material={materials['branch color.001']}
        position={[-2.791, 7.798, 1.742]}
        rotation={[-2.002, -0.086, 3.077]}
        scale={0.75}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranches0BrancBran.geometry}
        material={materials['branch color']}
        position={[0.951, 5.779, -2.515]}
        rotation={[-1.601, -0.557, -1.633]}
        scale={0.821}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranches0Branc001.geometry}
        material={materials['branch color.001']}
        position={[2.977, 6.717, -3.148]}
        rotation={[-0.612, 1.237, -0.392]}
        scale={0.59}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranches0Branc002.geometry}
        material={materials['branch color']}
        position={[-0.536, 9.589, -0.814]}
        rotation={[-0.86, 0.552, -0.332]}
        scale={1.095}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranches0Branc003.geometry}
        material={materials['branch color']}
        position={[-0.299, 10.691, -1.046]}
        rotation={[1.3, 1.258, -0.564]}
        scale={1.095}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranches0Branc004.geometry}
        material={materials['branch color']}
        position={[-0.522, 11.011, -2.052]}
        rotation={[3.065, 0.354, -2.931]}
        scale={1.36}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranches0Branc005.geometry}
        material={materials['branch color']}
        position={[-0.483, 11.15, -2.018]}
        rotation={[-2.504, 0.194, 1.312]}
        scale={1.36}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BranchesCBranchesuBranchesbBrancheseBranchesBranches0Branches0.geometry}
        material={materials['branch color.003']}
        position={[-2.886, 8.834, 2.608]}
        rotation={[-3.135, -0.643, 2.979]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Trunk.geometry}
        material={materials['trunk color']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials['branch color.002']}
        position={[1.112, 0.062, -1.308]}
        rotation={[3.134, -0.025, -0.03]}
        scale={[-0.278, -0.419, -0.278]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials['branch color.004']}
        position={[-0.006, 0.094, 1.455]}
        rotation={[Math.PI, -0.322, Math.PI]}
        scale={0.399}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['branch color.005']}
        position={[-1.235, 0.054, 0.567]}
        rotation={[1.353, -1.54, -1.781]}
        scale={[-0.173, -0.26, -0.173]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials['branch color.006']}
        position={[-0.025, 0.067, -1.135]}
        rotation={[-Math.PI, 0.087, -Math.PI]}
        scale={0.351}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['branch color.007']}
        position={[1.25, 0.066, -0.288]}
        rotation={[0, -1.555, 0]}
        scale={0.198}
      />
      </group>
    );
  }
);

useGLTF.preload("/tree2.glb");
