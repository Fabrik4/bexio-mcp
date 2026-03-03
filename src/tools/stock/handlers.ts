/**
 * Stock tool handlers.
 * Implements the logic for each stock tool.
 */

import { BexioClient } from "../../bexio-client.js";
import {
  ListStockLocationsParamsSchema,
  SearchStockLocationsParamsSchema,
  ListStockAreasParamsSchema,
  SearchStockAreasParamsSchema,
} from "../../types/index.js";

export type HandlerFn = (
  client: BexioClient,
  args: unknown
) => Promise<unknown>;

export const handlers: Record<string, HandlerFn> = {
  // ===== STOCK LOCATIONS (STOCK-01) =====
  list_stock_locations: async (client, args) => {
    const params = ListStockLocationsParamsSchema.parse(args);
    return client.listStockLocations(params);
  },

  search_stock_locations: async (client, args) => {
    const { search_criteria, limit } = SearchStockLocationsParamsSchema.parse(args);
    return client.searchStockLocations(search_criteria, limit);
  },

  // ===== STOCK AREAS (STOCK-02) =====
  list_stock_areas: async (client, args) => {
    const params = ListStockAreasParamsSchema.parse(args);
    return client.listStockAreas(params);
  },

  search_stock_areas: async (client, args) => {
    const { search_criteria, limit } = SearchStockAreasParamsSchema.parse(args);
    return client.searchStockAreas(search_criteria, limit);
  },
};
