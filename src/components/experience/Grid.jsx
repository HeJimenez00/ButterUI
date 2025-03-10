import { Grid } from "@react-three/drei";

export const GridBG = () => {
  const gridConfig = {
    position: [0, -0.02, 0],
    args: [10.5, 10.5], // Tamaño de la cuadrícula (ancho y alto)
    cellSize: 1.3, // Tamaño de las celdas
    cellThickness: 0.7, // Grosor de las líneas de las celdas
    cellColor: "#636363", // Color de las celdas
    sectionSize: 0.0, // Tamaño de las secciones
    sectionThickness: 0.0, // Grosor de las líneas de las secciones
    sectionColor: "#fbfafa", // Color de las secciones
    infiniteGrid: true,
  };
  return <Grid frustumCulled {...gridConfig} />;
};
