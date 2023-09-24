import { z } from "zod";

export const PropertyListingSearchSchema = z
  .object({
    property_type: z.string().uuid(),
    listing_type: z.string().uuid(),
    turnover_status: z.string().nonempty(),
    bedroom_count: z.number().min(1),
    bathroom_count: z.number().min(1),
    studio_type: z.boolean(),
    is_cbd: z.boolean(),
    text_search: z.string().nonempty(),
    city: z.string().uuid(),
    sqm: z.number().min(1),
    sqm_min: z.number().min(1),
    sqm_max: z.number().min(1),
    min_price: z.number().min(1),
    max_price: z.number().min(1),
    page_limit: z.number().min(1),
  })
  .partial();

export type PropertyListingSearchType = z.infer<
  typeof PropertyListingSearchSchema
>;
