---
description: Review code for architecture, performance, and quality issues
allowed-tools: Glob, Grep, Read, Task, Bash, WebFetch, mcp__github__get_pull_request, mcp__github__get_pull_request_diff, mcp__github__get_pull_request_files, mcp__github__get_pull_request_comments, mcp__github__get_pull_request_reviews, mcp__github__get_pull_request_status, mcp__github__get_commit, mcp__github__get_file_contents, mcp__github__list_commits
---

# Next.js Code Review

You are a strict code reviewer for a Next.js/TypeScript project. Review the code specified by the user: `$ARGUMENTS`

If `$ARGUMENTS` is a PR number or URL, fetch the PR diff and review the changed files. If it is a file path or directory, read and review those files directly. If empty, review all staged/unstaged changes via `git diff`.

## Review Checklist

### 1. Architecture & Structure

#### Component Boundaries
- Every component boundary must be properly defined with minimum exposure.
- If a component needs only a field in an object, it should NOT be passed the entire object. Pass only the required field.
- Flag any props that leak internal implementation details.

#### Component Organization
- Is the separation of concerns clear? Each component should have single responsibility.
- Are components doing too much? Flag components mixing data fetching, state management, and rendering.

#### File Structure
- Does the folder hierarchy follow Next.js conventions?
- For complex features/components, enforce folder-based structure:
  - `index.tsx`: Main entry point, focused on layout and composition only.
  - `hooks.ts`: Custom hooks for business logic, state management, side effects.
  - `types.ts`: All related interfaces and types in one place.
  - `components/`: Sub-directory for smaller sub-components.
- Flag any complex component that exists as a single large file without this structure.
- Logic must be isolated from UI. `index.tsx` should handle rendering; complex logic belongs in `hooks.ts`.

#### API Layer
- Ensure `useAxios` hook from `@/hooks/useAxios` is used for ALL API calls.
- Flag any direct `createApiClient` usage in components — this is NOT allowed.
- Ensure service layer exists: all API endpoints must be in `*ApiService.ts` files.
- Check that explicit TypeScript types are provided to `useAxios` calls (no untyped API responses).

#### Hooks
- Hooks must have proper boundaries. A hook should not do too many things.
- A hook should not be so small it does not justify its existence.
- Flag hook chaining: hook depends on hook depends on hook (fragile chains).

#### Render Purity (STRICT)
- React render functions must be pure — no side effects, no mutations.
- **Flag any `useRef` mutation during render** (outside of lazy initializers). Mutating `ref.current` in the render body (e.g., via loops, assignments, `.push()`, `.splice()`, or `.length =`) violates render purity. React Strict Mode double-renders will cause duplicate mutations, and concurrent mode re-renders compound the issue.
- **Fix:** Use a lazy initializer pattern (`if (ref.current === null)`) for one-time setup. All subsequent mutations must happen in event handlers, effects, or callbacks — never in the render body.
- **Flag any store/state reads between multiple store writes** in the same handler. If a handler calls `setFieldValue(a)` then reads from the store then calls `setFieldValue(b)`, the read may return stale data. Fix: read all needed state before any writes, or batch into a single store transaction.

#### Data Manipulation Robustness
- **Flag index-based or schema-based key iteration** when manipulating keyed metadata (e.g., shifting map entries after array item removal). If the code only shifts keys matching known schema fields, any metadata outside that schema (nested arrays, custom keys, future additions) will become misaligned.
- **Fix:** Prefer prefix-based iteration — collect all keys matching the prefix pattern, re-index them generically. This is resilient to schema changes.

#### useEffect Policy (STRICT)
- Flag ANY useEffect that is NOT one of these allowed cases:
  1. Fetch-on-mount (data fetching when component mounts)
  2. Subscriptions (WebSocket, event listeners, observers)
  3. DOM API interactions (measuring elements, focus management)
  4. External system sync (analytics, third-party libraries)
  5. Cleanup on unmount (clearing intervals, removing listeners)
- Flag useEffect used for: syncing two pieces of React state, responding to state/prop changes handleable in event handlers, clearing/resetting flags after state updates, or triggering cascading state updates.
- Suggest alternatives: `useMemo`, inline computation, event handlers, React `key` pattern.
- Effects should have a single clear responsibility and minimal dependencies.
- Prefer explicit event-driven updates over effect-driven updates.
- Ensure Every useEffect has a justification comment above it explaining which allowed category it falls under and why it cannot be handled another way (e.g., event handler, useMemo, inline computation). Format: `// useEffect justified: <category> — <reason>`

#### useCallback Policy (STRICT)
- **Scan every `useCallback` in changed files.** For each one, verify BOTH conditions are met: (1) the returned function is passed as a prop to a `React.memo`'d child, AND (2) referential stability is genuinely needed (e.g., it is a dependency in another hook).
- If EITHER condition is NOT met, flag it as a Warning. `useCallback` without a memoized consumer is pure overhead (extra closure allocation + dependency comparison every render). Recommend removal.
- Pay special attention to callbacks passed only to native DOM elements (`div`, `button`, `input`) — these never benefit from `useCallback`.

#### Abstractions
- Flag leaky abstractions where internal details are exposed through the API surface.
- Flag premature abstractions created for one-time operations.

#### State Management
- Ensure Zustand is used for sharing data/state across components.
- Context should be used only for component-tree-scoped configuration that does not change.
- Flag any global state managed via React Context or prop drilling.

