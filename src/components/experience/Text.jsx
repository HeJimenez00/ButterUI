import { MeshTransmissionMaterial, Text3D } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export const Text = ({
  children,
  font = "./Inter_ExtraBold_Regular.json",
  ...props
}) => {
  // const controls = useControls("MeshTransmissionMaterial", {
  //   backside: true,
  //   backsideThickness: { value: 0.91, min: 0, max: 2 },
  //   samples: { value: 16, min: 1, max: 32, step: 1 },
  //   resolution: { value: 1024, min: 64, max: 2048, step: 64 },
  //   transmission: { value: 1, min: 0, max: 1 },
  //   clearcoat: { value: 0.77, min: 0.1, max: 1 },
  //   clearcoatRoughness: { value: 0.28, min: 0, max: 1 },
  //   thickness: { value: 2.85, min: 0, max: 5 },
  //   chromaticAberration: { value: 0.1, min: -5, max: 5 },
  //   anisotropy: { value: 0.09, min: 0, max: 1, step: 0.01 },
  //   roughness: { value: 0.21, min: 0, max: 1, step: 0.01 },
  //   distortion: { value: 0.57, min: 0, max: 4, step: 0.01 },
  //   distortionScale: { value: 0.07, min: 0.01, max: 1, step: 0.01 },
  //   temporalDistortion: { value: 0.13, min: 0, max: 1, step: 0.01 },
  //   ior: { value: 1.05, min: 0, max: 2, step: 0.01 },
  //   color: "#ffeb74",
  // });

  const texture = useLoader(RGBELoader, "./HDR/aerodynamics_workshop_1k.hdr");
  const ref = useRef();

  const [letter, setLetter] = useState(false);

  const handleMouseEnter = () => {
    setLetter(true);
  };
  const handleMouseLeave = () => {
    setLetter(false);
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (letter) {
      // Animación cuando está en hover (flotar hacia arriba y ligeramente oscilar)
      ref.current.position.z = THREE.MathUtils.lerp(
        ref.current.position.z,
        0.8, // Subir en el eje Y
        0.1,
      );
      ref.current.rotation.x = Math.sin(t * 2) * 0.05; // Oscilación suave
      ref.current.rotation.y = Math.cos(t * 2) * 0.05;
    } else {
      ref.current.position.z = THREE.MathUtils.lerp(
        ref.current.position.z,
        0, // Altura original
        0.1,
      );
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        0, // Rotación original en X
        0.1,
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        0, // Rotación original en Y
        0.1,
      );
    }
  });

  return (
    <group
      castShadow
      receiveShadow
      onPointerMove={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      rotation={[-Math.PI / 2, 0, 0]}
      {...props}
    >
      <Text3D
        ref={ref}
        bevelEnabled
        font={font}
        scale={3}
        height={0.2}
        bevelSize={0.01}
        bevelSegments={10}
        curveSegments={128}
        bevelThickness={0.009}
        position={[0, -0.1, 0]}
      >
        {children}
        <MeshTransmissionMaterial
          background={texture}
          backside={true}
          backsideThickness={0.91}
          samples={16}
          resolution={1024}
          transmission={1}
          clearcoat={0.77}
          clearcoatRoughness={0.28}
          thickness={2.85}
          chromaticAberration={0.1}
          anisotropy={0.09}
          roughness={0.21}
          distortion={0.57}
          distortionScale={0.07}
          temporalDistortion={0.13}
          ior={1.05}
          color="#ffeb74"
        />
      </Text3D>
    </group>
  );
};
