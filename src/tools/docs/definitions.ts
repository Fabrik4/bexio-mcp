/**
 * Document Settings tool definitions.
 * Contains MCP tool metadata for document settings domain.
 * Includes: Document Settings, Document Templates
 */

import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  // ===== DOCUMENT SETTINGS (DOCS-01) =====
  {
    name: "list_document_settings",
    description: "List all document settings (header/footer, number ranges, etc.)",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of results to return (default: 100)",
          default: 100,
        },
        offset: {
          type: "integer",
          description: "Number of results to skip (default: 0)",
          default: 0,
        },
      },
    },
  },

  // ===== DOCUMENT TEMPLATES (DOCS-02) =====
  {
    name: "list_document_templates",
    description: "List all document templates available for generating documents",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of results to return (default: 100)",
          default: 100,
        },
        offset: {
          type: "integer",
          description: "Number of results to skip (default: 0)",
          default: 0,
        },
      },
    },
  },
];
