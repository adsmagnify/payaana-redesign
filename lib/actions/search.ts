"use server";

import { client } from "@/lib/sanity/client";

export async function handleSearchAction(query: string) {
    if (!query || !query.trim()) {
        return { type: "empty", url: "/packages" };
    }

    const searchTerm = query.trim();

    try {
        // 1. Check for Destination match
        // We use a case-insensitive match on the name
        const destination = await client.fetch(
            `*[_type == "destination" && name match $searchTerm][0] {
        slug
      }`,
            { searchTerm: `*${searchTerm}*` } // Wildcards for broader matching
        );

        if (destination && destination.slug?.current) {
            return { type: "destination", url: `/destinations/${destination.slug.current}` };
        }

        // 2. Check for Package match
        const pkg = await client.fetch(
            `*[_type == "packages" && title match $searchTerm][0] {
        slug
      }`,
            { searchTerm: `*${searchTerm}*` }
        );

        if (pkg && pkg.slug?.current) {
            return { type: "package", url: `/packages/${pkg.slug.current}` };
        }

        // 3. Fallback to general search results
        const params = new URLSearchParams();
        params.set("search", searchTerm);
        return { type: "search", url: `/packages?${params.toString()}` };

    } catch (error) {
        console.error("Search action error:", error);
        // Fallback on error
        const params = new URLSearchParams();
        params.set("search", searchTerm);
        return { type: "search", url: `/packages?${params.toString()}` };
    }
}
