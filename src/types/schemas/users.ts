/**
 * User-related Zod schemas and types.
 * Domain: Users (Real Users & Fictional Users)
 */

import { z } from "zod";

// ===== REAL USERS (USERS-01) =====

// List real users
export const ListUsersParamsSchema = z.object({
  limit: z.number().int().positive().default(50),
  offset: z.number().int().min(0).default(0),
});

export type ListUsersParams = z.infer<typeof ListUsersParamsSchema>;

// Get single real user
export const GetUserParamsSchema = z.object({
  user_id: z.number().int().positive(),
});

export type GetUserParams = z.infer<typeof GetUserParamsSchema>;

// ===== FICTIONAL USERS =====

// List fictional users
export const ListFictionalUsersParamsSchema = z.object({
  limit: z.number().int().positive().default(50),
  offset: z.number().int().min(0).default(0),
});

export type ListFictionalUsersParams = z.infer<
  typeof ListFictionalUsersParamsSchema
>;

// Get single fictional user
export const GetFictionalUserParamsSchema = z.object({
  user_id: z.number().int().positive(),
});

export type GetFictionalUserParams = z.infer<
  typeof GetFictionalUserParamsSchema
>;

// Create fictional user
export const CreateFictionalUserParamsSchema = z.object({
  user_data: z.record(z.unknown()),
});

export type CreateFictionalUserParams = z.infer<
  typeof CreateFictionalUserParamsSchema
>;

// Update fictional user
export const UpdateFictionalUserParamsSchema = z.object({
  user_id: z.number().int().positive(),
  user_data: z.record(z.unknown()),
});

export type UpdateFictionalUserParams = z.infer<
  typeof UpdateFictionalUserParamsSchema
>;

// Delete fictional user
export const DeleteFictionalUserParamsSchema = z.object({
  user_id: z.number().int().positive(),
});

export type DeleteFictionalUserParams = z.infer<
  typeof DeleteFictionalUserParamsSchema
>;
