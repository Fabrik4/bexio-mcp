/**
 * Tasks-related Zod schemas and types.
 * Domain: Tasks (task management with optional resource linking)
 */

import { z } from "zod";
import { SearchCriteriaSchema } from "../common.js";

/** Enum of supported resource types for task linking (same as notes) */
const ResourceTypeEnum = z.enum([
  "contact",
  "invoice",
  "quote",
  "order",
  "delivery",
  "project",
  "bill",
]);

// List tasks with optional filtering
export const ListTasksParamsSchema = z.object({
  limit: z.number().int().positive().default(50),
  offset: z.number().int().min(0).default(0),
  order_by: z.string().optional(),
  user_id: z.number().int().positive().optional(),
});

export type ListTasksParams = z.infer<typeof ListTasksParamsSchema>;

// Get single task
export const GetTaskParamsSchema = z.object({
  task_id: z.number().int().positive(),
});

export type GetTaskParams = z.infer<typeof GetTaskParamsSchema>;

// Create task
export const CreateTaskParamsSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().optional(),
  user_id: z.number().int().positive(),
  finish_date: z.string().optional(),
  task_priority_id: z.number().int().positive().optional(),
  task_status_id: z.number().int().positive().optional(),
  resource_type: ResourceTypeEnum.optional(),
  resource_id: z.number().int().positive().optional(),
  info: z.string().optional(),
});

export type CreateTaskParams = z.infer<typeof CreateTaskParamsSchema>;

// Update task
export const UpdateTaskParamsSchema = z.object({
  task_id: z.number().int().positive(),
  task_data: z.record(z.unknown()),
});

export type UpdateTaskParams = z.infer<typeof UpdateTaskParamsSchema>;

// Delete task
export const DeleteTaskParamsSchema = z.object({
  task_id: z.number().int().positive(),
});

export type DeleteTaskParams = z.infer<typeof DeleteTaskParamsSchema>;

// Search tasks
export const SearchTasksParamsSchema = z.object({
  search_criteria: z
    .array(SearchCriteriaSchema)
    .min(1, "At least one search criterion is required"),
  limit: z.number().int().positive().default(50),
});

export type SearchTasksParams = z.infer<typeof SearchTasksParamsSchema>;

// List task priorities (no params needed)
export const ListTaskPrioritiesParamsSchema = z.object({});

export type ListTaskPrioritiesParams = z.infer<typeof ListTaskPrioritiesParamsSchema>;

// List task statuses (no params needed)
export const ListTaskStatusesParamsSchema = z.object({});

export type ListTaskStatusesParams = z.infer<typeof ListTaskStatusesParamsSchema>;
