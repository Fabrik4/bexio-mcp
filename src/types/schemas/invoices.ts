/**
 * Invoice-related Zod schemas and types.
 * Domain: Invoices (kb_invoice)
 */

import { z } from "zod";

// Invoice position (line item)
export const InvoicePositionSchema = z
  .object({
    type: z.string().min(1, "Position type is required"),
    text: z.string().min(1, "Description is required"),
    amount: z.number().positive("Amount must be positive"),
    unit_price: z.number().positive("Unit price must be positive"),
    discount_in_percent: z.number().min(0).max(100).optional(),
    position_total: z.number().optional(),
    unit_id: z.number().int().positive().optional(),
    account_id: z.number().int().positive().optional(),
    tax_id: z.number().int().positive().optional(),
    tax_value: z.number().optional(),
    mwst_type: z.number().int().optional(),
    mwst_is_net: z.boolean().optional(),
    map_all: z.boolean().optional(),
  })
  .passthrough();

export type InvoicePosition = z.infer<typeof InvoicePositionSchema>;

// Invoice creation payload
export const InvoiceCreateSchema = z
  .object({
    title: z.string().min(1, "Invoice title is required"),
    contact_id: z.number().int().positive("Contact ID must be positive"),
    currency_id: z.number().int().positive().optional(),
    language_id: z.number().int().positive().optional(),
    user_id: z.number().int().positive().optional(),
    bank_account_id: z.number().int().positive().optional(),
    payment_type_id: z.number().int().positive().optional(),
    mwst_type: z.number().int().optional(),
    mwst_is_net: z.boolean().optional(),
    show_position_taxes: z.boolean().optional(),
    is_valid_from: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .optional(),
    is_valid_until: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .optional(),
    positions: z
      .array(InvoicePositionSchema)
      .min(1, "At least one position is required"),
  })
  .passthrough();

export type InvoiceCreate = z.infer<typeof InvoiceCreateSchema>;

// List invoices
export const ListInvoicesParamsSchema = z.object({
  limit: z.number().int().positive().default(50),
  offset: z.number().int().min(0).default(0),
});

export type ListInvoicesParams = z.infer<typeof ListInvoicesParamsSchema>;

// List all invoices (auto-pagination)
export const ListAllInvoicesParamsSchema = z.object({
  chunk_size: z.number().int().positive().default(100),
});

export type ListAllInvoicesParams = z.infer<typeof ListAllInvoicesParamsSchema>;

// Get single invoice
export const GetInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type GetInvoiceParams = z.infer<typeof GetInvoiceParamsSchema>;

// Search invoices
export const SearchInvoicesParamsSchema = z.object({
  query: z.string().optional(),
  field: z.string().default("title"),
  operator: z.string().default("LIKE"),
  filters: z
    .array(
      z.object({
        field: z.string(),
        operator: z.string(),
        value: z.unknown(),
      })
    )
    .optional(),
  limit: z.number().int().positive().optional(),
});

export type SearchInvoicesParams = z.infer<typeof SearchInvoicesParamsSchema>;

// Search by customer name
export const SearchInvoicesByCustomerParamsSchema = z.object({
  customer_name: z.string().min(1),
  limit: z.number().int().positive().default(50),
});

export type SearchInvoicesByCustomerParams = z.infer<
  typeof SearchInvoicesByCustomerParamsSchema
>;

// Create invoice
export const CreateInvoiceParamsSchema = z.object({
  invoice_data: InvoiceCreateSchema,
});

export type CreateInvoiceParams = z.infer<typeof CreateInvoiceParamsSchema>;

// List invoice statuses
export const ListInvoiceStatusesParamsSchema = z.object({});

export type ListInvoiceStatusesParams = z.infer<
  typeof ListInvoiceStatusesParamsSchema
>;

// List all document statuses
export const ListAllStatusesParamsSchema = z.object({
  document_type: z
    .enum(["all", "invoices", "quotes", "orders"])
    .default("all"),
});

export type ListAllStatusesParams = z.infer<typeof ListAllStatusesParamsSchema>;

// Invoice actions
export const IssueInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type IssueInvoiceParams = z.infer<typeof IssueInvoiceParamsSchema>;

export const CancelInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type CancelInvoiceParams = z.infer<typeof CancelInvoiceParamsSchema>;

export const MarkInvoiceAsSentParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type MarkInvoiceAsSentParams = z.infer<
  typeof MarkInvoiceAsSentParamsSchema
>;

export const SendInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type SendInvoiceParams = z.infer<typeof SendInvoiceParamsSchema>;

export const CopyInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type CopyInvoiceParams = z.infer<typeof CopyInvoiceParamsSchema>;

// Edit invoice
export const EditInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
  invoice_data: z.record(z.unknown()),
});

export type EditInvoiceParams = z.infer<typeof EditInvoiceParamsSchema>;

// Delete invoice
export const DeleteInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type DeleteInvoiceParams = z.infer<typeof DeleteInvoiceParamsSchema>;

// Get invoice PDF
export const GetInvoicePdfParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type GetInvoicePdfParams = z.infer<typeof GetInvoicePdfParamsSchema>;

// Revert invoice to draft
export const RevertInvoiceParamsSchema = z.object({
  invoice_id: z.number().int().positive(),
});

export type RevertInvoiceParams = z.infer<typeof RevertInvoiceParamsSchema>;

// Search params interface for client methods
export interface InvoiceSearchParams {
  query?: string;
  field?: string;
  operator?: string;
  filters?: Array<{
    field: string;
    operator: string;
    value: unknown;
  }>;
  limit?: number;
}
