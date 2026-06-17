---
description: Run npm run build, fix trivial issues, and report results
allowed-tools: Bash, Read, Edit, MultiEdit, Glob, Grep
---

# Build & Fix Workflow

Run `npm run build` and handle the results. Fix obvious issues automatically; escalate anything ambiguous.

## Step 1: RUN BUILD
- Run `npm run build` and capture the full output.
- If the build succeeds with no errors, go to Step 4 (success).
- If the build fails, go to Step 2.

## Step 2: ANALYZE ERRORS
Categorize each error as **trivial** or **non-trivial**.

**Trivial (fix automatically):**
- Unused imports or variables
- Missing imports for symbols used in the file
- Type mismatches with an obvious fix (e.g., `string | undefined` passed where `string` expected — add nullish coalescing or optional chaining)
- Missing return types that can be inferred
- Unused `@ts-ignore` or `@ts-expect-error` comments
- Simple typos in type names or property names where the correct name is clear
- Missing `key` prop in JSX list rendering

**Non-trivial (ask user):**
- Logic errors or unclear intent
- Missing dependencies or modules
- Architectural issues (wrong component structure, circular deps)
- Errors in files unrelated to recent changes
- Any fix that changes runtime behavior in a non-obvious way
- Ambiguous type errors with multiple valid resolutions

## Step 3: FIX AND REBUILD
- For each trivial error, read the file, apply the fix, and move to the next.
- After all trivial fixes are applied, run `npm run build` again.
- If the build still fails:
  - If new trivial errors surfaced, fix them and rebuild (max 3 iterations).
  - If non-trivial errors remain, go to Step 4 (partial).
  - If the same errors persist after a fix attempt, stop and report — do not loop.

## Step 4: REPORT
Print a summary:
```
## Build Result: [SUCCESS | FIXED | NEEDS ATTENTION]

### Status
[Build passed / Build passed after fixes / Build still failing]

### Fixes Applied
[List of fixes made, or "None needed"]

### Remaining Issues (if any)
[List of errors that need user attention, with file paths and error messages]
```

## Rules
- NEVER suppress errors with `@ts-ignore`, `@ts-expect-error`, or `as any` casts.
- NEVER change `data-testid` attributes.
- NEVER modify business logic to fix a type error — only fix the type layer.
- If a fix would change runtime behavior, ask the user first.
- Keep fixes minimal — do not refactor or clean up surrounding code.
- Max 3 build-fix cycles. If still failing after 3, report and stop.

