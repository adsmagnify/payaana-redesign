# Bulk Publish Scripts

## publish-all-drafts.js

Bulk publishes all draft documents in Sanity (Packages, Destinations, and Services).

### Prerequisites

You need a Sanity API token with **Editor** permissions.

### Getting Your API Token

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Select your project (Payaana)
3. Navigate to **API** > **Tokens**
4. Click **Add API token**
5. Name it (e.g., "Bulk Publish Script")
6. Select **Editor** permissions
7. Copy the token

### Usage

#### Option 1: Using npm script

```bash
SANITY_API_TOKEN=your-token-here npm run publish-drafts
```

#### Option 2: Direct node command

```bash
SANITY_API_TOKEN=your-token-here node scripts/publish-all-drafts.js
```

### What It Does

1. **Publishes all draft Packages first** (to avoid reference errors)
2. **Publishes all draft Destinations** (after packages are published)
3. **Publishes all draft Services** (no dependencies)

### Output

The script will show:

- Number of drafts found for each type
- Success/failure status for each document
- Summary of published vs failed documents

### Example Output

```
🚀 Starting bulk publish of all draft documents...
Project: q2w6jxdi
Dataset: production

==================================================
STEP 1: Publishing Packages
==================================================

📦 Fetching draft packages...
Found 5 draft packages
  ✅ Published: Dubai Adventure
  ✅ Published: Tokyo Discovery
  ...

==================================================
STEP 2: Publishing Destinations
==================================================

📦 Fetching draft destinations...
Found 3 draft destinations
  ✅ Published: Dubai
  ✅ Published: Tokyo
  ...

📊 PUBLISHING SUMMARY
==================================================
Packages:    5 published, 0 failed
Destinations: 3 published, 0 failed
Services:    8 published, 0 failed

Total: 16 published, 0 failed

✅ All draft documents published successfully!
```

### Troubleshooting

**Error: "SANITY_API_TOKEN environment variable is required"**

- Make sure you've set the token as an environment variable
- Use: `SANITY_API_TOKEN=your-token node scripts/publish-all-drafts.js`

**Error: "Unauthorized" or "Forbidden"**

- Check that your token has **Editor** permissions
- Regenerate the token if needed

**Error: "Document cannot be deleted as there are references"**

- This happens when published packages reference draft destinations
- **Solution**: Run the fix script after the main script:
  ```bash
  SANITY_API_TOKEN=your-token npm run publish-destinations-fix
  ```
- This script automatically updates package references and publishes destinations

---

## publish-destinations-fix.js

Fixes and publishes destinations that failed due to reference errors.

### When to Use

Run this script **after** running `publish-all-drafts.js` if some destinations failed to publish.

### Usage

```bash
SANITY_API_TOKEN=your-token npm run publish-destinations-fix
```

### What It Does

1. Finds all remaining draft destinations
2. For each destination:
   - Finds all published packages that reference the draft destination
   - Updates those packages to reference the published destination ID
   - Publishes the destination
3. Shows a summary of published vs failed documents

### Example

If `publish-all-drafts.js` published 28 packages but only 12 destinations (27 failed), run:

```bash
SANITY_API_TOKEN=your-token npm run publish-destinations-fix
```

This will fix the 27 failed destinations by updating package references first.
