---
description: Create a ClickUp bug sub-task from a Slack thread with attachments uploaded to Google Drive
allowed-tools: Bash, Read, mcp__clickup__clickup_create_task, mcp__clickup__clickup_get_task, mcp__clickup__clickup_create_task_comment, mcp__clickup__clickup_find_member_by_name, mcp__clickup__clickup_update_task, mcp__clickup__clickup_resolve_assignees
---

# Bug From Slack → ClickUp

Create a ClickUp sub-task from a Slack thread. Arguments: `$ARGUMENTS`

Expected format: `<slack_channel_id> <slack_message_ts> <clickup_parent_task_id> <google_drive_folder_id>`

## Step 1: PARSE ARGUMENTS

Parse the 4 required arguments from `$ARGUMENTS`:
- `slack_channel_id` — Slack channel ID (e.g., C01ABC123)
- `slack_message_ts` — Slack message timestamp (e.g., 1234567890.123456)
- `clickup_parent_task_id` — ClickUp parent task ID to create sub-task under
- `google_drive_folder_id` — Google Drive folder ID for attachment uploads

If any argument is missing, ask the user to provide it.

## Step 2: FETCH SLACK THREAD AND UPLOAD ATTACHMENTS

Run the local script that handles all token-bearing API calls:

```bash
cd /Users/nikhilojha/Projects/nrev-ui-2 && npx tsx scripts/bug-from-slack.ts <channel_id> <message_ts> <drive_folder_id> 2>&1
```

Note: Progress messages go to stderr (visible in output), JSON result goes to stdout.

Parse the JSON output from the script. The JSON has this structure:
```json
{
  "threadMessages": [{ "author": "...", "text": "...", "timestamp": "..." }],
  "attachments": [{ "fileName": "...", "driveUrl": "...", "mimeType": "..." }],
  "summary": "...",
  "rawThread": "..."
}
```

If the script fails, report the error and stop.

## Step 3: GET PARENT TASK CONTEXT

Use `mcp__clickup__clickup_get_task` to fetch the parent task details:
- Get the parent task name and list ID (needed to create sub-task in same list)

## Step 4: CREATE CLICKUP SUB-TASK

Use `mcp__clickup__clickup_create_task` to create a sub-task under the parent task:

- **name**: A concise bug title derived from the Slack thread summary. Format: `[Bug] <brief description>`
- **parent**: The `clickup_parent_task_id`
- **description**: Build a markdown description with:
  ```
  ## Bug Report (from Slack)

  ### Summary
  [1-2 sentence summary derived from thread]

  ### Thread Conversation
  [Full thread formatted as:]
  **[Author]** (timestamp):
  > message text

  ### Attachments
  [If any attachments were uploaded:]
  - [file_name](drive_url) (mime_type)

  ---
  *Auto-created from Slack thread by Claude Code*
  ```
- **priority**: 3 (normal) — unless the thread language suggests urgency, then use 2 (high)
- **assignees**: Resolve the user's ClickUp member ID using `mcp__clickup__clickup_find_member_by_name` with name "Nikhil" and assign

## Step 5: ADD ATTACHMENT LINKS AS COMMENT

If there are attachments, use `mcp__clickup__clickup_create_task_comment` on the newly created task to add a comment with all Google Drive links for easy access:

```
📎 Attachments from Slack thread:
- [file_name](drive_url)
- [file_name](drive_url)
```

## Step 6: REPORT

Print a summary:
```
## Bug Task Created

**Task**: [task name with ClickUp link if available]
**Parent**: [parent task name]
**Assignee**: Nikhil
**Attachments**: [count] file(s) uploaded to Google Drive

### Thread Summary
[1-2 sentence summary]
```

## Rules
- NEVER display or log any token values — the script handles all authenticated API calls internally.
- If the Slack thread has no text content (only files), still create the task with available info.
- If Google Drive upload fails for some files, still create the task and note which uploads failed.
- Do not modify the parent task in any way.
