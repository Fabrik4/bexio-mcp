# Bexio MCP Server — Fixed Fork

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-green.svg)](https://modelcontextprotocol.io/)
[![310 Tools](https://img.shields.io/badge/tools-310-orange.svg)](#features)

> **Community fork of [@promptpartner/bexio-mcp-server](https://github.com/PromptPartner/bexio-mcp-server)** with a critical schema fix that makes all 310 tools actually usable.

Connect your [Bexio](https://www.bexio.com/) accounting to AI assistants via the [Model Context Protocol](https://modelcontextprotocol.io/). Create invoices, search contacts, manage projects, track time — all from Claude, n8n, or any MCP client.

## The Problem

The original server registers all tools with **empty parameter schemas** (`properties: {}`). MCP clients like Claude Desktop or Claude Code cannot pass parameters to tools. Result: **~95% of tools silently fail** — only parameterless list/dashboard commands work.

## The Fix

This fork converts the existing JSON Schema `inputSchema` definitions to proper Zod shapes that `McpServer.tool()` exposes to clients. The fix is in a single file (`src/server.ts`) and applies to **all 310 tools automatically**.

| | Original | This Fork |
|---|----------|-----------|
| List contacts | ✅ | ✅ |
| Search contacts by name | ❌ `properties: {}` | ✅ |
| Create invoice | ❌ `properties: {}` | ✅ |
| Send invoice by email | ❌ `properties: {}` | ✅ |
| Any tool with parameters | ❌ | ✅ |

## Quick Start

### Claude Code / Claude Desktop

Add to your MCP config:

```json
{
  "mcpServers": {
    "bexio": {
      "command": "npx",
      "args": ["-y", "github:Fabrik4/bexio-mcp"],
      "env": {
        "BEXIO_API_TOKEN": "your-token-here"
      }
    }
  }
}
```

**Config locations:**
- Claude Code: `.claude/settings.local.json` or `~/.claude.json`
- Claude Desktop (macOS): `~/Library/Application Support/Claude/claude_desktop_config.json`
- Claude Desktop (Windows): `%APPDATA%\Claude\claude_desktop_config.json`

### n8n / HTTP Clients

```bash
BEXIO_API_TOKEN=your-token npx github:Fabrik4/bexio-mcp --mode http --port 8000
```

### Build from Source

```bash
git clone https://github.com/Fabrik4/bexio-mcp
cd bexio-mcp/src
npm install && npm run build
BEXIO_API_TOKEN=your-token node dist/index.js
```

## Getting Your Bexio API Token

1. Go to [developer.bexio.com](https://developer.bexio.com/)
2. Log in with your Bexio account
3. Navigate to **Personal Access Tokens**
4. Click **Create New Token**
5. Copy the token — use it in `BEXIO_API_TOKEN`

## Features

310 tools across all Bexio domains:

| Domain | Tools | Examples |
|--------|-------|---------|
| **Contacts & CRM** | 40+ | Create, search, edit contacts and companies, groups, relations |
| **Invoices & Sales** | 50+ | Full lifecycle — create, issue, send, cancel. Quotes, orders, reminders |
| **Banking & Payments** | 20+ | Swiss QR-bill (QR-IBAN), ISO 20022, incoming/outgoing payments |
| **Projects & Time** | 30+ | Projects, milestones, work packages, timesheets |
| **Accounting** | 20+ | Chart of accounts, journal entries, VAT periods |
| **Purchase & Expenses** | 25+ | Bills, expenses, purchase orders, outgoing payments |
| **Files & Documents** | 10+ | Upload, download, manage documents |
| **Payroll** | 15+ | Employees, absences, payroll docs (requires Bexio Payroll module) |
| **Reference Data** | 30+ | Countries, languages, currencies, taxes, units |
| **Stock & Inventory** | 10+ | Stock locations, areas, articles |

## Examples

### Find Overdue Invoices

> "Show me all overdue invoices"

Claude calls `get_overdue_invoices` → returns a table with invoice numbers, customers, amounts, and days overdue.

### Create an Invoice

> "Create an invoice for Sunrise AG: 10h consulting at CHF 150/h and a software license CHF 500"

Claude finds the contact, creates the invoice with line items, calculates VAT (8.1%), and shows the total. Invoice starts as draft — say "issue it" to finalize.

### Project Time Summary

> "How much time was logged on 'Website Redesign' this month?"

Claude searches projects, fetches timesheets, and breaks down hours by team member with budget usage.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BEXIO_API_TOKEN` | Yes | — | Your Bexio API token |
| `BEXIO_BASE_URL` | No | `https://api.bexio.com/2.0` | API endpoint URL |
| `BEXIO_ENABLED_CATEGORIES` | No | (all) | Comma-separated category whitelist — see below |

### Reducing Token Budget — Category Whitelist

All 310 tools are registered by default. For focused workflows or smaller
models (e.g. Sonnet, Haiku), registering only a subset reduces the system-
prompt token cost significantly.

Set `BEXIO_ENABLED_CATEGORIES` to a comma-separated list of categories:

```bash
BEXIO_ENABLED_CATEGORIES=contacts,invoices,purchase,banking,quotes,projects
```

Available categories: `reference`, `company`, `banking`, `projects`,
`timetracking`, `accounting`, `purchase`, `files`, `payroll`, `contacts`,
`invoices`, `orders`, `quotes`, `payments`, `reminders`, `deliveries`,
`items`, `reports`, `users`, `misc`, `notes`, `tasks`, `stock`, `docs`,
`positions`.

Unknown names are logged to stderr and ignored. Empty/unset = all enabled
(backward compatible).

Typical bundles:
- **Finance-only:** `contacts,invoices,purchase,banking,payments,reports`
- **Operational (no accounting):** `contacts,projects,timetracking,quotes,orders,tasks`
- **Read-only dashboards:** `reference,company,reports,contacts,invoices`

## Command Line Options

```bash
npx github:Fabrik4/bexio-mcp [options]

Options:
  --mode <stdio|http>  Transport mode (default: stdio)
  --host <address>     HTTP host (default: 0.0.0.0)
  --port <number>      HTTP port (default: 8000)
```

## Compatibility

| Client | Transport | Status |
|--------|-----------|--------|
| Claude Code | stdio | ✅ Tested |
| Claude Desktop | stdio | ✅ Tested |
| n8n | HTTP | ✅ Supported |
| Other MCP clients | stdio/HTTP | ✅ Should work |

## Support

If this fork saves you time, consider buying me a coffee:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/fritzlouish)

## Credits

Built on the excellent work of:
- **[Lukas Hertig](https://github.com/lukashertig)** and **[Sebastian Bryner](https://github.com/PromptPartner)** at [PromptPartner](https://promptpartner.ai) — original project with 310 tools covering the full Bexio API
- **Sebastian Bryner** at [bryner.tech](https://bryner.tech/) — v1.0 foundation with 83 tools

The schema fix in this fork was identified and implemented by [Fabrik4](https://fabrik4.ch) while integrating Bexio into our AI-powered business tools for Swiss KMU.

## License

MIT — see [LICENSE](LICENSE).

## Links

- [Original Project (PromptPartner)](https://github.com/PromptPartner/bexio-mcp-server)
- [Bexio API Documentation](https://docs.bexio.com/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Fabrik4 — Beschriftungen & Digitalagentur](https://fabrik4.ch)

## Disclaimer

This is an independent, community-driven project and is **not affiliated with, endorsed by, or officially connected to Bexio AG**. "Bexio" is a trademark of Bexio AG. This project provides an integration layer to the publicly available Bexio API. Use at your own risk.
