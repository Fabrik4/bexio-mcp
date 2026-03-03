# Roadmap: Bexio MCP v2

## Overview

This roadmap transforms the v1 Bexio MCP server (83 tools, SDK 0.5.0, 2,418-line monolith) into a modern v2 distribution with one-click installation, complete API coverage, and modular architecture. The journey starts with SDK migration and architectural refactoring, expands to full Bexio API coverage across 8 feature domains, and culminates in MCPB packaging for zero-friction installation. Milestone v2.2.0 closes every remaining gap between the official Bexio API and our MCP implementation.

## Milestones

- v2.0/v2.1 MVP & Distribution - Phases 1-7 (shipped 2026-02-03)
- v2.2.0 Complete API Coverage - Phases 8-10 (in progress)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

<details>
<summary>v2.0/v2.1 MVP & Distribution (Phases 1-7) - SHIPPED 2026-02-03</summary>

- [x] **Phase 1: Foundation & Migration** - SDK upgrade, modular architecture, existing 83 tools working
- [x] **Phase 2: Reference Data & Banking** - Foundational configuration data, Swiss banking/payments
- [x] **Phase 3: Projects & Accounting** - Time tracking, project management, chart of accounts, manual entries
- [x] **Phase 4: Purchase, Files & Payroll** - Bills, expenses, documents, HR (conditional)
- [x] **Phase 5: UI & Packaging** - MCP Apps capability, MCPB bundle, npm package
- [x] **Phase 6: Distribution** - MCP Registry, npm publish, GitHub release, documentation
- [x] **Phase 7: Claude Desktop Extension Submission** - Tool annotations, working examples, acknowledgments

### Phase 1: Foundation & Migration
**Goal**: Establish stable v2 foundation with all 56 existing tools working on SDK 1.25.2 in modular architecture
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-05, FOUND-06, FOUND-07, EXIST-01 through EXIST-12
**Success Criteria** (what must be TRUE):
  1. Server starts with SDK 1.25.2 and accepts tool calls via stdio transport
  2. All 56 existing v1 tools respond correctly (backward compatible)
  3. Tool code is organized into domain modules (contacts/, invoices/, etc.) with <200 lines each
  4. HTTP transport works for n8n/remote access (dual transport maintained)
  5. No stdout contamination - all logs go to stderr only
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md - SDK Migration: Upgrade to 1.25.2, fix breaking changes, pin Zod 3.22.x
- [x] 01-02-PLAN.md - Modular Architecture: Create types/, shared/, tools/ structure with aggregation patterns
- [x] 01-03-PLAN.md - Tool Migration: Migrate all 83 tools to new structure, add HTTP transport, validate backward compatibility

### Phase 2: Reference Data & Banking
**Goal**: Complete foundational data APIs and Swiss-standard banking/payment tools
**Depends on**: Phase 1
**Requirements**: REFDATA-01 through REFDATA-10, BANK-01 through BANK-04
**Success Criteria** (what must be TRUE):
  1. User can list and manage contact groups, sectors, salutations, titles
  2. User can query countries, languages, currencies, units, payment types
  3. User can view and update company profile
  4. User can view bank accounts and create IBAN/QR payments (Swiss standards)
  5. Currency management works for multi-currency invoicing
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md - Reference Data Tools: Contact groups, sectors, salutations, titles, countries, languages, units (26 tools)
- [x] 02-02-PLAN.md - Company & Payments Config: Company profile, permissions, payment types (6 tools)
- [x] 02-03-PLAN.md - Banking Tools: Bank accounts, currencies, IBAN payments, QR payments (13 tools)

### Phase 3: Projects & Accounting
**Goal**: Complete project management, time tracking, and accounting foundation
**Depends on**: Phase 2 (currencies needed for accounting)
**Requirements**: PROJ-01 through PROJ-09, ACCT-01 through ACCT-07
**Success Criteria** (what must be TRUE):
  1. User can create and manage projects with types and statuses
  2. User can track time with timesheets linked to projects
  3. User can manage milestones and work packages within projects
  4. User can view chart of accounts and create manual journal entries
  5. User can query business years, calendar years, and VAT periods
**Plans**: 4 plans

Plans:
- [x] 03-01-PLAN.md - Projects Core: Projects CRUD, search, archive/unarchive, project types, project statuses (12 tools)
- [x] 03-02-PLAN.md - Project Nested Resources: Milestones, work packages (nested under projects) (9 tools)
- [x] 03-03-PLAN.md - Time Tracking: Timesheets, statuses, business activities, communication types (11 tools)
- [x] 03-04-PLAN.md - Accounting Foundation: Accounts, account groups, years, manual entries, VAT periods, journal (15 tools)

### Phase 4: Purchase, Files & Payroll
**Goal**: Complete procurement cycle, document management, and conditional payroll
**Depends on**: Phase 3 (accounting required for bills/expenses)
**Requirements**: PURCH-01 through PURCH-05, FILES-01 through FILES-03, PAY-01 through PAY-03
**Success Criteria** (what must be TRUE):
  1. User can create and manage bills (creditor invoices) with issue/paid actions
  2. User can track expenses and purchase orders
  3. User can manage outgoing payments linked to bills
  4. User can upload, list, and download files/documents
  5. User can manage employees and absences (when Bexio payroll module is active)
