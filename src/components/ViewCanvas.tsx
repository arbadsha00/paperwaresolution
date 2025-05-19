import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense } from "react";
import Loading from "./Loading";

export default function ViewCanvas() {
  return (
    <>
      <Loading />
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>

      {/* <Loader
        containerStyles={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EBAC00",
          zIndex: 200,
        }}
        innerStyles={{
          background: "#EBAC00",
        }}
        barStyles={{
          height: "8px",
          background: "black",
        }}
        dataStyles={{
          display: "none",
        }}
      /> */}
    </>
  );
}
