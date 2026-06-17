---
description: Raise (or update) a PR with a structured description — summary, blast radius, things to test, breakage risks, and node-change verification checklist mapping
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
---

# Raise PR With Structured Description

Build a thorough PR description for the current branch covering five sections:
1. **Summary** — what was done
2. **Blast radius** — where the changes leak beyond the immediate feature
3. **Things to test** — concrete behaviours to verify
4. **Functionality that might break** — known regression risks from this diff
5. **Node-change regression checklist** — sections of `node-change-verification-checklist.md` that apply

If a PR already exists for the current branch, **update its body**. Otherwise, create a new PR against `main`.

## Step 1: Branch & PR State

- `git branch --show-current` → store as `CURRENT_BRANCH`. Refuse if on `main`, `staging`, or any `staging-*` branch.
- `git status` — if there are uncommitted changes, ask the user whether to commit first or proceed (do not auto-commit, do not auto-stash).
- `gh pr list --head $CURRENT_BRANCH --state all --json number,title,state,url` → store the open PR (if any) as `EXISTING_PR`. If multiple, prefer the OPEN one; if none open, prefer the most recent.

## Step 2: Collect The Diff

Run in parallel (no dependencies between them):

- `git log main..HEAD --oneline` → commit list.
- `git diff main...HEAD --stat` → high-level file impact.
- `git diff main...HEAD --name-only` → file list for downstream grep.
- For every changed file, read the actual diff with `git diff main...HEAD -- <path>` (batch the small ones, page the large ones). **Do not skip files** — blast radius judgement depends on seeing every change.

If the diff is huge (>20 files or >2000 lines), pause and tell the user the PR is too broad for a single description — ask whether to scope to a subset or proceed anyway.

## Step 3: Verify Removed Symbols

For every prop / function / export that the diff **removes** or **renames**, grep the rest of the repo to confirm no caller is left dangling:

```
grep -rn "<symbol>" --include='*.ts' --include='*.tsx' app/ components/
```

Record the result as either:
- "no caller found — safe to remove" (call this out in the body to short-circuit reviewer doubt), or
- "still referenced at <file:line>" (this is a real break — flag it explicitly under §4).

This step is non-negotiable. The previous body for this PR claimed `ExecutionActionButtons` gained a prop that wasn't actually changed — that kind of error must not recur.

## Step 4: Read The Node-Change Checklist

The canonical checklist lives at `/Volumes/softwares/nrev/documentations/node_change_evaluation/node-change-verification-checklist.md` and is mirrored at `https://outline.public.staging.nurturev.com/doc/node-change-verification-checklist-FNYb67jUgK`.

**Always read the local file first** — it's faster and stays in sync via the `documentations` repo. Fall back to the Outline API only if the local copy is missing.

Walk §0 of the checklist against the diff and tick each scope box that applies:
- node settings schema / default values / optional fields / `reloadProps`
- output emission shape
- handle / edge behaviour (`Handles.tsx`, `IF_ELSE_*`, `MERGE_DATA_*`, `MAGIC_NODE_*`)
- Magic / If-Else / Merge Data specific
- `WorkflowBlockDto` / `WorkflowExecutionDto` shape
- dynamic-forms field rendering
- shared node infrastructure

Map each ticked scope to the §1–§10 sections of the checklist that the PR must verify. If **no** §0 box is ticked, say so explicitly and list only the cross-cutting sections that still apply (typically §1, §6, §7, §10).

## Step 5: Draft The PR Body

Use this exact section order. Keep each section tight — bullets, not paragraphs.

```markdown
## Summary

- <what changed, one bullet per logical unit of work>
- <new endpoints / hooks / components / DTOs added>
- <props or symbols removed, with the verification result from Step 3>

## Blast radius

**<Low | Medium | High>.** <One sentence on why.>

1. <Cross-cutting edit #1 — what surface it touches and which callers were verified>
2. <Cross-cutting edit #2>
3. <Layout / contract / backend dependency risks>

## Things to test after these changes

- <Concrete behaviour, not a goal. "Copy button hidden for draft executions" not "draft handling works".>
- <One bullet per branch of logic worth eyeballing>

## Functionality that might break

- <Specific regression a reviewer should suspect, with the file path>
- <Type-level breakage if a removed prop is still passed somewhere>
- <Timing / ordering changes — e.g. data that used to be warm in a store now fetched on mount>
- <Backend contract: any new endpoints required by this diff>

## Node-change regression checklist

Cross-checked against [Node Change Verification Checklist](https://outline.public.staging.nurturev.com/doc/node-change-verification-checklist-FNYb67jUgK).

<One sentence stating which §0 boxes are ticked, or that none are.>

- **§<N> <Section Name>** — <why it applies to this diff>
- **§<N> <Section Name>** — <why>

<List the §0–§10 sections that don't apply with one short reason.>

## Test plan

- [ ] <golden path>
- [ ] <each error / edge case from §3>
- [ ] <each functionality-break suspicion from §4 verified negative>
- [ ] Node-change checklist §<n>, §<m>, ... verified per linked doc.
```

### Body-writing rules

- Reference specific files using the markdown link format `[path](path)` so reviewers can click into them.
- Never invent function names, prop names, or behaviours. If you're not sure something exists in the diff, re-read the diff hunk before writing the bullet.
- "Blast radius" must list **callers and consumers**, not just files touched. A change to `TableModeViewProps` is only medium-risk if `grep` confirms one consumer; high-risk if there are several.
- "Functionality that might break" is for risks that survive the diff — i.e. things a reviewer should still doubt. If you verified a risk away in Step 3, move it to "Summary" with the verification note instead of leaving a phantom worry in §4.
- Always include the trailing `🤖 Generated with [Claude Code](https://claude.com/claude-code)` footer to match the existing repo style.

## Step 6: Apply

- If `EXISTING_PR` is set: `gh pr edit <number> --body "$(cat <<'EOF' ... EOF)"`
- Otherwise:
  - Confirm the branch is pushed: `git push -u origin $CURRENT_BRANCH` if needed (no `--force`, no `--force-with-lease` here).
  - `gh pr create --base main --head $CURRENT_BRANCH --title "<title>" --body "$(cat <<'EOF' ... EOF)"`
  - Title format: `<type>(<scope>): <imperative summary>` matching the existing repo convention (e.g. `feat(workflows): add copy execution flow with async status modal`).

## Step 7: Report

Print:
```
## PR <updated | created>

URL: <pr-url>

### Sections written
- Summary (<n> bullets)
- Blast radius (<Low|Medium|High>)
- Things to test (<n> items)
- Functionality that might break (<n> items)
- Node-change checklist (<sections that apply or "no node surface touched">)
- Test plan (<n> checkboxes)

### Verifications run
- Removed symbols grepped: <list>
- Diff coverage: <files reviewed> / <files changed>
```

## Rules

- NEVER fabricate file changes, prop additions, or removed symbols. Re-read the diff if unsure.
- NEVER skip the Step 3 grep for removed symbols.
- NEVER call the Outline API when the local `documentations/node_change_evaluation/node-change-verification-checklist.md` is readable.
- NEVER push with `--force` or `--force-with-lease` from this skill — body updates and new pushes only.
- If the diff doesn't touch any node-related surface, **still** include §5 in the body but state "no §0 boxes ticked" and list only the cross-cutting sections that apply.
- If `gh pr edit` fails because the body is too long, page the body — keep §1 and §2 short, move details into §3/§4.
- Always return the PR URL at the end.
