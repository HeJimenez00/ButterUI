import { Canvas, useThree } from "@react-three/fiber";
import { Camera } from "./Camera";
import { GridBG } from "./Grid";
import { EnhancedControls } from "./Controls";
import { Text } from "./Text";
import { useEffect, useState } from "react";
import { Center, ContactShadows, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

THREE.ColorManagement.enabled = true;

export const Experience = () => {
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const deviceCapability = window.devicePixelRatio || 1;
    const optimalPdr =
      deviceCapability > 2 ? 2 : deviceCapability > 1 ? 1.5 : 1;
    setDpr(optimalPdr);
  }, []);

  return (
    <Canvas
      shadows
      dpr={dpr}
      // frameloop="demand"
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
      color="#fbfafa"
    >
      <PerformanceMonitor
        onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))}
        onDecline={() => setDpr(1)}
      >
        <AdaptivePixelRatio />
        <Camera />
        <EnhancedControls />

        <Center top position={[0, -0.02, 0]}>
          <Text position={[-3.5, 0, 0]}>U</Text>
          <Text position={[0, 0, 0]}>I</Text>
        </Center>

        <ContactShadows
          position={[0, -0.03, 0]}
          scale={6}
          resolution={128}
          opacity={0.8}
          blur={1.8}
          far={0.5}
        />
        <GridBG />
      </PerformanceMonitor>
    </Canvas>
  );
};

const AdaptivePixelRatio = () => {
  const currentPR = useThree((state) => state.performance.current);
  const setPixelRatio = useThree((state) => state.setDpr);

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio * currentPR);
  }, [currentPR]);
  return null;
};
