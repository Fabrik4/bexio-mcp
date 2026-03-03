/**
 * Position-related Zod schemas and types.
 * Domain: Positions on sales documents (quotes, orders, invoices).
 * Covers 7 position types: default, item, text, subtotal, discount, pagebreak, sub.
 */

import { z } from "zod";

/**
 * Document type mapping: human-readable names -> Bexio API internal names.
 * Used by position handlers to construct API URLs.
 */
export const DOCUMENT_TYPE_MAP: Record<string, string> = {
  quote: "kb_offer",
  order: "kb_order",
  invoice: "kb_invoice",
};

/**
 * Position type mapping: human-readable names -> Bexio API internal names.
 * Used by position handlers to construct API URLs.
 */
export const POSITION_TYPE_MAP: Record<string, string> = {
  default: "kb_position_custom",
  item: "kb_position_article",
  text: "kb_position_text",
  subtotal: "kb_position_subtotal",
  discount: "kb_position_discount",
  pagebreak: "kb_position_pagebreak",
  sub: "kb_position_subposition",
};

/** Enum of supported human-readable document types */
const DocumentTypeEnum = z.enum(["quote", "order", "invoice"]);

export type DocumentType = z.infer<typeof DocumentTypeEnum>;

// List positions of a given type on a document
export const ListPositionsParamsSchema = z.object({
  document_type: DocumentTypeEnum,
  document_id: z.number().int().positive(),
});

export type ListPositionsParams = z.infer<typeof ListPositionsParamsSchema>;

// Get a single position by ID
export const GetPositionParamsSchema = z.object({
  document_type: DocumentTypeEnum,
  document_id: z.number().int().positive(),
  position_id: z.number().int().positive(),
});

export type GetPositionParams = z.infer<typeof GetPositionParamsSchema>;

// Create a new position on a document
export const CreatePositionParamsSchema = z.object({
  document_type: DocumentTypeEnum,
  document_id: z.number().int().positive(),
  position_data: z.record(z.unknown()),
});

export type CreatePositionParams = z.infer<typeof CreatePositionParamsSchema>;

// Edit an existing position on a document
export const EditPositionParamsSchema = z.object({
  document_type: DocumentTypeEnum,
  document_id: z.number().int().positive(),
  position_id: z.number().int().positive(),
  position_data: z.record(z.unknown()),
});

export type EditPositionParams = z.infer<typeof EditPositionParamsSchema>;

// Delete a position from a document
export const DeletePositionParamsSchema = z.object({
  document_type: DocumentTypeEnum,
  document_id: z.number().int().positive(),
  position_id: z.number().int().positive(),
});

export type DeletePositionParams = z.infer<typeof DeletePositionParamsSchema>;
