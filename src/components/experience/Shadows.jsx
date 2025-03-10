import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

export const Shadows = () => {
  return (
    <AccumulativeShadows
      position={[0, -0.01, 0]}
      temporal
      frames={20}
      color={"#74470f"}
      colorBlend={1.0}
      toneMapped
      alphaTest={0.8}
      opacity={0.8}
      scale={20}
    >
      <RandomizedLight
        intensity={4.1}
        amount={13}
        radius={7}
        ambient={0.7}
        position={[-8, 5, -10.0]}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
};
