/**
 * Invoice tool definitions.
 * Contains MCP tool metadata for invoices domain.
 */
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  {
    name: "list_invoices",
    description: "List invoices from Bexio with optional pagination",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "integer", description: "Maximum number to return (default: 50)", default: 50 },
        offset: { type: "integer", description: "Number to skip (default: 0)", default: 0 },
      },
    },
  },
  {
    name: "list_all_invoices",
    description: "List every invoice in Bexio by paging automatically",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        chunk_size: { type: "integer", description: "Invoices per request (default: 100)", default: 100 },
      },
    },
  },
  {
    name: "get_invoice",
    description: "Get a specific invoice by ID",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: { invoice_id: { type: "integer", description: "The invoice ID" } },
      required: ["invoice_id"],
    },
  },
  {
    name: "search_invoices",
    description: "Search invoices via the Bexio search endpoint",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Free-text value matched with LIKE" },
        field: { type: "string", description: "Field to search (default: title)", default: "title" },
        operator: { type: "string", description: "Comparison operator (LIKE, =, >)", default: "LIKE" },
        filters: {
          type: "array", description: "Explicit Bexio search filters",
          items: {
            type: "object",
            properties: { field: { type: "string" }, operator: { type: "string" }, value: {} },
            required: ["field", "operator", "value"],
          },
        },
        limit: { type: "integer", description: "Maximum results" },
      },
    },
  },
  {
    name: "search_invoices_by_customer",
    description: "Search invoices by customer name (finds contact, then invoices)",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        customer_name: { type: "string", description: "Customer name to search for" },
        limit: { type: "integer", description: "Maximum invoices to return (default: 50)", default: 50 },
      },
      required: ["customer_name"],
    },
  },
  {
    name: "create_invoice",
    description:
      "Create a new invoice (kb_invoice) in Bexio. Invoice is created as draft — call issue_invoice afterwards to finalize. Required: title, contact_id, positions (at least 1). Use list_contacts to find contact_id, list_taxes for tax_id, list_accounts for account_id.",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        invoice_data: {
          type: "object",
          description: "Invoice payload. Minimum fields: title, contact_id, positions[].",
          properties: {
            title: { type: "string", description: "Invoice title (e.g. 'Beschriftung Fahrzeug Muster AG')" },
            contact_id: { type: "integer", description: "Bexio contact ID (customer)" },
            user_id: { type: "integer", description: "Owner user ID (defaults to current user)" },
            currency_id: { type: "integer", description: "Currency ID (1 = CHF)" },
            language_id: { type: "integer", description: "Language ID (1 = German)" },
            bank_account_id: { type: "integer", description: "Bank account for payment (use list_bank_accounts)" },
            payment_type_id: { type: "integer", description: "Payment type ID (use list_payment_types)" },
            mwst_type: { type: "integer", description: "VAT mode: 0 = exkl., 1 = inkl., 2 = without VAT" },
            mwst_is_net: { type: "boolean", description: "true = amounts are net, false = gross" },
            is_valid_from: { type: "string", description: "Issue date YYYY-MM-DD" },
            is_valid_until: { type: "string", description: "Due date YYYY-MM-DD" },
            positions: {
              type: "array",
              description: "Line items. At least one required.",
              minItems: 1,
              items: {
                type: "object",
                properties: {
                  type: { type: "string", description: "Position type (KbPositionCustom, KbPositionItem, KbPositionText, KbPositionSubtotal, KbPositionDiscount, KbPositionPagebreak)" },
                  text: { type: "string", description: "Line description" },
                  amount: { type: "number", description: "Quantity (must be positive)" },
                  unit_price: { type: "number", description: "Price per unit (must be positive)" },
                  account_id: { type: "integer", description: "Revenue account ID (use list_accounts)" },
                  tax_id: { type: "integer", description: "Tax ID (use list_taxes)" },
                  discount_in_percent: { type: "number", description: "Discount 0-100" },
                  unit_id: { type: "integer", description: "Unit ID (use list_units)" },
                },
                required: ["type", "text", "amount", "unit_price"],
              },
            },
          },
          required: ["title", "contact_id", "positions"],
        },
      },
      required: ["invoice_data"],
    },
  },
  {
    name: "issue_invoice",
    description: "Issue an invoice",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: { invoice_id: { type: "integer", description: "The invoice ID to issue" } },
      required: ["invoice_id"],
    },
  },
  {
    name: "cancel_invoice",
    description: "Cancel an invoice",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: { invoice_id: { type: "integer", description: "The invoice ID to cancel" } },
      required: ["invoice_id"],
    },
  },
  {
    name: "mark_invoice_as_sent",
    description: "Mark an invoice as sent",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: { invoice_id: { type: "integer", description: "The invoice ID to mark as sent" } },
      required: ["invoice_id"],
    },
  },
  {
    name: "send_invoice",
    description: "Send an invoice",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: { invoice_id: { type: "integer", description: "The invoice ID to send" } },
      required: ["invoice_id"],
    },
  },
  {
    name: "copy_invoice",
    description: "Copy an invoice",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: { invoice_id: { type: "integer", description: "The invoice ID to copy" } },
      required: ["invoice_id"],
    },
  },
  {
    name: "list_invoice_statuses",
    description: "List all available invoice statuses with their meanings",
    annotations: { readOnlyHint: true },
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_all_statuses",
    description: "List all document statuses for invoices, quotes, and orders",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        document_type: {
          type: "string", enum: ["all", "invoices", "quotes", "orders"],
          description: "Filter by document type (default: all)", default: "all",
        },
      },
    },
  },
  {
    name: "get_open_invoices",
    description: "Get all open invoices (draft and sent/pending)",
    annotations: { readOnlyHint: true },
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_overdue_invoices",
    description: "Get all overdue invoices",
    annotations: { readOnlyHint: true },
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "edit_invoice",
    description: "Edit/update an existing invoice",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        invoice_id: { type: "integer", description: "The ID of the invoice to edit" },
        invoice_data: { type: "object", description: "Fields to update on the invoice" },
      },
      required: ["invoice_id", "invoice_data"],
    },
  },
  {
    name: "delete_invoice",
    description: "Delete an invoice",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        invoice_id: { type: "integer", description: "The ID of the invoice to delete" },
      },
      required: ["invoice_id"],
    },
  },
  {
    name: "get_invoice_pdf",
    description: "Get an invoice as PDF (returns base64-encoded content)",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        invoice_id: { type: "integer", description: "The ID of the invoice to get as PDF" },
      },
      required: ["invoice_id"],
    },
  },
  {
    name: "revert_invoice_to_draft",
    description: "Revert an issued invoice back to draft status",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        invoice_id: { type: "integer", description: "The ID of the invoice to revert to draft" },
      },
      required: ["invoice_id"],
    },
  },
];