**Plans**: 4 plans

Plans:
- [x] 04-01-PLAN.md - Bills & Expenses: Bills CRUD, search, actions (issue, mark paid), expenses CRUD (13 tools)
- [x] 04-02-PLAN.md - Purchase Orders & Outgoing Payments: Purchase orders CRUD, outgoing payments linked to bills (10 tools)
- [x] 04-03-PLAN.md - Files & Documents: Files CRUD, download, additional addresses (10 tools)
- [x] 04-04-PLAN.md - Payroll (Conditional): Employees, absences, payroll documents with module detection (10 tools)

### Phase 5: UI & Packaging
**Goal**: Add MCP Apps UI elements and create distribution-ready MCPB bundle
**Depends on**: Phase 4 (all tools must be implemented before bundling)
**Requirements**: UI-01 through UI-04, FOUND-03, FOUND-04
**Success Criteria** (what must be TRUE):
  1. Server declares MCP Apps capability with ui:// resources
  2. Invoice preview renders as rich HTML when requested
  3. Contact card displays formatted contact information
  4. MCPB bundle passes validation and installs with double-click
  5. npm package runs correctly via npx @bexio/mcp-server
**Plans**: 3 plans

Plans:
- [x] 05-01-PLAN.md - MCP Apps Implementation: UI tools (preview_invoice, show_contact_card, show_dashboard), HTML templates, Vite bundling
- [x] 05-02-PLAN.md - MCPB Bundle: manifest.json, icon, user_config, mcpb pack validation
- [x] 05-03-PLAN.md - npm Package: Scoped package name, bin field, shebang, LICENSE, README

### Phase 6: Distribution
**Goal**: Publish to all distribution channels with installation documentation
**Depends on**: Phase 5 (bundle and package must be ready)
**Requirements**: DIST-01 through DIST-04
**Success Criteria** (what must be TRUE):
  1. MCPB bundle is listed in MCP Registry and discoverable
  2. npm package is published to public registry and installable
  3. GitHub release contains source code and .mcpb bundle
  4. Installation documentation covers all three channels (MCPB, npm, source)
**Plans**: 2 plans

Plans:
- [x] 06-01-PLAN.md - Package Configuration: Update to @promptpartner scope, manifest v0.3, comprehensive README, CHANGELOG
- [x] 06-02-PLAN.md - Publishing & Release: npm publish, GitHub release with .mcpb, MCP Registry submission

### Phase 7: Claude Desktop Extension Submission
**Goal**: Meet all requirements for official Claude Desktop extension listing
**Depends on**: Phase 6
**Requirements**: Tool annotations on all 221 tools, 3+ working examples, updated acknowledgments
**Success Criteria** (what must be TRUE):
  1. All 221 tools have `readOnlyHint` or `destructiveHint` annotations
  2. README contains at least 3 working examples with prompt -> behavior -> output
  3. Acknowledgments section credits Claude Code and GSD framework
  4. Extension passes Claude Desktop submission review
**Plans**: 3 plans

Plans:
- [x] 07-01-PLAN.md - Tool Annotations (Core): Add annotations to contacts, invoices, quotes, orders, deliveries, payments, reminders, items, users, reports modules (~85 tools)
- [x] 07-02-PLAN.md - Tool Annotations (Extended): Add annotations to reference, banking, company, projects, timetracking, accounting, purchase, files, payroll modules + UI tools (~136 tools)
- [x] 07-03-PLAN.md - README Examples & Acknowledgments: Add 4 working examples, update acknowledgments with Claude Code and GSD credits

</details>

### v2.2.0 Complete API Coverage (Phases 8-10)

**Milestone Goal:** Close every gap between the official Bexio API documentation and our MCP implementation -- achieve 100% endpoint coverage. Adds contact CRUD, notes, tasks, stock, document settings, real users, reference data gaps, missing sales document operations, and full position management across all 7 position types.

- [x] **Phase 8: Contacts, New Domains & Reference Gaps** - Contact CRUD, notes, tasks, users, stock, docs, reference data completions
- [x] **Phase 9: Sales Document Completion** - Edit/delete/PDF/workflow actions on quotes, orders, invoices, reminders, items
- [ ] **Phase 10: Position Management** - 7 position types x 5 operations for line item manipulation

## Phase Details

### Phase 8: Contacts, New Domains & Reference Gaps
**Goal**: Users can create and delete contacts, manage notes and tasks, and access all remaining small domains (real users, stock, document settings, reference data gaps)
**Depends on**: Phase 7 (existing codebase with 221 tools)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, NOTES-01, TASKS-01, TASKS-02, USERS-01, STOCK-01, STOCK-02, DOCS-01, DOCS-02, REFDATA-11, REFDATA-12, REFDATA-13, REFDATA-14, REFDATA-15
**Success Criteria** (what must be TRUE):
  1. User can create a new contact (person or company), delete a contact, bulk create contacts, and restore a deleted contact
  2. User can list, create, update, delete, and search notes attached to any resource
  3. User can manage tasks with full CRUD, search, and view task priorities and statuses
  4. User can list and get real Bexio users (not just fictional users)
  5. User can list/search stock locations and stock areas, list document settings and templates, and edit/search contact groups, sectors, salutations, titles, and additional addresses
