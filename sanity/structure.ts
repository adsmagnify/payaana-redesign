import type { StructureResolver } from "sanity/structure";
import {
  FolderIcon,
  PackageIcon,
  PinIcon,
  WrenchIcon,
  EarthGlobeIcon,
  HomeIcon,
  CalendarIcon,
  SparklesIcon,
} from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Payaana Content")
    .items([
      // Services - No bifurcation needed
      S.listItem()
        .title("Services")
        .icon(WrenchIcon)
        .child(
          S.documentList().title("All Services").filter('_type == "services"')
        ),

      S.divider(),

      // Destinations - Organized in folders
      S.listItem()
        .title("Destinations")
        .icon(PinIcon)
        .child(
          S.list()
            .title("Destinations")
            .items([
              // International Destinations Folder
              S.listItem()
                .title("International Destinations")
                .icon(EarthGlobeIcon)
                .child(
                  S.documentList()
                    .title("International Destinations")
                    .filter('_type == "destination" && type == "international"')
                    .defaultOrdering([
                      { field: "displayOrder", direction: "asc" },
                    ])
                ),
              // Domestic Destinations Folder
              S.listItem()
                .title("Domestic Destinations")
                .icon(HomeIcon)
                .child(
                  S.documentList()
                    .title("Domestic Destinations")
                    .filter('_type == "destination" && type == "domestic"')
                    .defaultOrdering([
                      { field: "displayOrder", direction: "asc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // Packages - Organized in folders by category
      S.listItem()
        .title("Packages")
        .icon(PackageIcon)
        .child(
          S.list()
            .title("Packages")
            .items([
              // International Holiday Packages Folder
              S.listItem()
                .title("International Holiday Packages")
                .icon(EarthGlobeIcon)
                .child(
                  S.documentList()
                    .title("International Holiday Packages")
                    .filter(
                      '_type == "packages" && category == "international"'
                    )
                    .defaultOrdering([
                      { field: "displayOrder", direction: "asc" },
                    ])
                ),
              // Domestic Holiday Packages Folder
              S.listItem()
                .title("Domestic Holiday Packages")
                .icon(HomeIcon)
                .child(
                  S.documentList()
                    .title("Domestic Holiday Packages")
                    .filter('_type == "packages" && category == "domestic"')
                    .defaultOrdering([
                      { field: "displayOrder", direction: "asc" },
                    ])
                ),
              // Fixed Departures Folder
              S.listItem()
                .title("Fixed Departures")
                .icon(CalendarIcon)
                .child(
                  S.documentList()
                    .title("Fixed Departures")
                    .filter(
                      '_type == "packages" && category == "fixedDeparture"'
                    )
                    .defaultOrdering([
                      { field: "displayOrder", direction: "asc" },
                    ])
                ),
              // Specialised Destination Folder
              S.listItem()
                .title("Specialised Destination")
                .icon(SparklesIcon)
                .child(
                  S.documentList()
                    .title("Specialised Destination")
                    .filter('_type == "packages" && category == "specialised"')
                    .defaultOrdering([
                      { field: "displayOrder", direction: "asc" },
                    ])
                ),
            ])
        ),
    ]);
