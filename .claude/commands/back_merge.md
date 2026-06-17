---
description: Stash unstaged changes, fetch and merge latest main into current branch, then stash pop
allowed-tools: Bash, Read
---

# Back Merge Workflow

Merge the latest `main` branch into the current working branch safely, preserving any in-progress work.

## Step 1: CHECK CURRENT STATE
- Run `git status` to see if there are unstaged/staged changes.
- Run `git branch --show-current` to identify the current branch.
- If already on `main`, STOP and inform the user — back merge is not applicable.

## Step 2: STASH (if needed)
- If there are any uncommitted changes (staged or unstaged), run `git stash push -m "back-merge-auto-stash"`.
- Track whether a stash was created (check exit code or `git stash list`).
- If stash fails due to conflicts or issues, STOP and report to the user.

## Step 3: FETCH AND MERGE
- Run `git fetch origin main` to get the latest main.
- Run `git merge origin/main` to merge into the current branch.
- If the merge succeeds cleanly, proceed to Step 4.
- If there are merge conflicts:
  - List all conflicted files.
  - For each conflicted file, read the conflict markers.
  - If the resolution is straightforward (e.g., keeping both sides, obvious non-overlapping changes), resolve it automatically.
  - If ANY conflict is ambiguous or involves overlapping logic changes, STOP and present the conflicts to the user for guidance. Do NOT guess on non-trivial conflicts.
  - After resolving, stage the resolved files and complete the merge with `git commit --no-edit`.

## Step 4: STASH POP (if stash was created)
- If a stash was created in Step 2, run `git stash pop`.
- If stash pop causes conflicts:
  - List the conflicted files.
  - For straightforward conflicts, resolve them.
  - For ambiguous conflicts, present them to the user.
- If stash pop succeeds cleanly, proceed to Step 5.

## Step 5: REPORT
Print a summary:
```
## Back Merge Result: [SUCCESS | PARTIAL | FAILED]

### Branch
[current branch] ← main

### Merge
[Clean merge / Conflicts resolved / Conflicts need user input]

### Stash
[No stash needed / Stashed and restored / Stash conflicts need user input]

### Current Status
[git status output]
```

## Rules
- NEVER force push or use destructive git operations.
- NEVER modify files outside of conflict resolution.
- If anything unexpected happens, STOP and ask the user.
- Always show `git status` at the end so the user can verify the state.
