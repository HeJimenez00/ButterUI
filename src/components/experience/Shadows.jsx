import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

export const Shadows = () => {
  return (
    <AccumulativeShadows
      position={[0, -0.01, 0]}
      temporal
      frames={10}
      color={"#453a00"}
      colorBlend={1.0}
      toneMapped
      alphaTest={0.8}
      opacity={0.9}
      scale={13}
    >
      <RandomizedLight
        intensity={4.1}
        amount={10}
        radius={5.8}
        ambient={0.45}
        position={[-8, 5, -10.0]}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
};
