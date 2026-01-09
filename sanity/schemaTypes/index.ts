import { type SchemaTypeDefinition } from "sanity";
import packageSchema from "../schemas/package";
import destinationSchema from "../schemas/destination";
import serviceSchema from "../schemas/service";
import gallerySchema from "../schemas/gallery";
import leadSchema from "../schemas/lead";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [packageSchema, destinationSchema, serviceSchema, gallerySchema, leadSchema],
};
