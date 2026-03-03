---
phase: 10-position-management
plan: 02
subsystem: api
tags: [positions, mcp-tools, sales-documents, crud, programmatic-generation]

# Dependency graph
requires:
  - phase: 10-position-management
    plan: 01
    provides: "Zod schemas, DOCUMENT_TYPE_MAP, POSITION_TYPE_MAP, and BexioClient position methods"
provides:
  - "35 MCP tool definitions for all 7 position types across quotes, orders, and invoices"
  - "35 handler implementations using generic BexioClient position methods"
  - "Positions domain module barrel export (toolDefinitions, handlers, HandlerFn)"
affects: [10-03]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Programmatic tool/handler generation via flatMap over type arrays", "Shared inputSchema property objects spread into tool definitions"]

key-files:
  created: [src/tools/positions/definitions.ts, src/tools/positions/handlers.ts, src/tools/positions/index.ts]
  modified: []

key-decisions:
  - "Programmatic generation via POSITION_TYPES.flatMap(makePositionTools) keeps 35 tools in ~150 lines"
  - "Shared property objects (listProperties, positionIdProperty, positionDataProperty) spread into schemas avoid duplication"
  - "Handler generation mirrors definition pattern with POSITION_KEYS.map(makePositionHandlers)"

patterns-established:
  - "POSITION_TYPES array with key/label/createHint for programmatic tool definition generation"
  - "makePositionTools/makePositionHandlers factory functions for N-type x 5-operation tool domains"

requirements-completed: [POS-01, POS-02, POS-03, POS-04, POS-05, POS-06, POS-07]

# Metrics
duration: 2min
completed: 2026-03-03
---

# Phase 10 Plan 02: Position Tool Definitions & Handlers Summary

**35 MCP tools for 7 position types (default, item, text, subtotal, discount, pagebreak, sub) with programmatic generation across quotes, orders, and invoices**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-03T20:31:17Z
- **Completed:** 2026-03-03T20:32:55Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created 35 MCP tool definitions covering all 7 position types with proper annotations and inputSchema
- Created 35 handler implementations using Zod validation, DOCUMENT_TYPE_MAP/POSITION_TYPE_MAP translation, and BexioClient methods
- Barrel export in index.ts following established domain module pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Create position tool definitions for all 7 types** - `d544b74` (feat)
2. **Task 2: Create position handlers and barrel export** - `8eedae6` (feat)

## Files Created/Modified
- `src/tools/positions/definitions.ts` - 35 MCP tool definitions generated from POSITION_TYPES array via flatMap
- `src/tools/positions/handlers.ts` - 35 handlers generated from POSITION_KEYS via makePositionHandlers factory
- `src/tools/positions/index.ts` - Barrel export for positions domain module

## Decisions Made
- Programmatic generation keeps 35 tool definitions in ~150 lines (vs ~700+ lines for inline definitions)
- Shared property objects spread into each tool's inputSchema to avoid property duplication
- Handler factory mirrors definition factory pattern for consistency

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 35 position tools ready for wiring into the main tool index in plan 10-03
- All 7 position types fully implemented with list, get, create, edit, delete operations
- TypeScript compiles clean with zero errors

---
*Phase: 10-position-management*
*Completed: 2026-03-03*

## Self-Check: PASSED
- All 3 created files exist on disk
- Both task commits (d544b74, 8eedae6) found in git history
- TypeScript compiles with zero errors
