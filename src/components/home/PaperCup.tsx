import React, { forwardRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

type PrimitiveProps = React.ComponentProps<"group">;

export const PaperCup = forwardRef<THREE.Group, PrimitiveProps>(
  (props, ref) => {
    const { nodes } = useGLTF("/Paper_Cup.glb") as any;
    const textures = [
      useTexture("./textures/texture-2.webp"),
      useTexture("./textures/texture-1.webp"),
      useTexture("./textures/texture-6.webp"),
    ];

    const material1 = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0,
      metalness: 0,
    });

    const texturedMaterial = new THREE.MeshStandardMaterial({
      map: textures[1],
      roughness: 0.5,
      metalness: 0.1,
    });
    // Recursively changing cup textures
    let currentTextureIndex = 0;
    function smoothTextureTransition() {
      currentTextureIndex = (currentTextureIndex + 1) % textures.length;
      const nextTexture = textures[currentTextureIndex];

      // Animate the texture transition
      gsap.to(texturedMaterial, {
        duration: 4, // Duration of the transition
        delay: 4,
        ease: "power1.inOut",
        onUpdate: () => {
          texturedMaterial.map = nextTexture; // Update texture during transition
        },
        onComplete: () => {
          smoothTextureTransition(); // Repeat the process
        },
      });
    }

    // Start the texture transition cycle
    smoothTextureTransition();

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
