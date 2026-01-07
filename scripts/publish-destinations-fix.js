#!/usr/bin/env node
/**
 * Fix and publish remaining draft destinations
 *
 * This script updates package references and publishes destinations that failed before.
 *
 * Usage:
 *   SANITY_API_TOKEN=your-token node scripts/publish-destinations-fix.js
 */

const { createClient } = require("@sanity/client");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "q2w6jxdi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ Error: SANITY_API_TOKEN environment variable is required");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function fixAndPublishDestinations() {
  console.log("🔧 Fixing and publishing remaining draft destinations...\n");

  // Get all draft destinations
  const draftDestinations = await client.fetch(
    `*[_type == "destination" && _id in path("drafts.**")] {
      _id,
      name
    }`
  );

  if (draftDestinations.length === 0) {
    console.log("✅ No draft destinations found");
    return;
  }

  console.log(`Found ${draftDestinations.length} draft destinations\n`);

  let published = 0;
  let failed = 0;

  for (const dest of draftDestinations) {
    try {
      const publishedId = dest._id.replace("drafts.", "");

      // Find all published packages referencing this draft destination
      const packages = await client.fetch(
        `*[_type == "packages" && !(_id in path("drafts.**")) && destination._ref == $draftId] {
          _id,
          title
        }`,
        { draftId: dest._id }
      );

      // Update package references to point to published destination
      if (packages.length > 0) {
        console.log(
          `  🔄 Updating ${packages.length} package(s) for: ${dest.name}`
        );
        for (const pkg of packages) {
          await client
            .patch(pkg._id)
            .set({
              destination: {
                _type: "reference",
                _ref: publishedId,
              },
            })
            .commit();
        }
      }

      // Fetch and publish the destination
      const draftDoc = await client.getDocument(dest._id);
      const { _id, _rev, ...docData } = draftDoc;

      await client.createOrReplace({
        ...docData,
        _id: publishedId,
        _type: "destination",
      });

      await client.delete(dest._id);

      console.log(`  ✅ Published: ${dest.name}\n`);
      published++;
    } catch (error) {
      console.error(`  ❌ Failed: ${dest.name}`);
      console.error(`     Error: ${error.message}\n`);
      failed++;
    }
  }

  console.log("=".repeat(50));
  console.log(`📊 Summary: ${published} published, ${failed} failed`);
}

fixAndPublishDestinations().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
