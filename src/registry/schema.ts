import { z } from "zod";

export const registryItemTypeSchema = z.enum(["butter", "example"]);

export const registryFileSchema = z.object({
  path: z.string(),
});

export const registryEntrySchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  files: z.array(registryFileSchema),
  description: z.string().optional(),
  code: z.string().optional(),
});

export const registrySchema = z.array(registryEntrySchema);

export type RegistryEntry = z.infer<typeof registryEntrySchema>;
export type Registry = z.infer<typeof registrySchema>;
