/**
 * Stock tool definitions.
 * Contains MCP tool metadata for stock domain.
 * Includes: Stock Locations, Stock Areas
 */

import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  // ===== STOCK LOCATIONS (STOCK-01) =====
  {
    name: "list_stock_locations",
    description: "List all stock/warehouse locations",
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
  {
    name: "search_stock_locations",
    description: "Search stock locations by criteria",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        search_criteria: {
          type: "array",
          description: "Array of search criteria objects with field, value, and criteria properties",
          items: {
            type: "object",
            properties: {
              field: { type: "string", description: "Field name to search" },
              value: { type: "string", description: "Value to search for" },
              criteria: { type: "string", description: "Search operator (e.g., 'like', '=')", default: "like" },
            },
            required: ["field", "value"],
          },
        },
        limit: {
          type: "integer",
          description: "Maximum number of results to return (default: 100)",
          default: 100,
        },
      },
      required: ["search_criteria"],
    },
  },

  // ===== STOCK AREAS (STOCK-02) =====
  {
    name: "list_stock_areas",
    description: "List all stock areas within locations",
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
  {
    name: "search_stock_areas",
    description: "Search stock areas by criteria",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        search_criteria: {
          type: "array",
          description: "Array of search criteria objects with field, value, and criteria properties",
          items: {
            type: "object",
            properties: {
              field: { type: "string", description: "Field name to search" },
              value: { type: "string", description: "Value to search for" },
              criteria: { type: "string", description: "Search operator (e.g., 'like', '=')", default: "like" },
            },
            required: ["field", "value"],
          },
        },
        limit: {
          type: "integer",
          description: "Maximum number of results to return (default: 100)",
          default: 100,
        },
      },
      required: ["search_criteria"],
    },
  },
];
