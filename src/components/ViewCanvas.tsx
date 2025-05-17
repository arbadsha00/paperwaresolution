import { Canvas } from "@react-three/fiber";
import { Environment, View } from "@react-three/drei";
import { Suspense } from "react";
import { PaperCup } from "./home/PaperCup";
import { Loader } from "@react-three/drei";

export default function ViewCanvas() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>

      <Loader
        containerStyles={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFD753",
          zIndex: 100,
        }}
        innerStyles={{
          background: "#FFD753",
        }}
        barStyles={{
          height: "8px",
          background: "black",
        }}
        dataStyles={{
          display: "none",
        }}
      />
    </>
  );
}
