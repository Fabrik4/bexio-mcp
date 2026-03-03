/**
 * Files and Additional Addresses tool handlers.
 * Implements the logic for each files domain tool.
 */

import { BexioClient } from "../../bexio-client.js";
import { McpError } from "../../shared/errors.js";
import {
  ListFilesParamsSchema,
  GetFileParamsSchema,
  UploadFileParamsSchema,
  DownloadFileParamsSchema,
  UpdateFileParamsSchema,
  DeleteFileParamsSchema,
  ListAdditionalAddressesParamsSchema,
  GetAdditionalAddressParamsSchema,
  CreateAdditionalAddressParamsSchema,
  UpdateAdditionalAddressParamsSchema,
  SearchAdditionalAddressesParamsSchema,
  DeleteAdditionalAddressParamsSchema,
} from "../../types/index.js";

export type HandlerFn = (
  client: BexioClient,
  args: unknown
) => Promise<unknown>;

export const handlers: Record<string, HandlerFn> = {
  // ===== FILES =====
  list_files: async (client, args) => {
    const params = ListFilesParamsSchema.parse(args);
    return client.listFiles(params);
  },

  get_file: async (client, args) => {
    const { file_id } = GetFileParamsSchema.parse(args);
    const file = await client.getFile(file_id);
    if (!file) {
      throw McpError.notFound("File", file_id);
    }
    return file;
  },

  upload_file: async (client, args) => {
    const params = UploadFileParamsSchema.parse(args);
    return client.uploadFile(params);
  },

  download_file: async (client, args) => {
    const { file_id } = DownloadFileParamsSchema.parse(args);
    const content_base64 = await client.downloadFile(file_id);
    return {
      file_id,
      content_base64,
      message: "File content returned as base64 encoded string",
    };
  },

  update_file: async (client, args) => {
    const { file_id, file_data } = UpdateFileParamsSchema.parse(args);
    return client.updateFile(file_id, file_data);
  },

  delete_file: async (client, args) => {
    const { file_id } = DeleteFileParamsSchema.parse(args);
    return client.deleteFile(file_id);
  },

  // ===== ADDITIONAL ADDRESSES =====
  list_additional_addresses: async (client, args) => {
    const { contact_id, limit, offset } = ListAdditionalAddressesParamsSchema.parse(args);
    return client.listAdditionalAddresses(contact_id, { limit, offset });
  },

  get_additional_address: async (client, args) => {
    const { contact_id, address_id } = GetAdditionalAddressParamsSchema.parse(args);
    const address = await client.getAdditionalAddress(contact_id, address_id);
    if (!address) {
      throw McpError.notFound("Additional Address", address_id);
    }
    return address;
  },

  create_additional_address: async (client, args) => {
    const { contact_id, address_data } = CreateAdditionalAddressParamsSchema.parse(args);
    return client.createAdditionalAddress(contact_id, address_data);
  },

  update_additional_address: async (client, args) => {
    const { contact_id, address_id, address_data } = UpdateAdditionalAddressParamsSchema.parse(args);
    return client.updateAdditionalAddress(contact_id, address_id, address_data);
  },

  search_additional_addresses: async (client, args) => {
    const { contact_id, search_criteria, limit } = SearchAdditionalAddressesParamsSchema.parse(args);
    return client.searchAdditionalAddresses(contact_id, search_criteria, limit);
  },

  delete_additional_address: async (client, args) => {
    const { contact_id, address_id } = DeleteAdditionalAddressParamsSchema.parse(args);
    return client.deleteAdditionalAddress(contact_id, address_id);
  },
};
