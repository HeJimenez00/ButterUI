import { OrthographicCamera } from "@react-three/drei";

export const Camera = () => {
  const scaleValue = 0.4;

  return (
    <OrthographicCamera
      makeDefault
      args={[-5, 5, 5, -5]}
      position={[10, 20, 20]}
      scale={[scaleValue + 0.04, scaleValue, scaleValue]}
      zoom={20}
    />
  );
};
