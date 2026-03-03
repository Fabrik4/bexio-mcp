/**
 * Document Settings Zod schemas and types.
 * Domain: Document Settings (Document Settings, Document Templates)
 */

import { z } from "zod";

// ===== DOCUMENT SETTINGS (DOCS-01) =====

// List document settings
export const ListDocumentSettingsParamsSchema = z.object({
  limit: z.number().int().positive().default(100),
  offset: z.number().int().min(0).default(0),
});

export type ListDocumentSettingsParams = z.infer<typeof ListDocumentSettingsParamsSchema>;

// ===== DOCUMENT TEMPLATES (DOCS-02) =====

// List document templates
export const ListDocumentTemplatesParamsSchema = z.object({
  limit: z.number().int().positive().default(100),
  offset: z.number().int().min(0).default(0),
});

export type ListDocumentTemplatesParams = z.infer<typeof ListDocumentTemplatesParamsSchema>;
