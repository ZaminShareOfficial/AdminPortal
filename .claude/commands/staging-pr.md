---
description: Create a staging branch from current branch, merge with staging-priority strategy, and raise PR against staging
allowed-tools: Bash, Read, Edit, AskUserQuestion
---

# Staging PR Workflow

Create a new branch `staging-{current-branch}`, merge the current working branch into it with priority to your changes, and raise a PR against `staging`.

## Step 1: CHECK CURRENT STATE
- Run `git branch --show-current` to identify the current branch. Store this as `CURRENT_BRANCH`.
- If already on `staging` or the branch starts with `staging-`, STOP and inform the user — this command must be run from a feature branch.
- Run `git status` to see if there are uncommitted changes.
- If there are uncommitted changes, STOP and ask the user to commit or stash them first. Do NOT auto-stash.

## Step 2: FETCH AND UPDATE STAGING
- Run `git fetch origin staging` to get the latest staging.
- Run `git fetch origin main` to get the latest main (needed for merge strategy context).

## Step 3: CREATE NEW BRANCH FROM STAGING
- The new branch name is `staging-{CURRENT_BRANCH}`.
- Run `git checkout -b staging-{CURRENT_BRANCH} origin/staging` to create a new branch based on latest remote staging.
- If the branch already exists locally, delete it first with `git branch -D staging-{CURRENT_BRANCH}` and recreate it.

## Step 4: SQUASH AND MERGE CURRENT BRANCH WITH PRIORITY STRATEGY
- Run `git merge --squash {CURRENT_BRANCH} -X theirs` to squash-merge the feature branch into the staging-based branch.
  - `--squash` combines all feature branch commits into a single commit for a clean history.
  - `-X theirs` gives priority to the current (feature) branch's changes when there are conflicts.
  - This means: your changes win over staging when both modified the same lines, but staging-only changes (from other developers that aren't in main) are preserved.
- If the merge succeeds cleanly, commit the squashed changes:
  - Run `git log origin/staging..{CURRENT_BRANCH} --oneline` to get the list of original commits.
  - Commit with: `git commit -m "feat: {CURRENT_BRANCH} squash merge" -m "Squashed commits: {list of original commit messages}"`
  - Proceed to Step 5.
- If there are merge conflicts even with `-X theirs` (rare but possible with complex renames/deletes):
  - List all conflicted files.
  - For each conflicted file, read the conflict markers.
  - **Default resolution:** Favor the feature branch (`CURRENT_BRANCH`) changes.
  - **Exception:** If staging has entirely new files or new code blocks that don't exist in main or the feature branch, keep those additions.
  - After resolving all conflicts, stage the resolved files and commit the squashed changes as described above.

## Step 5: BUILD VERIFICATION
- Run `npm run build` to verify the merged code compiles without errors.
- If the build fails:
  - Read the error output and identify the failing files/issues.
  - Fix the build errors (type errors, missing imports, etc.) — only make minimal changes necessary to fix the build.
  - Stage the fixes with `git add` (only the files you changed to fix build errors).
  - Amend the squash merge commit: `git commit --amend --no-edit` to keep a single clean commit.
  - Re-run `npm run build` to confirm the fix. Repeat until the build passes.
- Once the build passes, proceed to Step 6.

## Step 6: PUSH THE NEW BRANCH
- Run `git push -u origin staging-{CURRENT_BRANCH} --force-with-lease`.
- If push fails, STOP and report to the user.

## Step 7: CREATE PR AGAINST STAGING
- Use `gh pr create` to create a PR:
  - **Base branch:** `staging`
  - **Head branch:** `staging-{CURRENT_BRANCH}`
  - **Title:** `[Staging] {CURRENT_BRANCH}`
  - **Body:** Include a summary of what the feature branch brings, generated from the commit log of `CURRENT_BRANCH` that isn't in `staging`.
- Use this format:
```
gh pr create --base staging --head staging-{CURRENT_BRANCH} --title "[Staging] {CURRENT_BRANCH}" --body "$(cat <<'EOF'
## Summary
Merging `{CURRENT_BRANCH}` into staging.

### Commits included
{list of commits from CURRENT_BRANCH not in staging}

### Merge strategy
- Feature branch changes take priority over staging conflicts
- Staging-only changes from other developers are preserved

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
- If a PR already exists for this head/base combination, report the existing PR URL instead.

## Step 8: RETURN TO ORIGINAL BRANCH
- Run `git checkout {CURRENT_BRANCH}` to switch back to the original feature branch.

## Step 9: REPORT
Print a summary:
```
## Staging PR Result: [SUCCESS | FAILED]

### Branches
staging ← staging-{CURRENT_BRANCH} ← {CURRENT_BRANCH}

### Merge
[Clean merge / Conflicts resolved with feature-branch priority]

### Build
[Passed / Failed and fixed (list fixes)]

### PR
[PR URL or failure reason]

### Current Branch
[current branch after checkout back]
```

## Rules
- NEVER force push or use destructive git operations (except `--force-with-lease` on the new staging branch).
- NEVER modify files outside of conflict resolution.
- NEVER stay on the staging branch — always return to the original branch at the end.
- If anything unexpected happens, STOP and ask the user.
- Always return the PR URL so the user can review it.
