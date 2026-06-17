---
description: Find duplicated code and tech debt across the codebase
allowed-tools: Glob, Grep, Read, Task, Bash
---

# Tech Debt: Duplicate Code Finder

You are a tech debt analyst. Your job is to scan the codebase for duplicated code, dead code, and structural issues. Be thorough but concise in your report.

## Scope

Focus on these directories:
- `app/` — pages and complex components
- `components/` — shared/reusable components
- `hooks/` — custom hooks
- `utils/` — utility functions
- `lib/` — helper libraries
- `constants/` — constants and enums

Ignore: `node_modules/`, `.next/`, `public/`, test files, config files, lock files.

## Analysis Steps

### 1. Find Duplicated Components
Search for React components that have highly similar structure, props, or rendering logic. Look for:
- Components with near-identical JSX structures across different files
- Components that render the same UI patterns (modals, cards, lists, forms) with minor variations
- Copy-pasted components that only differ in a few props or strings

### 2. Find Duplicated Utility Functions
Search for functions that perform the same operation but exist in multiple places:
- String/date/number formatting functions
- API call wrappers that do the same thing
- Validation logic repeated across files
- State transformation helpers

### 3. Find Duplicated Hooks
Look for custom hooks that:
- Wrap the same API endpoint
- Manage identical state patterns
- Have overlapping fetch/polling logic

### 4. Find Duplicated Type Definitions
Search for TypeScript interfaces/types that:
- Define the same shape in multiple files
- Have overlapping fields that could share a base type
- Are redefined instead of imported

### 5. Find Dead Code
Look for:
- Exported functions/components that are never imported anywhere
- Unused imports within files
- Commented-out code blocks
- Files that are not referenced by any other file

### 6. Find `any` Type Usage
Search for usages of `any` as a type annotation across all `.ts` and `.tsx` files. For each instance:
- Check if an existing type in the codebase already matches the intended shape. Search `types/`, co-located `types.ts` files, and imported packages for a suitable match.
- If a matching type exists, flag it with a recommendation to use that type instead.
- If no matching type exists, flag it with a recommendation to define a proper type in the same file (or in the nearest `types.ts` if the file follows the folder-based structure).
- Only accept `any` as unavoidable when dealing with genuinely unknown external data (e.g., third-party library callbacks with no type exports). Flag these separately as "acknowledged `any`".

### 7. Unnecessary `useCallback`
Find `useCallback` usages where the returned function is NOT passed as a prop to a `React.memo`'d child and NOT used as a dependency in another hook that genuinely needs referential stability. These are pure overhead (extra closure allocation + dependency comparison every render).

### 8. Large Files
Find files exceeding 200-300 lines that should be refactored per project conventions.

## Output Format

Produce a structured report in this exact format:

```
## Tech Debt Report

### Duplicated Code
For each duplicate found:
- **Files**: `path/to/file1.tsx` and `path/to/file2.tsx`
- **What**: Brief description of what's duplicated
- **Suggestion**: How to consolidate (extract shared component/hook/util)

### Dead Code
For each dead code instance:
- **File**: `path/to/file.tsx`
- **What**: What's unused
- **Action**: Delete / Remove export / Clean up

### `any` Type Usage
For each instance found:
- **File**: `path/to/file.tsx:LINE`
- **Current**: The variable/param/return using `any`
- **Fix**: Use `ExistingTypeName` from `path/to/types.ts` OR define new type inline
- **Unavoidable**: Yes/No (with reason if yes)

### Large Files (>200 lines)
For each oversized file:
- **File**: `path/to/file.tsx` (N lines)
- **Suggestion**: How to break it down

### Summary
- Total duplications found: N
- Dead code instances: N
- `any` usages found: N (unavoidable: M)
- Large files: N
- Priority fixes (top 3 items to address first)
```

## Rules
- Be precise. Only flag genuine duplications, not coincidental similarities.
- For each finding, provide exact file paths and line references.
- Prioritize findings by impact — larger duplications and more frequently repeated code first.
- Do NOT make any code changes. This is a read-only audit.
- Keep the report concise. No fluff.