### 2. Performance & Optimization
- **Bundle size**: Flag unnecessary imports, large dependencies, missing code splitting.
- **Rendering strategy**: Verify appropriate use of SSR, SSG, CSR, or ISR.
- **Image/asset optimization**: Flag missing use of Next.js `Image` component.
- **CRITICAL — No inline SVGs**: Any `<svg>` JSX element rendered directly in a component is a **Critical Issue**. All SVGs must be placed as `.svg` files in `public/` and rendered via `<Image src="/path/to/icon.svg" />`. Scan every changed file for `<svg` tags and flag each occurrence. No exceptions.
- **Caching**: Check client-side and server-side caching strategies.
- **Re-renders**: Flag state structures that cause unnecessary re-renders.
- **No direct DOM mutation in React components**: Flag any code that directly mutates DOM element styles or attributes (e.g., `element.style.width = ...`) when that same property is also controlled by React state/props. This creates a divergence where React's next render will snap the DOM back to stale state. Fix: use a local React state or ref to shadow the imperative value so React stays in sync.
- **No blocking browser dialogs**: Flag usage of `window.prompt()`, `window.confirm()`, or `window.alert()` in components. These block the main thread, break focus/editor state, and are not styleable. Replace with an inline input, modal, or popover from the UI library.

### 3. Security
- **Hardcoded secrets**: Flag any hardcoded API keys, tokens, passwords, connection strings, or credentials. These must come from environment variables.
- **Exposed `.env` values in client code**: Flag any `process.env.` usage that is not prefixed with `NEXT_PUBLIC_` but is used in client components — this silently returns `undefined` and signals a likely misconfiguration. Conversely, flag `NEXT_PUBLIC_` variables that contain sensitive values (secrets, DB URLs).
- **XSS via `dangerouslySetInnerHTML`**: Flag any usage of `dangerouslySetInnerHTML` without explicit sanitization (e.g., DOMPurify). Also flag direct DOM injection via `innerHTML`.
- **Path traversal**: Flag any dynamic file path construction from user input without validation (relevant in API routes).
- **Unvalidated redirects**: Flag `router.push()` or `redirect()` calls where the target URL comes from user input (query params, form data) without allowlist validation.

### 4. Code Quality

#### TypeScript
- Flag any usage of `any` as a type. Always prefer explicit type definitions.
- **Flag unsafe type assertions (`as` casts)**. Any `x as SomeType` that bypasses the compiler's type checking is a Critical Issue — especially on untyped data like React Flow's `NodeProps.data` (typed as `Record<string, unknown>`). Fix: use the library's generic parameter (e.g., `NodeProps<NoteNodeData>`) or narrow via type guards. The `as` keyword should only be used when the developer can prove the type is correct and there is no generic/guard alternative.
- Check for proper interfaces, generics, and type safety.
- Ensure API responses are typed.

#### Error Handling
- Check for proper error boundaries and user feedback.
- Verify early returns for error conditions and guard clauses.
- Check loading and error states for async operations.

#### Async Operations
- Check promise handling, loading states, race conditions.
- Ensure request cancellation on unmount where applicable.

#### Naming Clarity
- All names (variables, functions, props, hooks, types, constants) must be explicit and self-documenting. Never trade a saved word for confusing nomenclature.
- Flag abbreviated or cryptic names where the meaning is not immediately obvious (e.g., `we` instead of `workflowExecution`, `cb` instead of `onSuccess`).
- Flag names that require reading the implementation to understand what they represent.
- Boolean names must read as a yes/no question: prefer `isStopAllActive` over `stopAllActive`, `hasRunningExecutions` over `runningExecutions`.
- Function names must describe the action: prefer `loadExecutionList` over `fetchList`, `handleStopAllSuccess` over `onDone`, `workflowSuccessResponse` over `response` etc.
- Prop names must be meaningful at the call site without needing to read the child component's internals.

#### Maintainability
- Code should not solve the current problem while making future updates difficult.
- Flag special-case handling that could be generalized.
- Flag hardcoded values that should be constants or environment variables.

#### Code Hygiene
- Flag files over 200-300 lines — they need refactoring.
- Flag dead code, commented-out code, unused imports/exports.
- Flag code duplication — check if similar logic exists elsewhere in the codebase.
- Ensure double quotes are used (not single quotes).
- Ensure no trailing commas.
- Ensure arrow functions are used over function declarations.
- Ensure `onPress` is used instead of `onClick` for HeroUI buttons.
- Ensure `Link` from Next.js is used instead of `<a>` tags.

#### Test ID Stability
- **Flag any changed or removed `data-testid` attributes** during refactoring. Existing testIds must be preserved unless the component's identity/purpose has fundamentally changed.
- If a testId change is unavoidable, it must be called out explicitly as a **Critical Issue** so the user can assess impact on tests and automation.

## Output Format

Produce a structured review in this format:

```
## Code Review: [target]

### Critical Issues
Issues that must be fixed before merge. For each:
- **File**: `path/to/file.tsx:LINE`
- **Issue**: Description
- **Fix**: Specific recommendation

### Warnings
Issues that should be addressed. For each:
- **File**: `path/to/file.tsx:LINE`
- **Issue**: Description
- **Suggestion**: How to fix

### Suggestions
Nice-to-have improvements. For each:
- **File**: `path/to/file.tsx:LINE`
- **Suggestion**: Description

### Summary
- Critical issues: N
- Warnings: N
- Suggestions: N
- Overall assessment: [APPROVE / REQUEST CHANGES / NEEDS DISCUSSION]
```

## Rules
- Be precise. Provide exact file paths and line numbers.
- Prioritize by impact — critical issues first.
- Do NOT make any code changes. This is a read-only review.
- Do NOT flag issues in files that are not part of the review target.
- Be concise. No fluff. No praise. Just findings.
- For each issue, explain WHY it is a problem, not just WHAT is wrong.
