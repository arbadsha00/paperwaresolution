import { Canvas } from "@react-three/fiber";
import { Environment, View } from "@react-three/drei";
import { Suspense } from "react";
import { PaperCup } from "./home/PaperCup";

export default function ViewCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 30,
      }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <View.Port />
       
      </Suspense>
    </Canvas>
  );
}
