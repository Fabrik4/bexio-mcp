/**
 * Order tool definitions.
 * Contains MCP tool metadata for orders domain.
 */

import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  {
    name: "list_orders",
    description: "List orders from Bexio with optional pagination",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of orders to return (default: 50)",
          default: 50,
        },
        offset: {
          type: "integer",
          description: "Number of orders to skip (default: 0)",
          default: 0,
        },
      },
    },
  },
  {
    name: "get_order",
    description: "Get a specific order by ID",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order to retrieve",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "create_order",
    description: "Create a new order in Bexio",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        order_data: {
          type: "object",
          description: "Order data to create",
        },
      },
      required: ["order_data"],
    },
  },
  {
    name: "search_orders",
    description: "Search orders with filters",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        search_params: {
          type: "object",
          description: "Search parameters for orders",
        },
      },
      required: ["search_params"],
    },
  },
  {
    name: "search_orders_by_customer",
    description:
      "Search orders by customer name (2-step process: find contact by name, then find orders by contact_id)",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        customer_name: {
          type: "string",
          description: 'Customer name to search for (e.g., "Anton", "Mustermann")',
        },
        limit: {
          type: "integer",
          description: "Maximum number of orders to return (default: 50)",
          default: 50,
        },
      },
      required: ["customer_name"],
    },
  },
  {
    name: "create_delivery_from_order",
    description: "Create a delivery from an order",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order to create a delivery from",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "create_invoice_from_order",
    description: "Create an invoice from an order",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order to create an invoice from",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "edit_order",
    description:
      "Edit/update an existing order. Accepts any field from the Bexio kb_order schema — common fields documented below, additional fields pass through.",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order to edit",
        },
        order_data: {
          type: "object",
          description: "Fields to update on the order (any Bexio kb_order field).",
          additionalProperties: true,
          properties: {
            title: { type: "string" },
            contact_id: { type: "integer" },
            contact_sub_id: { type: "integer" },
            user_id: { type: "integer" },
            pr_project_id: { type: "integer" },
            language_id: { type: "integer" },
            bank_account_id: { type: "integer" },
            currency_id: { type: "integer" },
            payment_type_id: { type: "integer" },
            header: { type: "string" },
            footer: { type: "string" },
            reference: { type: "string" },
            mwst_type: { type: "integer" },
            mwst_is_net: { type: "boolean" },
            show_position_taxes: { type: "boolean" },
            is_valid_from: { type: "string" },
            is_valid_to: { type: "string" },
            contact_address: {
              type: "string",
              description: "Full postal address block rendered in the PDF header (multi-line). Overrides the resolved contact default.",
            },
            delivery_address_type: { type: "integer" },
            delivery_address: { type: "string" },
            positions: {
              type: "array",
              description: "Complete list of positions — replaces all existing positions when provided.",
              items: { type: "object", additionalProperties: true },
            },
            template_slug: { type: "string" },
          },
        },
      },
      required: ["order_id", "order_data"],
    },
  },
  {
    name: "delete_order",
    description: "Delete an order",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order to delete",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "get_order_pdf",
    description: "Get an order as PDF (returns base64-encoded content)",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order to get as PDF",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "get_order_repetition",
    description: "Get repetition settings for an order",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order to get repetition settings for",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "edit_order_repetition",
    description: "Edit repetition settings for an order",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order",
        },
        repetition_id: {
          type: "integer",
          description: "The ID of the repetition to edit",
        },
        repetition_data: {
          type: "object",
          description: "Repetition fields to update",
        },
      },
      required: ["order_id", "repetition_id", "repetition_data"],
    },
  },
  {
    name: "delete_order_repetition",
    description: "Delete repetition settings for an order",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        order_id: {
          type: "integer",
          description: "The ID of the order",
        },
        repetition_id: {
          type: "integer",
          description: "The ID of the repetition to delete",
        },
      },
      required: ["order_id", "repetition_id"],
    },
  },
];
