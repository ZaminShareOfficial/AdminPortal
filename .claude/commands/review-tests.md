---
description: Review E2E test code for standards compliance, scenario coverage, and quality
allowed-tools: Glob, Grep, Read, Task, Bash, WebFetch, mcp__github__get_pull_request, mcp__github__get_pull_request_diff, mcp__github__get_pull_request_files, mcp__github__get_pull_request_comments, mcp__github__get_pull_request_reviews, mcp__github__get_pull_request_status, mcp__github__get_commit, mcp__github__get_file_contents, mcp__github__list_commits
---

# E2E Test Code Review

You are a Senior Staff SDET reviewing Playwright E2E test code for a workflow builder application (nrev.ai). Review the test code specified by the user: `$ARGUMENTS`

If `$ARGUMENTS` is a PR number or URL, fetch the PR diff and review the changed test files. If it is a file path or directory, read and review those files directly. If empty, review all staged/unstaged changes via `git diff` filtered to `tests/e2e/`.

**Before reviewing, read these reference files for context:**
- `tests/e2e/docs/e2e-architecture.md` -- architecture patterns
- `tests/e2e/docs/writing-e2e-tests.md` -- writing guide
- `tests/e2e/fixtures/workflow-fixtures.ts` -- fixture patterns
- The corresponding POM files used by the spec under review
- An existing similar spec file as a baseline for pattern comparison

## Review Checklist

### 1. Import & Fixture Rules (CRITICAL)

- [ ] **Single import line** from `@/tests/e2e/fixtures/workflow-fixtures` for `test`, `expect`, and all page objects
- [ ] **No multiple imports** -- no separate imports from `@playwright/test`, `api-fixture`, or direct POM paths
- [ ] **Absolute imports only** -- `@/tests/e2e/` prefix, never relative (`../`, `./`)
- [ ] **Correct fixture usage** -- `workflow`, `emptyWorkflow`, `summonWorkflow`, `playsPage` used appropriately
- [ ] **No redundant setup** -- fixtures handle workflow CRUD; specs should not duplicate this
- [ ] If a new page object or utility is needed, it is exported from `workflow-fixtures.ts`

### 2. Test Structure & BDD Format

#### Gherkin Steps (CRITICAL)
- [ ] All `test.step()` names use **Given/When/Then** prefix
- [ ] Step names are **explicit and self-documenting** -- reading steps alone tells the full story
- [ ] Steps follow logical BDD flow: preconditions (Given) -> actions (When) -> assertions (Then)
- [ ] No vague steps like `"Setup"`, `"Click button"`, `"Verify"` -- must describe WHAT specifically

#### Test Organization
- [ ] One `test.describe()` per file, focused on a single feature area
- [ ] Test title format: `"should {expected behavior}"` or `"add and configure {node name} node"`
- [ ] Tags present on every test: at least one of `@smoke`/`@sanity`/`@regression` + feature tag (`@homepage`, `@workflow`, etc.)
- [ ] Related scenarios consolidated into single tests with multiple steps (not split into many tiny tests)
- [ ] Spec files target 50-150 lines; flag anything over 150 lines

#### Assertions Placement (CRITICAL)
- [ ] **Assertions live in POM methods**, not in spec files
- [ ] Spec files only orchestrate test steps by calling POM methods
- [ ] No raw `expect()` calls in spec files against POM element locators -- wrap in POM verification methods
- [ ] Exception: URL assertions and simple structural checks (`expect(page.url()).toContain(...)`) are acceptable in specs

### 3. Page Object Model (POM) Quality

#### Structure
- [ ] Pages extend `BasePage`; components extend appropriate base class
- [ ] Sections are self-contained classes with their own `elements` object
- [ ] Pages compose sections as `readonly` properties -- no facade delegation
- [ ] Specs access sections directly: `page.section.method()` not `page.delegatedMethod()`

