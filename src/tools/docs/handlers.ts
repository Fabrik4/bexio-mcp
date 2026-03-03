/**
 * Document Settings tool handlers.
 * Implements the logic for each document settings tool.
 */

import { BexioClient } from "../../bexio-client.js";
import {
  ListDocumentSettingsParamsSchema,
  ListDocumentTemplatesParamsSchema,
} from "../../types/index.js";

export type HandlerFn = (
  client: BexioClient,
  args: unknown
) => Promise<unknown>;

export const handlers: Record<string, HandlerFn> = {
  // ===== DOCUMENT SETTINGS (DOCS-01) =====
  list_document_settings: async (client, args) => {
    const params = ListDocumentSettingsParamsSchema.parse(args);
    return client.listDocumentSettings(params);
  },

  // ===== DOCUMENT TEMPLATES (DOCS-02) =====
  list_document_templates: async (client, args) => {
    const params = ListDocumentTemplatesParamsSchema.parse(args);
    return client.listDocumentTemplates(params);
  },
};
