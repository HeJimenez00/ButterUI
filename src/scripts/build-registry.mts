import fs from "fs";
import path from "path";
import { registry } from "../registry/index";

function toPascalCase(str) {
  return str.replace(/(^|_)([a-z])/g, (_, __, char) => char.toUpperCase());
}

function escapeString(str) {
  return str
    .replace(/\\/g, "\\\\") // Escapar backslashes
    .replace(/`/g, "\\`") // Escapar backticks
    .replace(/\$/g, "\\$") // Escapar $
    .replace(/"/g, '\\"'); // Escapar comillas dobles
}

function loadExistingRegistry(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(
      "[loadExistingRegistry] Error al leer el archivo JSON:",
      error.message,
    );
    return {};
  }
}

function saveRegistryAsJSON(registryData, filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(registryData, null, 2), "utf-8");
    console.log("[saveRegistryAsJSON] Registro guardado como JSON:", filePath);
  } catch (error) {
    console.error(
      "[saveRegistryAsJSON] Error al guardar el archivo JSON:",
      error.message,
    );
  }
}

function generateRegistryCode(existingRegistry) {
  const updatedRegistry = { ...existingRegistry };

  registry.forEach((entry) => {
    const componentName = toPascalCase(entry.name);

    if (!updatedRegistry[componentName]) {
      const componentImportPath = entry.files[0].path.replace("src/", "../");
      const componentCode = fs.readFileSync(
        path.resolve(entry.files[0].path),
        "utf-8",
      );

      updatedRegistry[componentName] = {
        name: componentName,
        description: escapeString(entry.description || ``),
        type: entry.type,
        files: entry.files.map((file) => file.path),
        component: `async () => import("${componentImportPath}")`,
        code: escapeString(componentCode),
      };
    }
  });

  return updatedRegistry;
}

function generateRegistryFile(registryData, filePath) {
  const registryEntries = Object.entries(registryData)
    .map(
      ([key, value]) => `${key}: {
    name: "${value.name}",
    description: \`${value.description}\`,
    type: "${value.type}",
    files: [${value.files.map((file) => `"${file}"`).join(", ")}],
    component: ${value.component},
    code: \`${value.code}\`}`,
    )
    .join(",\n");

  const fileContent = `export const Index = {
${registryEntries}
};`;

  try {
    fs.writeFileSync(filePath, fileContent, "utf-8");
    console.log("[generateRegistryFile] Archivo generado:", filePath);
  } catch (error) {
    console.error(
      "[generateRegistryFile] Error al generar el archivo:",
      error.message,
    );
  }
}

function buildRegistry() {
  const outputDir = path.resolve("src", "__registry__");
  const jsonFile = path.join(outputDir, "index.json");
  const tsFile = path.join(outputDir, "index.ts");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const existingRegistry = loadExistingRegistry(jsonFile);
  const updatedRegistry = generateRegistryCode(existingRegistry);

  saveRegistryAsJSON(updatedRegistry, jsonFile);
  generateRegistryFile(updatedRegistry, tsFile);
}

buildRegistry();
