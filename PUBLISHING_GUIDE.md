# Sanity Publishing Guide

## Understanding the Publishing Error

When you see an error like:

```
Document "drafts.XXX" cannot be deleted as there are references to it from "drafts.YYY"
```

This means:

- Document XXX (the Destination you're trying to publish) is referenced by Document YYY (a draft Package)
- When you publish XXX, Sanity tries to delete the draft version
- But it can't delete the draft because YYY (a draft Package) still references it
- Sanity prevents this to maintain referential integrity

## Solution: Publish Packages First

**Important**: When a draft Package references a draft Destination, you must publish the Package first, then the Destination.

### Correct Publishing Order:

1. **Services** (no dependencies) - publish first
2. **Packages** (references Destinations) - publish second
3. **Destinations** (referenced by Packages) - publish last

### Step-by-Step Instructions

#### Step 1: Publish All Services

1. Go to Sanity Studio: `https://payaana.sanity.studio/`
2. Navigate to **Services** folder
3. Select all draft services (or publish them individually)
4. Click **Publish** button

#### Step 2: Publish All Packages First

**Why?** Packages can reference draft Destinations. When you publish a Package, it will keep the reference to the draft Destination. Then you can publish the Destination.

1. Navigate to **Packages** folder
2. Select all draft packages (or publish them individually)
3. Click **Publish** button

#### Step 3: Publish All Destinations

1. Navigate to **Destinations** folder
2. Select all draft destinations (or publish them individually)
3. Click **Publish** button

**Note**: After publishing Packages, the Destinations can now be published because the Packages are already published and will automatically update their references to the published Destination versions.

## Finding Which Documents Reference Each Other

If you need to identify specific documents causing issues, use this GROQ query in Sanity Studio's Vision tool:

### Find all draft packages and their referenced destinations:

```groq
*[_type == "packages" && _id in path("drafts.**")] {
  _id,
  title,
  "referencedDestination": destination-> {
    _id,
    name,
    "isDraft": _id in path("drafts.**")
  }
}
```

### Find all draft destinations that are referenced:

```groq
*[_type == "destination" && _id in path("drafts.**")] {
  _id,
  name,
  "referencedBy": *[_type == "packages" && references(^._id) && _id in path("drafts.**")] {
    _id,
    title
  }
}
```

## Quick Fix for Current Error

Based on your error:

- Document `drafts.1531c479-d05a-4b0b-ab88-775b38ab7774` is a **Destination** (the one you're trying to publish)
- Document `drafts.f7e8b20b-2574-4c72-a842-d68936259ca4` is a **Package** (references the destination)

**To fix:**

1. **First**: Go to Packages folder and publish the Package with ID `f7e8b20b-2574-4c72-a842-d68936259ca4`
2. **Then**: Go to Destinations folder and publish the Destination with ID `1531c479-d05a-4b0b-ab88-775b38ab7774`

## Alternative Solution: Batch Publish

If you have many documents with cross-references:

1. Go to **Packages** folder
2. Select **ALL** draft packages
3. Click **Publish** (this will publish all packages, even if they reference draft destinations)
4. Go to **Destinations** folder
5. Select **ALL** draft destinations
6. Click **Publish** (this will now work because packages are already published)

## Tips

- **Bulk Publishing**: You can select multiple documents and publish them all at once
- **Check References**: Before publishing, check if any document references another draft
- **Publish Referencing Documents First**: If Package A references Destination B, publish Package A first, then Destination B
- **Why This Works**: Published documents can reference drafts, but when you publish the destination later, the package references automatically update to the published version
