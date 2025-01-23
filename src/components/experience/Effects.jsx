import { Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export const Effects = () => {
  return (
    <Noise
      setSize={[1000, 1000]}
      premultiply
      blendFunction={BlendFunction.ADD}
    />
  );
};
