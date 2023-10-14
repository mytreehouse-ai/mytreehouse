import { getAll } from "@vercel/edge-config";
import { z } from "zod";

const VercelEdgeConfigSchema = z.object({
  CONDOMINIUM_PROPERTY_TYPE_ID: z.string().uuid(),
  TOWNHOUSE_PROPERTY_TYPE_ID: z.string().uuid(),
  APARTMENT_PROPERTY_TYPE_ID: z.string().uuid(),
  WAREHOUSE_PROPERTY_TYPE_ID: z.string().uuid(),
  HOUSE_AND_LOT_PROPERTY_TYPE_ID: z.string().uuid(),
  VACANT_LOT_PROPERTY_TYPE_ID: z.string().uuid(),
  CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS: z.number().positive(),
  FOR_SALE_LISTING_TYPE_ID: z.string().uuid(),
  FOR_RENT_LISTING_TYPE_ID: z.string().uuid(),
  CLOSED_TRANSACTION_ID: z.string().uuid(),
  SOLD_TRANSACTION_ID: z.string().uuid(),
  UNTAGGED_TRANSACTION_ID: z.string().uuid(),
});

export const fetchVercelEdgeConfig = async () => {
  const config = await getAll();

  return VercelEdgeConfigSchema.parse(config);
};
