/**
 * Order tool handlers.
 * Implements the logic for each order tool.
 */

import { BexioClient } from "../../bexio-client.js";
import { McpError } from "../../shared/errors.js";
import {
  ListOrdersParamsSchema,
  GetOrderParamsSchema,
  CreateOrderParamsSchema,
  SearchOrdersParamsSchema,
  SearchOrdersByCustomerParamsSchema,
  CreateDeliveryFromOrderParamsSchema,
  CreateInvoiceFromOrderParamsSchema,
  EditOrderParamsSchema,
  DeleteOrderParamsSchema,
  GetOrderPdfParamsSchema,
  GetOrderRepetitionParamsSchema,
  EditOrderRepetitionParamsSchema,
  DeleteOrderRepetitionParamsSchema,
} from "../../types/index.js";

export type HandlerFn = (
  client: BexioClient,
  args: unknown
) => Promise<unknown>;

export const handlers: Record<string, HandlerFn> = {
  list_orders: async (client, args) => {
    const params = ListOrdersParamsSchema.parse(args);
    return client.listOrders(params);
  },

  get_order: async (client, args) => {
    const { order_id } = GetOrderParamsSchema.parse(args);
    const order = await client.getOrder(order_id);
    if (!order) {
      throw McpError.notFound("Order", order_id);
    }
    return order;
  },

  create_order: async (client, args) => {
    const { order_data } = CreateOrderParamsSchema.parse(args);
    // Bexio API 2.0 rejects contact_address / delivery_address on POST /kb_order
    // with 422 "Unexpected extra form field". The only way to override addresses
    // is via contact_sub_id (additional_address). Fail fast with a clear hint.
    const data = order_data as Record<string, unknown>;
    if ("contact_address" in data || "delivery_address" in data) {
      throw McpError.validation(
        "Bexio /kb_order does not accept contact_address or delivery_address. " +
        "To override the address, first create an additional_address for the contact " +
        "(create_additional_address) and pass its id as contact_sub_id on the order."
      );
    }
    return client.createOrder(order_data);
  },

  search_orders: async (client, args) => {
    const { search_params } = SearchOrdersParamsSchema.parse(args);
    return client.searchOrders(search_params);
  },

  search_orders_by_customer: async (client, args) => {
    const params = SearchOrdersByCustomerParamsSchema.parse(args);

    // Step 1: Find contacts by name
    const contacts = await client.findContactByName(params.customer_name);

    if (!contacts || contacts.length === 0) {
      return {
        orders: [],
        message: `No contacts found with name "${params.customer_name}"`,
        contacts_found: 0,
      };
    }

    // Step 2: Search orders for each contact (limit to first 5)
    const allOrders: unknown[] = [];

    for (const contact of contacts.slice(0, 5)) {
      const contactId = (contact as { id?: number }).id;
      if (contactId) {
        const orders = await client.searchOrdersByContactId(contactId);
        allOrders.push(...(orders as unknown[]));
      }
    }

    return {
      orders: allOrders,
      contacts_found: contacts.length,
      customer_name: params.customer_name,
    };
  },

  create_delivery_from_order: async (client, args) => {
    const { order_id } = CreateDeliveryFromOrderParamsSchema.parse(args);
    return client.createDeliveryFromOrder(order_id);
  },

  create_invoice_from_order: async (client, args) => {
    const { order_id } = CreateInvoiceFromOrderParamsSchema.parse(args);
    return client.createInvoiceFromOrder(order_id);
  },

  edit_order: async (client, args) => {
    const { order_id, order_data } = EditOrderParamsSchema.parse(args);
    // Bexio kb_order edit-widget rejects positions, contact_address, delivery_address
    // with 422 "Widget schema does not include the following field(s)".
    // Only meta fields (title, header, footer, is_valid_from, api_reference) work.
    // For position/address changes: delete_order + create_order with fresh payload.
    const data = order_data as Record<string, unknown>;
    const forbidden = ["positions", "contact_address", "delivery_address"].filter(
      (k) => k in data
    );
    if (forbidden.length > 0) {
      throw McpError.validation(
        `Bexio /kb_order/${order_id} edit-widget does not accept: ${forbidden.join(", ")}. ` +
        "Only meta fields are editable (title, header, footer, is_valid_from, api_reference). " +
        "To change positions or addresses: delete the order and create a fresh one."
      );
    }
    return client.editOrder(order_id, order_data);
  },

  delete_order: async (client, args) => {
    const { order_id } = DeleteOrderParamsSchema.parse(args);
    return client.deleteOrder(order_id);
  },

  get_order_pdf: async (client, args) => {
    const { order_id } = GetOrderPdfParamsSchema.parse(args);
    return client.getOrderPdf(order_id);
  },

  get_order_repetition: async (client, args) => {
    const { order_id } = GetOrderRepetitionParamsSchema.parse(args);
    return client.getOrderRepetition(order_id);
  },

  edit_order_repetition: async (client, args) => {
    const { order_id, repetition_id, repetition_data } = EditOrderRepetitionParamsSchema.parse(args);
    return client.editOrderRepetition(order_id, repetition_id, repetition_data);
  },

  delete_order_repetition: async (client, args) => {
    const { order_id, repetition_id } = DeleteOrderRepetitionParamsSchema.parse(args);
    return client.deleteOrderRepetition(order_id, repetition_id);
  },
};
