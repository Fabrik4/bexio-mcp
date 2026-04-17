/**
 * Purchase tool definitions.
 * Contains MCP tool metadata for bills, expenses, purchase orders, and outgoing payments.
 */

import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  // ===== BILLS (Creditor Invoices — v4.0 API) =====
  {
    name: "list_bills",
    description: "List all bills (creditor invoices) with optional pagination",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of bills to return (default: 50)",
        },
        offset: {
          type: "integer",
          description: "Number of bills to skip (default: 0)",
        },
      },
    },
  },
  {
    name: "get_bill",
    description: "Get a specific bill (creditor invoice) by UUID",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        bill_id: {
          type: "string",
          description: "The UUID of the bill to retrieve",
        },
      },
      required: ["bill_id"],
    },
  },
  {
    name: "create_bill",
    description:
      "Create a new bill (creditor invoice / v4.0). Bill is created as draft — call issue_bill afterwards. Required: title, contact_partner_id (internal user), bill_date, due_date, amount_calc, currency. Use find_contact_by_name to get supplier_id, list_accounts for booking_account_id, list_taxes for tax_id (VM81 for standard Swiss VAT).",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        bill_data: {
          type: "object",
          description: "Bill payload. Minimum: title, contact_partner_id, bill_date, due_date, amount_calc, currency.",
          properties: {
            title: { type: "string", description: "Bill title (e.g. 'Migros Services AG - RG045-RG01047096')" },
            contact_partner_id: { type: "integer", description: "Internal Bexio user who books the bill (usually 1 = owner)" },
            supplier_id: { type: ["integer", "null"], description: "Supplier contact ID (use find_contact_by_name). Null for one-off suppliers." },
            vendor_ref: { type: ["string", "null"], description: "Supplier's invoice reference number" },
            bill_date: { type: "string", description: "Invoice date from supplier YYYY-MM-DD" },
            due_date: { type: "string", description: "Payment due date YYYY-MM-DD" },
            amount_calc: { type: "number", description: "Gross amount (positive)" },
            currency: { type: "string", description: "Currency code (CHF, EUR, USD). Default CHF." },
            exchange_rate: { type: "number", description: "Exchange rate to CHF (1 for CHF bills)" },
            base_currency_amount: { type: "number", description: "Amount converted to CHF" },
            item_net: { type: "boolean", description: "true = positions are net, false = gross (default true for Swiss bills)" },
            split_into_line_items: { type: "boolean", description: "If true, positions array is used; if false, amount_calc is booked as single line" },
            booking_account_id: { type: "integer", description: "Expense account ID (use list_accounts; 160 = 4200 Einkauf Handelsware)" },
            tax_id: { type: "integer", description: "Tax ID for the entire bill (use list_taxes; 48 = VM81 Vorsteuer 8.1%)" },
          },
          required: ["title", "contact_partner_id", "bill_date", "due_date", "amount_calc", "currency"],
        },
      },
      required: ["bill_data"],
    },
  },
  {
    name: "update_bill",
    description: "Update an existing bill (creditor invoice)",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        bill_id: {
          type: "string",
          description: "The UUID of the bill to update",
        },
        bill_data: {
          type: "object",
          description: "Bill data to update",
        },
      },
      required: ["bill_id", "bill_data"],
    },
  },
  {
    name: "delete_bill",
    description: "Delete a bill (creditor invoice)",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        bill_id: {
          type: "string",
          description: "The UUID of the bill to delete",
        },
      },
      required: ["bill_id"],
    },
  },
  {
    name: "search_bills",
    description: "Search bills (creditor invoices) by criteria",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        criteria: {
          type: "array",
          description: "Array of search criteria objects with field, value, and optional operator",
        },
        limit: {
          type: "integer",
          description: "Maximum number of results",
        },
        offset: {
          type: "integer",
          description: "Number of results to skip",
        },
      },
      required: ["criteria"],
    },
  },
  {
    name: "issue_bill",
    description: "Issue a bill (creditor invoice) to change its status",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        bill_id: {
          type: "string",
          description: "The UUID of the bill to issue",
        },
      },
      required: ["bill_id"],
    },
  },
  {
    name: "mark_bill_as_paid",
    description: "Mark a bill (creditor invoice) as paid",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        bill_id: {
          type: "string",
          description: "The UUID of the bill to mark as paid",
        },
      },
      required: ["bill_id"],
    },
  },

  // ===== EXPENSES (v4.0 API) =====
  {
    name: "list_expenses",
    description: "List all expenses with optional pagination",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of expenses to return (default: 50)",
        },
        offset: {
          type: "integer",
          description: "Number of expenses to skip (default: 0)",
        },
      },
    },
  },
  {
    name: "get_expense",
    description: "Get a specific expense by UUID",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        expense_id: {
          type: "string",
          description: "The UUID of the expense to retrieve",
        },
      },
      required: ["expense_id"],
    },
  },
  {
    name: "create_expense",
    description: "Create a new expense record",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        expense_data: {
          type: "object",
          description: "Expense data including title, amount, date, etc.",
        },
      },
      required: ["expense_data"],
    },
  },
  {
    name: "update_expense",
    description: "Update an existing expense",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        expense_id: {
          type: "string",
          description: "The UUID of the expense to update",
        },
        expense_data: {
          type: "object",
          description: "Expense data to update",
        },
      },
      required: ["expense_id", "expense_data"],
    },
  },
  {
    name: "delete_expense",
    description: "Delete an expense",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        expense_id: {
          type: "string",
          description: "The UUID of the expense to delete",
        },
      },
      required: ["expense_id"],
    },
  },

  {
    name: "mark_expense_as_done",
    description: "Mark an expense as done (changes status from DRAFT to DONE)",
    inputSchema: {
      type: "object",
      properties: {
        expense_id: {
          type: "string",
          description: "The UUID of the expense to mark as done",
        },
      },
      required: ["expense_id"],
    },
  },

  // ===== PURCHASE ORDERS (v3.0 API, integer IDs) =====
  {
    name: "list_purchase_orders",
    description: "List all purchase orders with optional pagination",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of purchase orders to return (default: 50)",
        },
        offset: {
          type: "integer",
          description: "Number of purchase orders to skip (default: 0)",
        },
      },
    },
  },
  {
    name: "get_purchase_order",
    description: "Get a specific purchase order by ID",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        purchase_order_id: {
          type: "integer",
          description: "The ID of the purchase order to retrieve",
        },
      },
      required: ["purchase_order_id"],
    },
  },
  {
    name: "create_purchase_order",
    description: "Create a new purchase order to a supplier",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        purchase_order_data: {
          type: "object",
          description: "Purchase order data including contact_id, title, positions, etc.",
        },
      },
      required: ["purchase_order_data"],
    },
  },
  {
    name: "update_purchase_order",
    description: "Update an existing purchase order",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        purchase_order_id: {
          type: "integer",
          description: "The ID of the purchase order to update",
        },
        purchase_order_data: {
          type: "object",
          description: "Purchase order data to update",
        },
      },
      required: ["purchase_order_id", "purchase_order_data"],
    },
  },
  {
    name: "delete_purchase_order",
    description: "Delete a purchase order",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        purchase_order_id: {
          type: "integer",
          description: "The ID of the purchase order to delete",
        },
      },
      required: ["purchase_order_id"],
    },
  },

  // ===== OUTGOING PAYMENTS (v4.0 API, flat endpoint) =====
  {
    name: "list_outgoing_payments",
    description: "List all outgoing payments with optional pagination",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of payments to return (default: 50)",
        },
        offset: {
          type: "integer",
          description: "Number of payments to skip (default: 0)",
        },
      },
    },
  },
  {
    name: "get_outgoing_payment",
    description: "Get a specific outgoing payment by UUID",
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: "object",
      properties: {
        payment_id: {
          type: "string",
          description: "The UUID of the payment to retrieve",
        },
      },
      required: ["payment_id"],
    },
  },
  {
    name: "create_outgoing_payment",
    description: "Create a new outgoing payment",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        payment_data: {
          type: "object",
          description: "Payment data including amount, date, bill reference, etc.",
        },
      },
      required: ["payment_data"],
    },
  },
  {
    name: "update_outgoing_payment",
    description: "Update an existing outgoing payment",
    annotations: { destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        payment_id: {
          type: "string",
          description: "The UUID of the payment to update",
        },
        payment_data: {
          type: "object",
          description: "Payment data to update",
        },
      },
      required: ["payment_id", "payment_data"],
    },
  },
  {
    name: "delete_outgoing_payment",
    description: "Delete an outgoing payment",
    annotations: { destructiveHint: true },
    inputSchema: {
      type: "object",
      properties: {
        payment_id: {
          type: "string",
          description: "The UUID of the payment to delete",
        },
      },
      required: ["payment_id"],
    },
  },
];
