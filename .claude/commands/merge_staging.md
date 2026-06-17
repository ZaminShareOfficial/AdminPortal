---
description: Merge current branch into staging, resolve simple conflicts, push staging to remote, and deploy staging preview to Vercel
allowed-tools: Bash, Read, Edit, AskUserQuestion
---

# Merge into Staging Workflow

Merge the current working branch into `staging`, pushing the result to the remote.

## Step 1: CHECK CURRENT STATE
- Run `git branch --show-current` to identify the current branch.
- If already on `staging`, STOP and inform the user — merge into staging requires being on a feature branch.
- Run `git status` to see if there are uncommitted changes.
- If there are uncommitted changes, STOP and ask the user to commit or stash them first. Do NOT auto-stash.

## Step 2: FETCH LATEST STAGING
- Run `git fetch origin staging` to get the latest staging.
- Run `git checkout staging` to switch to staging.
- Run `git pull origin staging` to ensure local staging is up to date with remote.
- If pull fails, STOP and report to the user.

## Step 3: MERGE CURRENT BRANCH INTO STAGING
- Store the original branch name from Step 1.
- Run `git merge <original-branch>` to merge the feature branch into staging.
- If the merge succeeds cleanly, proceed to Step 4.
- If there are merge conflicts:
  - List all conflicted files.
  - For each conflicted file, read the conflict markers.
  - **Auto-resolve if:**
    - One side only adds new code (no overlapping edits) — keep both.
    - Whitespace-only or formatting differences.
    - Import additions that don't conflict with each other — keep both.
    - One side deleted code the other side didn't touch — accept the deletion.
  - **Ask the user if:**
    - Both sides modify the same lines with different logic.
    - Conflicting function signatures or API contracts.
    - Any conflict where the correct resolution requires understanding business intent.
    - Anything ambiguous or where guessing could break functionality.
  - After resolving all conflicts, stage the resolved files and complete the merge with `git commit --no-edit`.

## Step 4: PUSH STAGING TO REMOTE
- Run `git push origin staging` using the default (`ojhanik`) profile.
- If push fails (e.g., rejected due to remote changes):
  - Run `git pull --rebase origin staging` and retry the push.
  - If still failing, STOP and report the push failure to the user.

## Step 5: TRIGGER VERCEL DEPLOY VIA nurturev-dev COMMIT
Vercel only deploys staging when the latest commit is authored by `nurturev-dev`. This step creates a trigger commit and pushes it via the `github-common` SSH identity.

1. Save the current remote URL: `git remote get-url origin`
2. Create an empty commit authored as `nurturev-dev`:
   `git commit --allow-empty --author="nurturev-dev <common.dev@nurturev.com>" -m "chore: trigger staging deploy"`
3. Swap remote to `github-common` SSH alias:
   `git remote set-url origin github-common:nurturev/nrev-ui-2.git`
4. Push: `git push origin staging`
5. If push fails, proceed to Step 6 (remote revert is mandatory) and THEN report the failure.

## Step 6: REVERT REMOTE URL, DEPLOY VERCEL, & RETURN TO ORIGINAL BRANCH
These steps MUST run sequentially in this exact order. Do NOT run them in parallel.
The Vercel CLI reads the current git branch to determine which branch to deploy — running checkout before Vercel finishes will cause it to deploy the wrong branch.

1. **Revert remote URL (MANDATORY)** — must always execute regardless of Step 5 success/failure:
   - `git remote set-url origin <original-remote-url>`
   - Verify with `git remote get-url origin` that it was restored correctly.
   - If the revert fails, WARN the user loudly that the remote is still pointing to `github-common` and needs to be manually restored.
2. **Deploy Vercel (while still on staging)**: Run `vercel --scope nurturev --yes` to trigger a preview deployment. Wait for it to complete and capture the preview URL. This MUST run before checking out to the original branch.
3. **Return to original branch**: Run `git checkout <original-branch>` to switch back to the feature branch. This MUST be the last step.

## Step 7: REPORT
Print a summary:
```
## Merge to Staging Result: [SUCCESS | PARTIAL | FAILED]

### Branch
staging ← [original branch]

### Merge
[Clean merge / Conflicts auto-resolved / Conflicts needed user input]

### Push
[Pushed to remote / Failed]

### Vercel Deploy
[Preview URL / Failed]

### Remote URL
[Reverted to original / WARNING: still pointing to github-common]

### Current Branch
[current branch after checkout back]

### Current Status
[git status output]
```

## Rules
- NEVER force push or use destructive git operations.
- NEVER modify files outside of conflict resolution.
- NEVER stay on staging — always return to the original branch at the end.
- **NEVER leave the remote URL pointing to `github-common`** — reverting to the original remote URL (Step 6) is mandatory and must execute even if prior steps fail.
- If anything unexpected happens, STOP and ask the user (but still revert the remote URL first).
- Always show `git status` at the end so the user can verify the state.