#### Elements Pattern
- [ ] Elements are **arrow functions** for lazy evaluation: `element: () => this.page.getByTestId(...)`
- [ ] Child elements scoped to parent root where possible: `this.elements.root().getByTestId(...)`
- [ ] No static property locators -- all must be functions

#### Locators (CRITICAL)
- [ ] **Priority order enforced:** `data-testid` > `getByRole` > `getByText`/`getByLabel` > CSS (last resort)
- [ ] **FORBIDDEN:** CSS class chaining (`.grid.grid-cols-1.gap-6`), fragile XPath
- [ ] If `data-testid` is missing on a target element, flag that it must be added to the source component first
- [ ] Locators are specific enough to avoid ambiguity but not so brittle they break on styling changes

#### Methods
- [ ] JSDoc comments on POM methods explaining purpose
- [ ] Methods model user experience, not code structure
- [ ] Verification methods encapsulate related assertions (e.g., `verifyInputSection()` checks all input elements)
- [ ] **YAGNI** -- no pre-built locators or methods that aren't used by any spec

### 4. Wait Strategy (CRITICAL -- Zero Tolerance)

- [ ] **FORBIDDEN:** `page.waitForTimeout()` -- any occurrence is an automatic fail
- [ ] **FORBIDDEN:** Artificial delays, sleep statements, arbitrary timeouts
- [ ] Uses Playwright auto-waiting locators and built-in assertions (`toBeVisible()`, `toBeEnabled()`, `toHaveText()`)
- [ ] API-dependent steps use `page.waitForResponse()` where needed
- [ ] No redundant waits after `goto()` -- page `goto()` already waits for load
- [ ] No duplicate wait methods in POMs doing the same thing

### 5. TypeScript & Code Quality

- [ ] **FORBIDDEN:** `any` type usage -- always use explicit types
- [ ] Proper interfaces/types for config objects and complex data structures
- [ ] Double quotes used (not single quotes)
- [ ] No trailing commas
- [ ] Arrow functions preferred over function declarations
- [ ] No hardcoded values that should be constants (endpoints, test IDs, config values)
- [ ] No dead code, commented-out code blocks, or unused imports
- [ ] Files under 200-300 lines; flag bloated POMs (YAGNI violation)

### 6. Test Isolation & Stability

- [ ] Tests don't depend on execution order
- [ ] No shared mutable state between tests (use fixtures for isolation)
- [ ] Proper cleanup via fixture teardown (create pairs with delete)
- [ ] No race conditions or timing assumptions
- [ ] Deterministic -- test produces same result on every run
- [ ] `expect().toBeTruthy()` used for fail-fast on values from prior steps (no silent `if` guards)
- [ ] External pages typed explicitly: `let newPage: Page | null = null`

### 7. Domain-Specific: Workflow Builder

- [ ] Node addition to workflow tested with correct `addNodeToSource` pattern
- [ ] Node configuration via sidebar editor uses `setupNode()` + `getErrorMessages()` + `saveNode()` pattern
- [ ] Error message validation done before save (not after)
- [ ] Canvas interactions (drag/drop, node connections) handled robustly
- [ ] Data flow between nodes validated where applicable
- [ ] Uses realistic test data from `tests/e2e/helpers/data/` when applicable

### 8. Scenario Coverage Assessment (BDD Focus)

Evaluate test scenario coverage using BDD best practices. **Functionality testing is the priority; UI component appearance testing is NOT needed.**

#### Coverage Evaluation Criteria
- [ ] **Happy path covered** -- the primary user journey works end-to-end
- [ ] **Critical alternate paths covered** -- key branching scenarios (e.g., filter with AND vs OR operators)
- [ ] **Error/negative paths covered** -- missing required fields, invalid input, API failures where relevant
- [ ] **Boundary conditions** -- empty states, max limits, edge values where they impact functionality
- [ ] **State transitions tested** -- create -> edit -> delete lifecycle, mode switches, status changes

