import { OrbitControls } from "@react-three/drei";

export const Controls = () => {
  // const controls = useControls("Limitaciones en los controles", {
  //   autoRotate: { value: false },
  //   enablePan: { value: false },
  //   zoomSpeed: { min: 0, max: 1, value: 0.1, step: 0.01 },
  //   minZoom: { min: 0.1, max: 18, value: 18, step: 0.1 },
  //   maxZoom: { min: 0.1, max: 20, value: 20, step: 0.1 },
  // });

  return (
    <OrbitControls
      autoRotate={false}
      enablePan={false}
      minZoom={18}
      maxZoom={20}
      minPolarAngle={Math.PI / 3.7}
      maxPolarAngle={Math.PI / 3.7}
    />
  );
};
