import z from 'zod'

const pagination = z.object({
  pageSize: z.preprocess((val) => Number(val), z.number().min(1)),
  pageNumber: z.preprocess((val) => Number(val), z.number().min(1)),
})

export const PropertyListingSearchSchema = z
  .object({
    property_type: z.string().uuid(),
    listing_type: z.string().uuid(),
    turnover_status: z.string().nonempty(),
    bedroom_count: z.preprocess((val) => Number(val), z.number().min(0)),
    bathroom_count: z.preprocess((val) => Number(val), z.number().min(0)),
    studio_type: z.preprocess((val) => val === "true", z.boolean()),
    is_cbd: z.preprocess((val) => val === "true", z.boolean()),
    text_search: z.string().nonempty(),
    city: z.string().uuid(),
    sqm: z.preprocess((val) => Number(val), z.number()),
    sqm_min: z.preprocess((val) => Number(val), z.number().min(0)),
    sqm_max: z.preprocess((val) => Number(val), z.number().min(0)),
    min_price: z.preprocess((val) => Number(val), z.number().min(0)),
    max_price: z.preprocess((val) => Number(val), z.number().min(0)),
    page_limit: z.preprocess((val) => Number(val), z.number().min(0)),
    page_number: z.preprocess((val) => Number(val), z.number().min(0)),

  })
  .partial()
  .refine((input) => {
    if (input?.sqm_min || input?.sqm_max) {
      input.sqm = 0;
    }
    if (input?.sqm_min && !input?.sqm_max) {
      input.sqm_max = 9999;
    }
    if (!input?.sqm_min && input?.sqm_max) {
      input.sqm_min = 20;
    }
    if (input?.min_price && !input?.max_price) {
      input.max_price = 999_999_999;
    }
    if (input?.max_price && !input.min_price) {
      input.min_price = 1;
    }
    return true;
  });
export type PropertyListingSearchType = z.infer<
  typeof PropertyListingSearchSchema
>;