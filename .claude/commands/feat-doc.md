---
description: Generate a feat-[slug] implementation + QA-handoff doc in the documentations repo and push it cleanly to origin
allowed-tools: Bash, Read, Write, Grep, Glob
---

# Feature Doc — Implementation State + QA Handoff

Produce a single markdown doc in `/Volumes/softwares/nrev/documentations/<area>/<feature>/feat-<slug>.md` that:

- **At the top:** the final state of what is implemented and the full feature checklist mapped to product requirements.
- **At the bottom:** four tester-focused sections — (1) what to test, (2) blast radius, (3) new things added with UI checks, (4) caller trace for every existing function/file that changed, with explicit regression risk per call site.

Then commit and push the doc to `origin/main` of the documentations repo, **only that file**, without touching anything else in that repo's working tree.

## Step 1: Resolve The Feature Folder

- The documentations repo lives at `/Volumes/softwares/nrev/documentations/`. Treat that path as authoritative — **do NOT call the Outline API** for reading docs. The local copy is the source of truth.
- Ask the user for a feature folder if not given. Otherwise, pick it from context: branch name, conversation, or grep `find /Volumes/softwares/nrev/documentations -type d -iname "*<keyword>*"`.
- The output filename is `feat-<slug>.md`. The slug should match the folder name (e.g. folder `copy_execution` → file `feat-copy-execution.md`). Hyphenate, lowercase, strip underscores.

## Step 2: Read The Existing Docs

- List the folder: `ls /Volumes/softwares/nrev/documentations/<area>/<feature>/`
- Read every `.md` in there with `Read` (not `cat`). Typical files: `requirements.md`, `hld.md`, `lld.md`, `contracts.md`, `fe_grooming.md`, `fe_lld.md`. Read all of them — the implementation-state section depends on mapping checkboxes to requirements.
- If a file is large (>500 lines), page it with `Read offset:0 limit:200` first; pull more only if §6/§7-style requirement tables aren't yet visible.

## Step 3: Collect The Diff (project repo)

The implementation lives in the project repo (`/Volumes/softwares/nrev/nrev-ui-p2` or sibling). Same diff-collection step as `/raise-pr`:

- `git log main..HEAD --oneline`
- `git diff main...HEAD --stat`
- `git diff main...HEAD --name-only` → store as `CHANGED_FILES`
- For each file in `CHANGED_FILES`, read the per-file diff. **Do not skip files** — the §5 caller-trace depends on knowing every changed symbol.

## Step 4: Caller Trace For Every Changed Symbol

For every function, hook, component, prop, or exported type that the diff **modifies or removes**, run:

```
grep -rn "<symbol>" --include='*.ts' --include='*.tsx' app/ components/ tests/
```

Record:
- All call sites (file:line)
- For each call site: the **specific user-facing functionality** that runs through that path

This is non-negotiable. The §5 table in the output doc has a "Verified clean?" column — every removed symbol must show `✅ no callers` (with the grep result as evidence) or `❌ still referenced at <file:line>` (which is a real break, flag it explicitly).

For purely additive changes (new function with no replacement of an old one), confirm the new symbol has exactly one or zero call sites today and record that — additive surfaces still need this audit so the §3 blast radius is honest.

## Step 5: Draft The Doc

Use this exact structure. Bullets, not prose. Reference local doc files via relative links (`./requirements.md`, etc.).

```markdown
# feat-<slug> — Implementation State & QA Handoff

**Status:** Implemented (open PR [#<n>](<pr-url>)) · **Owner:** <team> · **Companions:** [`requirements.md`](./requirements.md) · [`hld.md`](./hld.md) · [`fe_grooming.md`](./fe_grooming.md) · [`fe_lld.md`](./fe_lld.md) · [`contracts.md`](./contracts.md) · [`lld.md`](./lld.md)

> **Reading order:** ... → this doc (final state + tester handoff).

---

## 1. Final State — What Is Implemented

<one-paragraph plain-English summary of the user flow that shipped, written for a PM>

### 1.1 Feature checklist (mapped to [`requirements.md`](./requirements.md) §6)

| Requirement | Status | Where |
|---|---|---|
| <each row from requirements §6, marked Implemented / BE-only / Out of scope, with a pointer to the file or symbol that implements it> |

### 1.2 Files in the change

**New (<n>)**
- <list>

**Modified (<n>)**
- <list each modified file with a one-line note on what changed>

### 1.3 State machine — implemented (only if applicable)

<mermaid stateDiagram or flowchart matching the actual hook/state behavior>

Implementation notes:
- <subtle invariants: refs, race-condition guards, cleanup>

### 1.4 Mixpanel events shipped (only if applicable)

<list with property contracts pointing to fe_grooming.md §6 or wherever properties are speced>

---

## 2. What The Tester Should Test

### 2.1 Visibility & enablement
- [ ] <each rule from fe_grooming.md visibility/enablement matrix>

### 2.2 Golden path
- [ ] <click-through happy path>

### 2.3 Failure path
- [ ] <each failure mode and the resulting UI state>

### 2.4 Lost / timeout (or other terminal-error variants)
- [ ] <if applicable>

### 2.5 Lifecycle (modal close, unmount, navigation, reopen)
- [ ] <timer / ref leak checks>

### 2.6 Analytics
- [ ] <verify each event fires once with correct properties>

### 2.7 Cross-workflow regressions (must remain green)
- [ ] <every adjacent feature on the same screen>

### 2.8 Accessibility (only if requirements specifies it)
- [ ] <keyboard, screen reader, focus management>

---

## 3. Blast Radius

**Severity: <Low | Medium | High>.** <one sentence on why>

### 3.1 <First cross-cutting change>
- Previously: <how the system worked before>
- Now: <how it works after the diff>
- **Surface affected:** <files / screens / consumers>
- **Risk:** <specific behavior that could regress>

### 3.2 <Second cross-cutting change>
...

### 3.<n> New backend dependencies (if any)
- <new endpoints / contracts that must exist on the deployed BE for this UI to work>

### 3.<n+1> Layout / styling shifts (if any)
- <viewport widths to manually check>

---

## 4. New Things Added — What To Test In The UI

| New surface | What it adds | Specific UI checks |
|---|---|---|
| <new component / hook / route> | <one-line purpose> | <concrete UI behaviors to verify> |

### 4.1 Visual smoke tests (non-functional)
- [ ] <styling parity with sibling components>
- [ ] <icon / spinner / state visuals>

---

## 5. Existing Files & Functions Changed — Caller Trace & Regression Risk

This is the most important regression surface. Every existing function whose signature, behavior, or contract changed has been traced via `grep` to enumerate every caller and the specific functionality that could regress.

### 5.<n> `<symbolName>` ([file](path))

**Change:** <what changed about the signature / behavior>

**Callers found:** <file:line list, or "none">

**Functionality that could regress:**
- **<feature name>** — <how it could break and what to test in the browser to confirm it still works>

<repeat for every modified symbol>

### 5.<n+1> Caller-trace summary

| Symbol changed | Callers | Verified clean? |
|---|---|---|
| <symbol> | <file or "none"> | ✅ / ❌ |

### 5.<n+2> Cross-cutting regression checklist

This change does <not> touch node settings schemas / handles / dynamic forms / WorkflowBlockDto shape — §0 boxes <unticked / ticked: x, y>. Sections that still apply per [`node-change-verification-checklist`](../node_change_evaluation/node-change-verification-checklist.md):

- **§<n> <Section Name>** — <why it applies>
```

