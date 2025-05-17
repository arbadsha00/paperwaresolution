import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import CustomShaderMaterial from "three-custom-shader-material";
import { gsap } from "gsap";
import wobbleVertexShader from "../../../../shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "../../../../shaders/wobble/fragment.glsl";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
export function PlasticBall_3D() {
  // Removed PlasticBallId
  const meshRef = useRef<THREE.Mesh>(null);
  const clock = useMemo(() => new THREE.Clock(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPositionFrequency: { value: 0.5 },
      uTimeFrequency: { value: 0.4 },
      uStrength: { value: 0.3 },
      uWarpPositionFrequency: { value: 0.38 },
      uWarpTimeFrequency: { value: 0.12 },
      uWarpStrength: { value: 1.7 },
      uColorA: { value: new THREE.Color("#F5C901") },
      uColorB: { value: new THREE.Color("#BD8400") },
    }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.5, 5); //
    const merged = mergeVertices(geo) as THREE.IcosahedronGeometry;
    merged.computeTangents();
    return merged;
  }, []);

  useFrame(() => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        y: "+=6.28", // Equivalent to Math.PI * 2
        repeat: -1,
        duration: 30,
        ease: "none",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#noPlastic",
          start: "top 40%",

          toggleActions: "play none none reverse",
        },
      });
      tl.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.7,
        delay: 0.7,
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <CustomShaderMaterial
          baseMaterial={THREE.MeshPhysicalMaterial}
          vertexShader={wobbleVertexShader}
          fragmentShader={wobbleFragmentShader}
          uniforms={uniforms}
          metalness={0.3}
          roughness={0}
          color="#ffffff"
          transmission={0}
          ior={1.5}
          thickness={1.5}
          transparent={true}
          wireframe={false}
          clearcoat={0.8}
        />
        <CustomShaderMaterial
          attach="customDepthMaterial"
          baseMaterial={THREE.MeshDepthMaterial}
          vertexShader={wobbleVertexShader}
          uniforms={uniforms}
          depthPacking={THREE.RGBADepthPacking}
        />
      </mesh>
    </group>
  );
}