#### Coverage Anti-Patterns (Flag These)
- [ ] **Over-testing UI appearance** -- testing that specific CSS classes render, element colors, layout positioning. Only test functional visibility (`toBeVisible()`) not cosmetic appearance
- [ ] **Redundant scenarios** -- if create+delete is tested, a separate create-only test is redundant
- [ ] **100% coverage pursuit** -- beyond ~90% scenario coverage, ROI drops sharply. Flag tests that add marginal value but significant maintenance cost
- [ ] **Testing framework behavior** -- testing that Playwright clicks work, that navigation happens. Test YOUR app's behavior, not the framework
- [ ] **Duplicate assertions** -- multiple assertions checking the same thing in slightly different ways

#### Missing Scenario Detection
For the feature under test, identify:
- Untested critical user journeys that SHOULD have tests
- Missing error handling scenarios that could cause production issues
- State combinations that are likely to break but aren't covered
- Do NOT suggest tests for: cosmetic UI rendering, tooltip text, icon appearance, hover styles

### 9. Anti-Pattern Detection

- [ ] No facade delegation in page classes (page delegates to section delegates to element)
- [ ] No shared element type interfaces across sections
- [ ] No conditional `data-testid` usage in tests
- [ ] No no-op assertions (logging without `expect()`)
- [ ] No CSS class selectors in POMs
- [ ] No `if` guards for values from prior steps (use fail-fast assertions)
- [ ] No duplicate wait methods
- [ ] No redundant waits after `goto()`

## Output Format

```
## Test Code Review: [target]

### Grade: PASS | CONDITIONAL PASS | FAIL

### Critical Issues (Must Fix)
Issues that violate zero-tolerance rules. For each:
- **File**: `path/to/file.ts:LINE`
- **Rule**: Which rule is violated
- **Issue**: Description
- **Fix**: Specific code change needed

### Warnings
Issues that should be addressed. For each:
- **File**: `path/to/file.ts:LINE`
- **Issue**: Description
- **Suggestion**: How to fix

### Scenario Coverage Report
- **Feature under test**: [feature name]
- **Scenarios covered**: [list of scenarios the tests cover]
- **Coverage level**: Smoke / Sanity / Comprehensive
- **Missing critical scenarios**: [list scenarios that SHOULD exist but don't]
- **Over-tested areas**: [scenarios that are redundant or test UI appearance instead of functionality]
- **Recommendation**: [add/remove/restructure specific scenarios]

### Suggestions
Nice-to-have improvements. For each:
- **File**: `path/to/file.ts:LINE`
- **Suggestion**: Description

### Summary
- Critical issues: N
- Warnings: N
- Suggestions: N
- Scenario coverage: [Adequate / Gaps Found / Over-tested]
- Overall: [PASS / CONDITIONAL PASS / FAIL]
```

### Grading Criteria
- **FAIL**: Any zero-tolerance violation (`waitForTimeout`, `any` type, CSS class chaining, multiple imports, assertions in specs instead of POMs)
- **CONDITIONAL PASS**: No critical violations but has warnings (missing tags, YAGNI violations, missing JSDoc, minor structural issues)
- **PASS**: Clean code following all conventions with adequate scenario coverage

## Rules
- Be precise. Provide exact file paths and line numbers.
- Prioritize critical issues first (zero-tolerance violations).
- Do NOT make any code changes. This is a read-only review.
- Do NOT flag issues in files outside the review target.
- For each issue, explain WHY it is a problem, not just WHAT is wrong.
- When flagging missing scenarios, focus on functional behavior gaps, NOT UI appearance gaps.
- Provide refactored code examples for critical issues.
- Compare against reference implementations: `tests/e2e/features/homepage/homepage-*.spec.ts`, `tests/e2e/features/workflows/interface/interface.spec.ts`
- Be concise. No fluff. No praise. Just findings.