**Plans**: 4 plans

Plans:
- [x] 08-01-PLAN.md - Contact CRUD: create_contact, delete_contact, bulk_create_contacts, restore_contact (4 tools)
- [x] 08-02-PLAN.md - Notes & Tasks Domains: notes CRUD+search (6 tools), tasks CRUD+search+priorities+statuses (8 tools)
- [x] 08-03-PLAN.md - Small Domains & Reference Gaps: real users (2 tools), stock (4 tools), doc settings (2 tools), reference edit/search (7 tools), additional address gaps (2 tools)
- [x] 08-04-PLAN.md - Central Wiring: register notes, tasks, stock, docs in aggregators; build verification (253 total tools)

### Phase 9: Sales Document Completion
**Goal**: Users have full lifecycle control over all sales documents -- edit, delete, PDF generation, and workflow actions (revert, reissue, mark sent, copy) across quotes, orders, invoices, reminders, and items
**Depends on**: Phase 8
**Requirements**: SALES-01, SALES-02, SALES-03, SALES-04, SALES-05, SALES-06, SALES-07, SALES-08, SALES-09, SALES-10, SALES-11, SALES-12, SALES-13, SALES-14, SALES-15, REMIND-01, REMIND-02, ITEMS-01, ITEMS-02, ITEMS-03
**Success Criteria** (what must be TRUE):
  1. User can edit, delete, get PDF, revert to draft, reissue, mark as sent, and copy a quote
  2. User can edit, delete, get PDF for an order, and manage order repetitions
  3. User can edit, delete, get PDF, and revert to draft an invoice
  4. User can mark a reminder as unsent and get a reminder as PDF
  5. User can edit, delete, and search items
**Plans**: 4 plans

Plans:
- [x] 09-01-PLAN.md -- Quotes Completion: edit, delete, revert, reissue, mark sent, PDF, copy (7 tools)
- [x] 09-02-PLAN.md -- Orders + Invoices Completion: edit/delete/PDF for orders, order repetitions, edit/delete/PDF/revert for invoices (10 tools)
- [x] 09-03-PLAN.md -- Reminders + Items Completion: mark unsent, reminder PDF, edit/delete/search items (5 tools)
- [x] 09-04-PLAN.md -- Central Wiring: update tool counts, build verification (275 total tools)

### Phase 10: Position Management
**Goal**: Users can manipulate line items on sales documents (quotes, orders, invoices) through all 7 position types with full CRUD operations
**Depends on**: Phase 9 (sales document completion provides context for positions)
**Requirements**: POS-01, POS-02, POS-03, POS-04, POS-05, POS-06, POS-07
**Success Criteria** (what must be TRUE):
  1. User can list, get, create, edit, and delete default positions on any sales document
  2. User can manage item positions and text positions on any sales document
  3. User can manage subtotal positions and discount positions on any sales document
  4. User can manage pagebreak positions and sub positions on any sales document
  5. All 7 position types work consistently across quotes, orders, and invoices
**Plans**: 3 plans

Plans:
- [ ] 10-01-PLAN.md -- Position Foundation: Zod schemas, type mappings, generic BexioClient position methods (5 CRUD methods)
- [ ] 10-02-PLAN.md -- Position Tools: All 35 tools for 7 position types (default, item, text, subtotal, discount, pagebreak, sub) with definitions and handlers
- [ ] 10-03-PLAN.md -- Central Wiring: Register positions domain in aggregator, build verification (310 total tools)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation & Migration | v2.0 | 3/3 | **Complete** | 2026-02-01 |
| 2. Reference Data & Banking | v2.0 | 3/3 | **Complete** | 2026-02-01 |
| 3. Projects & Accounting | v2.0 | 4/4 | **Complete** | 2026-02-01 |
| 4. Purchase, Files & Payroll | v2.0 | 4/4 | **Complete** | 2026-02-01 |
| 5. UI & Packaging | v2.0 | 3/3 | **Complete** | 2026-02-02 |
| 6. Distribution | v2.0 | 2/2 | **Complete** | 2026-02-02 |
| 7. Claude Desktop Extension | v2.0 | 3/3 | **Complete** | 2026-02-03 |
| 8. Contacts, New Domains & Reference Gaps | v2.2 | 4/4 | **Complete** | 2026-03-03 |
| 9. Sales Document Completion | v2.2 | 4/4 | **Complete** | 2026-03-03 |
| 10. Position Management | 2/3 | In Progress|  | - |

---
*Roadmap created: 2026-02-01*
*Phase 1-7 complete: 2026-02-03*
*v2.2 phases 8-10 added: 2026-03-03*
*Phase 10 planned: 2026-03-03*
*Total requirements: 67 (v2.0) + 44 (v2.2) = 111 | Phases: 10 | Plans: 30 complete + 3 planned*
