import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
import { GridBG } from "./Grid";
import { Controls } from "./Controls";
import { Shadows } from "./Shadows";
import { Effects } from "./Effects";
import { Text } from "./Text";
import { useState } from "react";
import { Center, PerformanceMonitor } from "@react-three/drei";

export const Experience = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={dpr}
      gl={{ powerPreference: "high-performance" }}
    >
      <PerformanceMonitor
        flipflops={3}
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      />
      <Camera />
      <Effects />
      <Center top>
        <Text position={[-6.4, 0, 0]}>U</Text>
        <Text position={[0, 0, 0]}>I</Text>
      </Center>
      <GridBG />
      <Shadows />
      <Controls />
    </Canvas>
  );
};
