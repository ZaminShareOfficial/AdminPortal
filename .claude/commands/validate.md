---
description: Validate a feature or bug fix by running the full user flow in a browser
allowed-tools: Bash, Read, Glob, Grep, Task, Write
---

# Feature Validation Mode

You are in **feature validation mode**. Your job is to validate that a feature or bug fix works correctly in the browser by executing the full user flow and checking all acceptance criteria.

**Target**: `$ARGUMENTS`

If `$ARGUMENTS` is empty, look at the context in your chat session as well as most recent git changes (`git diff` and `git diff --staged`) to infer what was implemented, then validate accordingly.

## Validation Workflow

### Step 1: Understand the Feature
- Read the relevant source files, ticket docs, or acceptance criteria related to `$ARGUMENTS`.
- If a grooming/task doc exists in `docs/` or `ai_plan_documents/`, read it to extract acceptance criteria.
- Identify the route(s) and user flow(s) that need validation.

### Step 2: Confirm Dev Server
- Check if the Next.js dev server is already running on `http://localhost:3000` (use `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`).
- If NOT running, start it with `npm run dev` in the background and wait until it responds.

### Step 3: Write Playwright Validation Script
Create a temporary file at `tests/debug-validation.spec.ts` that:
- Opens `http://localhost:3000` (or the affected route).
- Reproduces the bug scenario or feature flow exactly as described.
- Asserts the expected correct behavior using explicit checks:
  - **UI State**: Element visibility, enabled/disabled states, correct components rendered.
  - **Text Content**: Labels, messages, placeholders match expected values.
  - **Interactions**: Clicks, inputs, selections produce the expected results.
  - **Network**: No failed requests (monitor via `page.on("requestfailed")`).
  - **Console**: No errors in the browser console (monitor via `page.on("console")`).
  - **Edge Cases**: Verify any edge cases mentioned in the requirements.
- Uses Playwright's built-in auto-waiting (no manual sleeps).

### Step 4: Run Validation
```bash
npx playwright test tests/debug-validation.spec.ts --headed=false
```

- If validation **PASSES** → proceed to Step 5 (Cleanup).
- If validation **FAILS** → analyze the failure, refine the fix or the test, and re-run.
- Maximum 5 retry attempts before escalating to the user.

### Step 5: Script Disposition
After validation passes, **ask the user** whether to keep or discard the Playwright script:

- **Keep**: Move the script from `tests/debug-validation.spec.ts` to a permanent location under the appropriate test directory (e.g., `tests/e2e/[feature-name].spec.ts`). Clean up the test name and descriptions to be production-quality (remove "validation:" prefix, use descriptive BDD-style names). Verify it still passes from its new path.
- **Delete**: Remove `tests/debug-validation.spec.ts` and verify no debug artifacts remain.

## Playwright Script Template

```typescript
import { test, expect } from "@playwright/test"

test("validation: [description]", async ({ page }) => {
  // Listen for console errors
  const consoleErrors: string[] = []
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text())
  })

  // Listen for failed network requests
  const failedRequests: string[] = []
  page.on("requestfailed", (req) => {
    failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`)
  })

  // Navigate to affected route
  await page.goto("http://localhost:3000/[route]")

  // Reproduce the user flow / bug scenario
  // [steps here]

  // Assert expected correct behavior
  // [assertions here]

  // Verify no console errors or failed requests
  expect(consoleErrors).toEqual([])
  expect(failedRequests).toEqual([])
})
```

## Output Format

```
## Validation Report: [feature/fix description]

### Environment
- Dev server: Running on http://localhost:3000
- Route tested: [route path]

### Acceptance Criteria Results

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | [criterion] | PASS/FAIL | [what was observed] |
| 2 | [criterion] | PASS/FAIL | [what was observed] |

### Edge Cases

| # | Edge Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | [case] | PASS/FAIL | [what was observed] |

### Playwright Results
- Script: tests/debug-validation.spec.ts
- Result: PASS / FAIL
- [Failure details if any]

### Result: PASS / FAIL
[If FAIL: list what failed and any fixes applied or recommended]
```

## Rules
- Do NOT skip any acceptance criterion — every one must be explicitly checked.
- Do NOT claim PASS unless Playwright assertions pass for each criterion.
- If you cannot determine acceptance criteria from the arguments or code, ask the user before proceeding.
- Be thorough but efficient — validate what matters, skip cosmetic nitpicking unless specified.
- Always check the console for errors — silent JS errors are still failures.
- If the dev server fails to start, report the error and stop.
- Do NOT delete the Playwright script without asking the user first. Always offer the keep/delete choice.
