/**
 * Stock Zod schemas and types.
 * Domain: Stock (Stock Locations, Stock Areas)
 */

import { z } from "zod";
import { SearchCriteriaSchema } from "../common.js";

// ===== STOCK LOCATIONS (STOCK-01) =====

// List stock locations
export const ListStockLocationsParamsSchema = z.object({
  limit: z.number().int().positive().default(100),
  offset: z.number().int().min(0).default(0),
});

export type ListStockLocationsParams = z.infer<typeof ListStockLocationsParamsSchema>;

// Search stock locations
export const SearchStockLocationsParamsSchema = z.object({
  search_criteria: z.array(SearchCriteriaSchema).min(1),
  limit: z.number().int().positive().default(100),
});

export type SearchStockLocationsParams = z.infer<typeof SearchStockLocationsParamsSchema>;

// ===== STOCK AREAS (STOCK-02) =====

// List stock areas
export const ListStockAreasParamsSchema = z.object({
  limit: z.number().int().positive().default(100),
  offset: z.number().int().min(0).default(0),
});

export type ListStockAreasParams = z.infer<typeof ListStockAreasParamsSchema>;

// Search stock areas
export const SearchStockAreasParamsSchema = z.object({
  search_criteria: z.array(SearchCriteriaSchema).min(1),
  limit: z.number().int().positive().default(100),
});

export type SearchStockAreasParams = z.infer<typeof SearchStockAreasParamsSchema>;
