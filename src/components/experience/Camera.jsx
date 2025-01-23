import { OrthographicCamera } from "@react-three/drei";

export const Camera = () => {
  return (
    <OrthographicCamera
      args={[-5, 5, 5, -5]}
      makeDefault
      position={[10, 20, 20]}
      scale={[1.1, 1, 1]}
      zoom={50}
    />
  );
};