### Body-writing rules

- Reference local doc files using **relative paths** (`./requirements.md`), and source files using paths relative to the doc location (e.g. `../../../nrev-ui-p2/app/...`).
- Never invent files, props, requirements, or callers. If unsure, re-read the diff or grep again.
- §1.1 checklist rows must come from the actual requirements doc — copy each requirement line and mark it Implemented / BE-only / Out of scope based on grep + diff evidence, not assumption.
- §3 blast-radius severity is **Medium** by default if the change touches a shared component used outside its feature folder, or removes/changes any existing prop. **High** if any caller-trace shows `❌ still referenced`. **Low** only if the entire diff is additive in new files with no edits to existing exports.
- §5 must list every changed symbol — additive-only changes get a single-line "additive, no callers regressed" row instead of a full subsection.

## Step 6: Write The File

- `Write` to `/Volumes/softwares/nrev/documentations/<area>/<feature>/feat-<slug>.md`.
- Do not modify any other file in the documentations repo.

## Step 7: Commit & Push (single-file, hostile-environment safe)

The documentations repo has automated tooling (`push_to_outline.py`, `sync.py`) that can intercept commits and bundle unrelated files. Push deliberately:

1. `cd /Volumes/softwares/nrev/documentations`
2. `git status --short` — note every dirty/untracked path. **None of them should be authored by us** beyond the new doc; if any other file appears as ours from earlier in the session, stop and ask.
3. `git pull --ff-only origin main` — fast-forward the local branch. If non-fast-forward, stop and ask.
4. `git add <exact-path-to-new-doc>` — explicit path only. **Never** use `git add .` or `git add -A`.
5. `git status --short -- <exact-path-to-new-doc>` — confirm the staged set has exactly **one entry** (`A  <path>`). If anything else appears staged, run `git restore --staged <unrelated>` until only our file remains.
6. `git commit -m "$(cat <<'EOF' ... EOF)"` with a heredoc message of the form:
   ```
   docs(<area>): add feat-<slug> implementation + QA handoff

   <one-paragraph summary of what the doc captures>

   Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
   ```
7. **After commit:** `git log --oneline -1` and confirm:
   - The HEAD commit message matches what we just wrote.
   - `git show --stat HEAD` shows **exactly one file changed** with the expected line count.
   - If either check fails, **STOP**, surface the discrepancy to the user, and offer the recovery options (reset --soft to redo, or accept-as-is). Do not push.
8. `git push origin main`.
9. Print the pushed range and confirmation: `<old-sha>..<new-sha> main -> main`.

## Step 8: Report

```
## feat-doc Result: SUCCESS

### Doc
<absolute path>
<n> lines, <n> sections (§1–§5)

### Caller traces
<n> symbols audited
✅ <n> verified clean
❌ <n> still referenced (none expected; if any, blocked the push)

### Push
<old-sha>..<new-sha> main -> main
GitHub: https://github.com/nurturev/documentations/commit/<sha>
```

## Rules

- NEVER read from the Outline API for source docs — the local `/Volumes/softwares/nrev/documentations` copy is canonical.
- NEVER skip the caller-trace grep for any modified symbol.
- NEVER use `git add .` or `git add -A` in the documentations repo. Always stage by exact path.
- NEVER amend or reset commits in the documentations repo without explicit user confirmation.
- ALWAYS verify post-commit (`git show --stat HEAD`) before pushing — this catches the auto-script bundling failure mode.
- If the post-commit verification shows extra files, surface the bundle to the user and let them choose between reset+redo, split, or accept.
- Always include the trailing `Co-Authored-By` line in the commit message.
