import { registrySchema } from "./schema";
import { butterRegistry } from "./registry-butter";
import { examplesRegistry } from "./registry-examples";

export const registry = [...butterRegistry, ...examplesRegistry];

registrySchema.parse(registry);

console.log("[registry] OK: Items registrados correctamente.");

export function findRegistryEntry(name: string) {
  return registry.find((item) => item.name === name);
}
