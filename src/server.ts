/**
 * Bexio MCP Server v2 — Fabrik4 Fork
 *
 * FIX: Convert JSON Schema inputSchema to ZodRawShape so that
 * McpServer.tool() exposes parameters in the tool schema.
 * Without this, MCP clients cannot pass parameters to tools.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z, type ZodTypeAny } from "zod";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { logger } from "./logger.js";
import { BexioClient } from "./bexio-client.js";
import { getAllToolDefinitions, getHandler } from "./tools/index.js";
import { formatSuccessResponse, formatErrorResponse, McpError } from "./shared/index.js";
import { registerUIResources } from "./ui-resources.js";

const SERVER_NAME = "bexio-mcp-server";
const SERVER_VERSION = "2.1.0-fabrik4";

/**
 * Convert a JSON Schema property definition to a Zod type.
 * Handles the types used in Bexio tool definitions.
 */
function jsonSchemaPropertyToZod(prop: Record<string, unknown>): ZodTypeAny {
  const type = prop.type as string | undefined;
  const enumValues = prop.enum as string[] | undefined;

  if (enumValues && enumValues.length > 0) {
    return z.enum(enumValues as [string, ...string[]]);
  }

  switch (type) {
    case "integer":
    case "number":
      return z.number();
    case "string":
      return z.string();
    case "boolean":
      return z.boolean();
    case "array":
      return z.array(z.unknown());
    case "object":
      return z.record(z.unknown());
    default:
      return z.unknown();
  }
}

/**
 * Convert a Tool's inputSchema to a ZodRawShape that McpServer.tool() accepts.
 * Makes required fields non-optional, everything else optional.
 */
function inputSchemaToZodShape(def: Tool): Record<string, ZodTypeAny> {
  const schema = def.inputSchema;
  if (!schema || typeof schema !== "object") return {};

  const properties = (schema as Record<string, unknown>).properties as
    | Record<string, Record<string, unknown>>
    | undefined;
  if (!properties || Object.keys(properties).length === 0) return {};

  const required = new Set(
    ((schema as Record<string, unknown>).required as string[]) || []
  );

  const shape: Record<string, ZodTypeAny> = {};
  for (const [key, prop] of Object.entries(properties)) {
    const zodType = jsonSchemaPropertyToZod(prop);
    const desc = (prop.description as string) || undefined;
    const described = desc ? zodType.describe(desc) : zodType;
    shape[key] = required.has(key) ? described : described.optional();
  }

  return shape;
}

export class BexioMcpServer {
  private server: McpServer;
  private client: BexioClient | null = null;

  constructor() {
    this.server = new McpServer({
      name: SERVER_NAME,
      version: SERVER_VERSION,
    });
  }

  /** Initialize with Bexio client and register tools */
  initialize(client: BexioClient): void {
    this.client = client;
    this.registerTools();
    registerUIResources(this.server, client);
    logger.info(`Initialized with ${getAllToolDefinitions().length} tools + 3 UI tools`);
  }

  private registerTools(): void {
    // Register ping tool for SDK validation
    this.server.tool(
      "ping",
      "Test tool that returns pong - validates SDK integration",
      {},
      async () => {
        logger.debug("ping tool called");
        return {
          content: [{ type: "text" as const, text: "pong" }],
        };
      }
    );

    // Register all domain tools
    const definitions = getAllToolDefinitions();

    for (const def of definitions) {
      const handler = getHandler(def.name);
      if (!handler) {
        logger.warn(`No handler found for tool: ${def.name}`);
        continue;
      }

      // Convert JSON Schema inputSchema → ZodRawShape so MCP clients
      // see the actual parameters in the tool schema.
      // Type assertion needed because dynamic shapes cause TS2589
      // (excessive type instantiation depth) with McpServer generics.
      const zodShape = inputSchemaToZodShape(def);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.server.tool as any)(
        def.name,
        def.description || "",
        zodShape,
        async (args: Record<string, unknown>) => {
          if (!this.client) {
            return formatErrorResponse(
              McpError.internal("Bexio client not initialized")
            );
          }

          try {
            const result = await handler(this.client, args);
            return formatSuccessResponse(def.name, result);
          } catch (error) {
            if (error instanceof McpError) {
              return formatErrorResponse(error);
            }
            if (error instanceof z.ZodError) {
              return formatErrorResponse(
                McpError.validation(error.message, { issues: error.issues })
              );
            }
            return formatErrorResponse(
              error instanceof Error
                ? error
                : new Error(String(error))
            );
          }
        }
      );
    }

    logger.info(`Registered ${definitions.length + 1} tools (including ping)`);
  }

  async run(): Promise<void> {
    logger.info(`Starting ${SERVER_NAME} v${SERVER_VERSION}`);

    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    logger.info("Server connected to stdio transport");
  }
}
