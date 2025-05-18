import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

type PrimitiveProps = React.ComponentProps<"group">;

export const PaperCup = forwardRef<THREE.Group, PrimitiveProps>(
  (props, ref) => {
    const { nodes } = useGLTF("/Paper_Cup.glb") as any;
    // Load and memoize textures
    const [tex2, tex1, tex6] = useTexture([
      "/textures/texture-2.webp",
      "/textures/texture-1.webp",
      "/textures/texture-6.webp",
    ]);

    const textures = useMemo(() => [tex2, tex1, tex6], [tex2, tex1, tex6]);

    // Create materials once
    const material1 = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0,
        metalness: 0,
      });
    }, []);

    const texturedMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: tex1,
        roughness: 0.5,
        metalness: 0.1,
      });
    }, [tex1]);

    // Ref to manage current texture index
    const textureIndexRef = useRef(0);

    useEffect(() => {
      let isMounted = true;

      function smoothTextureTransition() {
        if (!isMounted) return;

        textureIndexRef.current =
          (textureIndexRef.current + 1) % textures.length;
        const nextTexture = textures[textureIndexRef.current];

        gsap.to(
          {},
          {
            duration: 4,
            delay: 4,
            onUpdate: () => {
              texturedMaterial.map = nextTexture;
              texturedMaterial.needsUpdate = true;
            },
            onComplete: () => {
              smoothTextureTransition();
            },
          }
        );
      }

      smoothTextureTransition();

      return () => {
        isMounted = false;
      };
    }, [textures, texturedMaterial]);

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
