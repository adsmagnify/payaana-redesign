#!/usr/bin/env node
/**
 * Bulk publish all draft documents in Sanity
 *
 * This script publishes all draft packages first, then all draft destinations
 * to avoid reference errors.
 *
 * Usage:
 *   node scripts/publish-all-drafts.js
 *
 * Or with environment variables:
 *   SANITY_API_TOKEN=your-token node scripts/publish-all-drafts.js
 */

const { createClient } = require("@sanity/client");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "q2w6jxdi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ Error: SANITY_API_TOKEN environment variable is required");
  console.log("\nTo get your token:");
  console.log("1. Go to https://sanity.io/manage");
  console.log("2. Select your project");
  console.log("3. Go to API > Tokens");
  console.log("4. Create a new token with 'Editor' permissions");
  console.log("\nThen run:");
  console.log(
    "  SANITY_API_TOKEN=your-token node scripts/publish-all-drafts.js"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function publishDraft(draftId, typeName) {
  const publishedId = draftId.replace("drafts.", "");

  // Fetch the full draft document
  const draftDoc = await client.getDocument(draftId);

  // Remove the _id and _rev from draft, set new _id
  const { _id, _rev, ...docData } = draftDoc;

  // Create or replace the published document
  await client.createOrReplace({
    ...docData,
    _id: publishedId,
    _type: draftDoc._type,
  });

  // Delete the draft
  await client.delete(draftId);
}

async function updatePackageReferences(
  draftDestinationId,
  publishedDestinationId
) {
  // Find all published packages that reference the draft destination
  const packages = await client.fetch(
    `*[_type == "packages" && !(_id in path("drafts.**")) && destination._ref == $draftId] {
      _id,
      title
    }`,
    { draftId: draftDestinationId }
  );

  // Update each package to reference the published destination
  for (const pkg of packages) {
    await client
      .patch(pkg._id)
      .set({
        destination: {
          _type: "reference",
          _ref: publishedDestinationId,
        },
      })
      .commit();
  }

  return packages.length;
}

async function publishDrafts(type, typeName) {
  console.log(`\n📦 Fetching draft ${typeName}...`);

  // Fetch all draft documents of this type
  const drafts = await client.fetch(
    `*[_type == $type && _id in path("drafts.**")] {
      _id,
      _type,
      title,
      name
    }`,
    { type }
  );

  if (drafts.length === 0) {
    console.log(`✅ No draft ${typeName} found`);
    return { published: 0, failed: 0 };
  }

  console.log(`Found ${drafts.length} draft ${typeName}`);

  let published = 0;
  let failed = 0;

  // Publish each draft
  for (const draft of drafts) {
    try {
      const publishedId = draft._id.replace("drafts.", "");
      const name = draft.title || draft.name || draft._id;

      // If this is a destination, update package references first
      if (type === "destination") {
        const updatedCount = await updatePackageReferences(
          draft._id,
          publishedId
        );
        if (updatedCount > 0) {
          console.log(
            `  🔄 Updated ${updatedCount} package reference(s) for: ${name}`
          );
        }
      }

      // Publish the document
      await publishDraft(draft._id, name);

      console.log(`  ✅ Published: ${name}`);
      published++;
    } catch (error) {
      const name = draft.title || draft.name || draft._id;
      console.error(`  ❌ Failed to publish: ${name}`);
      console.error(`     Error: ${error.message}`);
      failed++;
    }
  }

  return { published, failed };
}

async function main() {
  console.log("🚀 Starting bulk publish of all draft documents...");
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);

  // Step 1: Publish all draft packages first
  console.log("\n" + "=".repeat(50));
  console.log("STEP 1: Publishing Packages");
  console.log("=".repeat(50));
  const packagesResult = await publishDrafts("packages", "packages");

  // Step 2: Publish all draft destinations
  console.log("\n" + "=".repeat(50));
  console.log("STEP 2: Publishing Destinations");
  console.log("=".repeat(50));
  const destinationsResult = await publishDrafts("destination", "destinations");

  // Step 3: Publish all draft services (optional, but good to do)
  console.log("\n" + "=".repeat(50));
  console.log("STEP 3: Publishing Services");
  console.log("=".repeat(50));
  const servicesResult = await publishDrafts("services", "services");

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 PUBLISHING SUMMARY");
  console.log("=".repeat(50));
  console.log(
    `Packages:    ${packagesResult.published} published, ${packagesResult.failed} failed`
  );
  console.log(
    `Destinations: ${destinationsResult.published} published, ${destinationsResult.failed} failed`
  );
  console.log(
    `Services:    ${servicesResult.published} published, ${servicesResult.failed} failed`
  );

  const totalPublished =
    packagesResult.published +
    destinationsResult.published +
    servicesResult.published;
  const totalFailed =
    packagesResult.failed + destinationsResult.failed + servicesResult.failed;

  console.log(`\nTotal: ${totalPublished} published, ${totalFailed} failed`);

  if (totalFailed > 0) {
    console.log(
      "\n⚠️  Some documents failed to publish. Check the errors above."
    );
    process.exit(1);
  } else {
    console.log("\n✅ All draft documents published successfully!");
  }
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
