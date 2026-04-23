/**
 * Files and Additional Addresses Zod schemas and types.
 * Domain: Files (file) and Additional Addresses (contact/{id}/additional_address)
 */

import { z } from "zod";
import { SearchCriteriaSchema } from "../common.js";

// ===== FILES =====

// List files
export const ListFilesParamsSchema = z.object({
  limit: z.number().int().positive().default(50),
  offset: z.number().int().min(0).default(0),
});

export type ListFilesParams = z.infer<typeof ListFilesParamsSchema>;

// Get single file
export const GetFileParamsSchema = z.object({
  file_id: z.number().int().positive(),
});

export type GetFileParams = z.infer<typeof GetFileParamsSchema>;

// Upload file (accepts base64 content for MCP JSON transport)
export const UploadFileParamsSchema = z.object({
  name: z.string().min(1),
  content_base64: z.string().min(1),
  content_type: z.string().min(1),
});

export type UploadFileParams = z.infer<typeof UploadFileParamsSchema>;

// Download file
export const DownloadFileParamsSchema = z.object({
  file_id: z.number().int().positive(),
});

export type DownloadFileParams = z.infer<typeof DownloadFileParamsSchema>;

// Update file
export const UpdateFileParamsSchema = z.object({
  file_id: z.number().int().positive(),
  file_data: z.record(z.unknown()),
});

export type UpdateFileParams = z.infer<typeof UpdateFileParamsSchema>;

// Delete file
export const DeleteFileParamsSchema = z.object({
  file_id: z.number().int().positive(),
});

export type DeleteFileParams = z.infer<typeof DeleteFileParamsSchema>;

// ===== ADDITIONAL ADDRESSES =====

// List additional addresses for a contact
export const ListAdditionalAddressesParamsSchema = z.object({
  contact_id: z.number().int().positive(),
  limit: z.number().int().positive().default(50),
  offset: z.number().int().min(0).default(0),
});

export type ListAdditionalAddressesParams = z.infer<typeof ListAdditionalAddressesParamsSchema>;

// Get single additional address
export const GetAdditionalAddressParamsSchema = z.object({
  contact_id: z.number().int().positive(),
  address_id: z.number().int().positive(),
});

export type GetAdditionalAddressParams = z.infer<typeof GetAdditionalAddressParamsSchema>;

// Create additional address
// NOTE: Bexio 2.0 /contact/{id}/additional_address erwartet separate
// street_name + house_number Felder. Das kombinierte "address"-Feld wird mit
// 422 "Unexpected extra form field" abgelehnt. GET-Response zeigt "address"
// als auto-gemerktes Feld — aber POST/PUT brauchen die atomaren Felder.
export const AdditionalAddressDataSchema = z
  .object({
    name: z.string().optional(),
    name_addition: z.string().optional(),
    street_name: z.string().optional(),
    house_number: z.string().optional(),
    address_addition: z.string().optional(),
    postcode: z.string().optional(),
    city: z.string().optional(),
    country_id: z.number().int().positive().optional(),
    subject: z.string().optional(),
    description: z.string().optional(),
  })
  .passthrough();

export const CreateAdditionalAddressParamsSchema = z.object({
  contact_id: z.number().int().positive(),
  address_data: AdditionalAddressDataSchema,
});

export type CreateAdditionalAddressParams = z.infer<typeof CreateAdditionalAddressParamsSchema>;

// Update additional address (REFDATA-15)
export const UpdateAdditionalAddressParamsSchema = z.object({
  contact_id: z.number().int().positive(),
  address_id: z.number().int().positive(),
  address_data: AdditionalAddressDataSchema,
});

export type UpdateAdditionalAddressParams = z.infer<typeof UpdateAdditionalAddressParamsSchema>;

// Search additional addresses (REFDATA-15)
export const SearchAdditionalAddressesParamsSchema = z.object({
  contact_id: z.number().int().positive(),
  search_criteria: z.array(SearchCriteriaSchema).min(1),
  limit: z.number().int().positive().default(50),
});

export type SearchAdditionalAddressesParams = z.infer<typeof SearchAdditionalAddressesParamsSchema>;

// Delete additional address
export const DeleteAdditionalAddressParamsSchema = z.object({
  contact_id: z.number().int().positive(),
  address_id: z.number().int().positive(),
});

export type DeleteAdditionalAddressParams = z.infer<typeof DeleteAdditionalAddressParamsSchema>;
