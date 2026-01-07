# Simple Publishing Guide for Non-Technical Users

## 🎯 Quick Answer: How to Publish Multiple Documents

### Option 1: Using Sanity Studio (Easiest - No Code Required)

1. **Go to Sanity Studio**: Open `https://payaana.sanity.studio/` in your browser
2. **Login** with your Sanity account

#### Publishing Order (Important!)

**Step 1: Publish All Packages First**

1. Click on **"Packages"** in the left sidebar
2. You'll see a list of all packages
3. Look for packages with a **"Draft"** badge or in the drafts section
4. Select all draft packages (or click the checkbox at the top to select all)
5. Click the **"Publish"** button at the top
6. Wait for all packages to be published

**Step 2: Publish All Destinations**

1. Click on **"Destinations"** in the left sidebar
2. Select all draft destinations
3. Click **"Publish"**
4. If you see errors, don't worry - see "Troubleshooting" below

**Step 3: Publish All Services** (if any)

1. Click on **"Services"** in the left sidebar
2. Select all draft services
3. Click **"Publish"**

### Option 2: Using Command Line (For Technical Users)

If you have access to the command line and an API token:

```bash
SANITY_API_TOKEN=your-token npm run publish-drafts
```

Then if destinations fail:

```bash
SANITY_API_TOKEN=your-token npm run publish-destinations-fix
```

---

## ⚠️ Common Problem: "Cannot Delete Draft" Error

### What This Means

When you try to publish a destination, you might see an error like:

> "Document cannot be deleted as there are references to it"

This happens because:

- You published packages that reference draft destinations
- Now Sanity won't let you delete the draft destination because published packages reference it

### Solution: Update References First

**In Sanity Studio:**

1. **Find the problematic destination** (the one that failed to publish)
2. **Note its name** (e.g., "Australia", "Switzerland")
3. **Go to Packages folder**
4. **Search for packages** that reference this destination
5. **For each package:**
   - Open the package
   - Find the "Destination" field
   - Change it to the **published version** of the destination (if it exists)
   - Or temporarily remove the destination reference
   - Save the package
6. **Go back to Destinations**
7. **Try publishing the destination again**

### Automated Fix (If You Have Command Line Access)

Run this command to automatically fix and publish remaining destinations:

```bash
SANITY_API_TOKEN=your-token npm run publish-destinations-fix
```

---

## 📋 Step-by-Step: Publishing in Sanity Studio

### Detailed Instructions

1. **Open Sanity Studio**
   - Go to: `https://payaana.sanity.studio/`
   - Login if needed

2. **Navigate to Content**
   - Look at the left sidebar
   - You'll see folders like "Packages", "Destinations", "Services"

3. **Publish Packages First**
   - Click **"Packages"**
   - You'll see a list view
   - Drafts might be shown separately or with a "Draft" badge
   - **Select multiple**: Click the checkbox next to each draft, or use "Select All"
   - Click the **"Publish"** button (usually at the top toolbar)
   - Wait for confirmation

4. **Publish Destinations**
   - Click **"Destinations"**
   - Select all drafts
   - Click **"Publish"**
   - If errors appear, see troubleshooting below

5. **Publish Services** (if any)
   - Click **"Services"**
   - Select all drafts
   - Click **"Publish"**

---

## 🔧 Troubleshooting

### Problem: "Cannot delete draft" error when publishing destinations

**Why this happens:**

- Packages were published first (which is correct)
- But they still reference the draft destination
- Sanity won't delete the draft because published documents reference it

**Solution A: Manual Fix (In Studio)**

1. Go to **Packages** folder
2. Find packages that reference the failed destination
3. Open each package
4. In the "Destination" field, select the **published version** (if it exists) or remove it temporarily
5. Save the package
6. Go back to **Destinations** and try publishing again

**Solution B: Use Fix Script (Command Line)**

```bash
SANITY_API_TOKEN=your-token npm run publish-destinations-fix
```

### Problem: Can't find the "Publish" button

- Look at the top toolbar in Sanity Studio
- It might be in a menu (three dots or "Actions")
- Make sure you have **Editor** or **Administrator** permissions

### Problem: Some documents publish, others don't

- This is normal if there are reference issues
- Publish what you can
- Fix references for failed ones
- Try publishing failed ones again

---

## ✅ Best Practices

1. **Always publish in this order:**
   - Services (no dependencies)
   - Packages (references destinations)
   - Destinations (referenced by packages)

2. **Publish in batches:**
   - Don't try to publish everything at once if you have many documents
   - Publish 10-20 at a time

3. **Check for errors:**
   - After publishing, check if any failed
   - Fix references and try again

4. **Use bulk selection:**
   - In list view, use checkboxes to select multiple
   - Use "Select All" if available
   - Then click "Publish" once for all

---

## 🆘 Need Help?

If you're stuck:

1. Check the error message - it usually tells you which document is causing the issue
2. Look for the document ID in the error
3. Find that document in Sanity Studio
4. Check what references it (usually packages)
5. Update those references first

---

## 📝 Quick Reference

**Publishing Order:**

1. Services → 2. Packages → 3. Destinations

**If Destinations Fail:**

- Update package references first
- Or use: `npm run publish-destinations-fix`

**Bulk Publish:**

- Select multiple documents
- Click "Publish" button
- Wait for confirmation
