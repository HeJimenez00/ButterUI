import { registrySchema } from "./schema";
import { astraRegistry } from "./registry-butter";
import { examplesRegistry } from "./registry-examples";

export const registry = [...astraRegistry, ...examplesRegistry];

registrySchema.parse(registry);

console.log("[registry] OK: Items registrados correctamente.");

export function findRegistryEntry(name: string) {
  return registry.find((item) => item.name === name);
}
