import { registrySchema } from "./schema";
import { gladeRegistry } from "./registry-astra";
import { examplesRegistry } from "./registry-examples";

export const registry = [...gladeRegistry, ...examplesRegistry];

registrySchema.parse(registry);

console.log("[registry] OK: Items registrados correctamente.");

export function findRegistryEntry(name: string) {
  return registry.find((item) => item.name === name);
}
