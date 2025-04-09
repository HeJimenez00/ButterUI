import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useRef } from "react";

export const Controls = forwardRef((props, ref) => {
  // const controls = useControls("Limitaciones en los controles", {
  //   autoRotate: { value: false },
  //   enablePan: { value: false },
  //   zoomSpeed: { min: 0, max: 1, value: 0.1, step: 0.01 },
  //   minZoom: { min: 0.1, max: 18, value: 18, step: 0.1 },
  //   maxZoom: { min: 0.1, max: 20, value: 20, step: 0.1 },
  // });
  return (
    <OrbitControls
      ref={ref}
      autoRotate={false}
      enablePan={false}
      minZoom={40}
      maxZoom={40}
      minPolarAngle={Math.PI / 3.7}
      maxPolarAngle={Math.PI / 3.7}
      {...props}
    />
  );
});

export const EnhancedControls = () => {
  const controlsRef = useRef();
  const regress = useThree((state) => state.performance.regress);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current?.addEventListener("change", regress);
    }
    return () => {
      controlsRef.current?.removeEventListener("change", regress);
    };
  }, [regress]);

  return <Controls ref={controlsRef} />;
};
