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
  const texture = useLoader(RGBELoader, "./HDR/modern_buildings_night_1k.hdr");
  const ref = useRef();

  const [letter, setLetter] = useState(false);

  const handleMouseEnter = () => {
    setLetter(true);
  };
  const handleMouseLeave = () => {
    setLetter(false);
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (letter) {
      // Animación cuando está en hover (flotar hacia arriba y ligeramente oscilar)
      ref.current.position.z = THREE.MathUtils.lerp(
        ref.current.position.z,
        1, // Subir en el eje Y
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
      onPointerMove={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      rotation={[-Math.PI / 2, 0, 0]}
      {...props}
    >
      <Text3D
        ref={ref}
        castShadow
        bevelEnabled
        font={font}
        scale={6}
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
          backside
          backsideThickness={0.15}
          samples={16}
          resolution={600}
          transmission={0.64}
          clearcoat={0.45}
          clearcoatRoughness={0.0}
          thickness={0.25}
          chromaticAberration={0.1}
          anisotropy={0.85}
          roughness={0.38}
          distortion={0.5}
          distortionScale={0.1}
          temporalDistortion={0.09}
          ior={1.25}
        />
      </Text3D>
    </group>
  );
};
