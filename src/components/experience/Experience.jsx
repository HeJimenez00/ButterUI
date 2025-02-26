import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
import { GridBG } from "./Grid";
import { Controls } from "./Controls";
import { Shadows } from "./Shadows";
import { Effects } from "./Effects";
import { Text } from "./Text";
import { useEffect, useState } from "react";
import { Center } from "@react-three/drei";
import { HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export const Experience = () => {
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const deviceCapability = window.devicePixelRatio || 1;
    const optimalPdr =
      deviceCapability > 2 ? 2 : deviceCapability > 1 ? 1.5 : 1;
    setDpr(optimalPdr);
  });

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        stencil: false,
        depth: true,
      }}
    >
      <Camera />
      <Effects />
      <ambientLight intensity={0.3} color="#fff" />
      <spotLight
        position={[0, -3, 3]}
        intensity={1.2}
        angle={Math.PI / 6}
        penumbra={0.5}
        color="#fff"
        castShadow
      />
      <pointLight position={[2, 1, 2]} intensity={0.8} color="#ffdd99" />
      <HueSaturation
        blendFunction={BlendFunction.Normal}
        saturation={0.5}
        hue={Math.PI / 2}
      />
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
