/**
 * Quote tool definitions.
 * Contains MCP tool metadata for quotes/offers domain.
 */

import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  {
    name: "list_quotes",
    description: "List quotes (offers) from Bexio with optional pagination",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of quotes to return (default: 50)",
          default: 50,
        },
        offset: {
          type: "integer",
          description: "Number of quotes to skip (default: 0)",
          default: 0,
        },
      },
    },
  },
  {
    name: "get_quote",
    description: "Get a specific quote by ID",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to retrieve",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "create_quote",
    description: "Create a new quote (offer) for an existing contact",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        contact_id: {
          type: "integer",
          description: "The contact ID the quote should be created for",
        },
        quote_data: {
          type: "object",
          description:
            "Quote payload according to Bexio's /kb_offer schema. The contact_id is merged automatically.",
        },
      },
      required: ["contact_id", "quote_data"],
    },
  },
  {
    name: "search_quotes",
    description: "Search quotes with filters",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        search_params: {
          type: "object",
          description: "Search parameters for quotes",
        },
      },
      required: ["search_params"],
    },
  },
  {
    name: "search_quotes_by_customer",
    description:
      "Search quotes by customer name (2-step process: find contact by name, then find quotes by contact_id)",
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
          description: "Maximum number of quotes to return (default: 50)",
          default: 50,
        },
      },
      required: ["customer_name"],
    },
  },
  {
    name: "issue_quote",
    description: "Issue a quote",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to issue",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "accept_quote",
    description: "Accept a quote",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to accept",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "decline_quote",
    description: "Decline a quote",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to decline",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "send_quote",
    description:
      "Send a quote via Bexio email. Bexio's POST /kb_offer/{id}/send requires recipient_email, subject, and message — without them the API returns 422.",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: { type: "integer", description: "The ID of the quote to send" },
        recipient_email: { type: "string", format: "email", description: "Primary recipient email" },
        subject: { type: "string", description: "Email subject line" },
        message: { type: "string", description: "Email body (plain text or simple HTML)" },
        cc: { type: "array", items: { type: "string", format: "email" }, description: "Optional CC recipients" },
        bcc: { type: "array", items: { type: "string", format: "email" }, description: "Optional BCC recipients" },
        mark_as_open: { type: "boolean", description: "Mark quote as issued/open after sending (default: true)" },
        attach_pdf: { type: "boolean", description: "Attach the quote PDF to the mail (default: true)" },
      },
      required: ["quote_id", "recipient_email", "subject", "message"],
    },
  },
  {
    name: "create_order_from_quote",
    description: "Create an order from a quote",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to create an order from",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "create_invoice_from_quote",
    description: "Create an invoice from a quote",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to create an invoice from",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "edit_quote",
    description:
      "Edit/update an existing quote. Accepts any field from the Bexio kb_offer schema — common fields documented below, additional fields pass through.",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to edit",
        },
        quote_data: {
          type: "object",
          description: "Fields to update on the quote (any Bexio kb_offer field).",
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
            is_valid_until: { type: "string" },
            contact_address: {
              type: "string",
              description: "Full postal address block rendered in the PDF header (multi-line). Overrides the resolved contact default.",
            },
            positions: {
              type: "array",
              description: "Complete list of positions — replaces all existing positions when provided.",
              items: { type: "object", additionalProperties: true },
            },
            template_slug: { type: "string" },
          },
        },
      },
      required: ["quote_id", "quote_data"],
    },
  },
  {
    name: "delete_quote",
    description: "Delete a quote",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to delete",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "revert_quote_to_draft",
    description: "Revert an issued quote back to draft status",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to revert to draft",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "reissue_quote",
    description: "Reissue a quote (re-issue after revert)",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to reissue",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "mark_quote_as_sent",
    description: "Mark a quote as sent",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to mark as sent",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "get_quote_pdf",
    description: "Get a quote as PDF (returns base64-encoded content)",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to get as PDF",
        },
      },
      required: ["quote_id"],
    },
  },
  {
    name: "copy_quote",
    description: "Copy/duplicate a quote",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        quote_id: {
          type: "integer",
          description: "The ID of the quote to copy",
        },
      },
      required: ["quote_id"],
    },
  },
];
