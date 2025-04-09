import { OrthographicCamera } from "@react-three/drei";

export const Camera = () => {
  const scaleValue = 0.4;

  return (
    <OrthographicCamera
      makeDefault
      args={[-1, 1, 1, -1]}
      position={[5, 10, 10]}
      scale={[scaleValue + 0.04, scaleValue, scaleValue]}
      zoom={40}
    />
  );
};
