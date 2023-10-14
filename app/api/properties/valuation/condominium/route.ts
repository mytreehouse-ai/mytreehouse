import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { formatToPhp } from "@/lib/utils";
import { fetchVercelEdgeConfig } from "@/lib/edge-config";
import { z } from "zod";

const CondominiumValuationSchema = z.object({
  sqm: z.preprocess(
    (input) => parseInt(String(input), 10),
    z.number().positive(),
  ),
  year_built: z.preprocess(
    (input) => parseInt(String(input), 10),
    z.number().positive(),
  ),
  city_id: z.string().uuid(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const parsedQueryData = CondominiumValuationSchema.safeParse(
      Object.fromEntries(searchParams),
    );

    if (parsedQueryData.success === false) {
      return new Response(parsedQueryData.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }

    const {
      CONDOMINIUM_PROPERTY_TYPE_ID,
      CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS,
      FOR_SALE_LISTING_TYPE_ID,
      FOR_RENT_LISTING_TYPE_ID,
      CLOSED_TRANSACTION_ID,
      SOLD_TRANSACTION_ID,
      UNTAGGED_TRANSACTION_ID,
    } = await fetchVercelEdgeConfig();

    const { sqm, year_built, city_id } = parsedQueryData.data;

    const closedTransaction = {
      average_property_price_for_sale: 0,
      average_property_price_for_rent: 0,
    };

    const scrappedTransaction = {
      average_property_price_for_sale: 0,
      average_property_price_for_rent: 0,
    };

    const closedTransactionAverageTextQuery = `
      select avg(p.current_price) as average_property_price
      from properties as p
      where 
        p.current_price > 0 
      and
        (
            p.property_status_id = $1 or
            p.property_status_id = $2
        ) 
      and
        p.property_status_id != $3 and
        p.current_price is distinct from 'NaN'::numeric and
        p.property_type_id = $4 and
        p.listing_type_id = $5 and
        p.city_id = $6 and
        p.floor_area between $7 * 0.8 and $7 * 1.2;
    `;

    const scrappedPropertyTransactionAverageTextQuery = `
      select avg(p.current_price) as average_property_price
      from properties as p
      where 
        p.current_price > 0 
      and
        p.current_price is distinct from 'NaN'::numeric and
        p.property_type_id = $1 and
        p.listing_type_id = $2 and
        p.city_id = $3 and
        p.floor_area between $4 * 0.8 and $4 * 1.2;
    `;

    await sql.query("begin");

    const closedTransactionForSaleAverageQuery = await sql.query(
      closedTransactionAverageTextQuery,
      [
        SOLD_TRANSACTION_ID,
        CLOSED_TRANSACTION_ID,
        UNTAGGED_TRANSACTION_ID,
        CONDOMINIUM_PROPERTY_TYPE_ID,
        FOR_SALE_LISTING_TYPE_ID,
        city_id,
        sqm,
      ],
    );

    if (closedTransactionForSaleAverageQuery.rows.length) {
      if (
        closedTransactionForSaleAverageQuery.rows[0]?.average_property_price
      ) {
        closedTransaction.average_property_price_for_sale =
          closedTransactionForSaleAverageQuery.rows[0].average_property_price;
      }
    }

    const closedTransactionForRentAverageQuery = await sql.query(
      closedTransactionAverageTextQuery,
      [
        SOLD_TRANSACTION_ID,
        CLOSED_TRANSACTION_ID,
        UNTAGGED_TRANSACTION_ID,
        CONDOMINIUM_PROPERTY_TYPE_ID,
        FOR_RENT_LISTING_TYPE_ID,
        city_id,
        sqm,
      ],
    );

    if (closedTransactionForRentAverageQuery.rows.length) {
      if (
        closedTransactionForRentAverageQuery.rows[0]?.average_property_price
      ) {
        closedTransaction.average_property_price_for_rent =
          closedTransactionForRentAverageQuery.rows[0].average_property_price;
      }
    }

    const scrappedPropertyTransactionForSaleAverageQuery = await sql.query(
      scrappedPropertyTransactionAverageTextQuery,
      [CONDOMINIUM_PROPERTY_TYPE_ID, FOR_SALE_LISTING_TYPE_ID, city_id, sqm],
    );

    if (scrappedPropertyTransactionForSaleAverageQuery.rows.length) {
      if (
        scrappedPropertyTransactionForSaleAverageQuery.rows[0]
          ?.average_property_price
      ) {
        scrappedTransaction.average_property_price_for_sale =
          scrappedPropertyTransactionForSaleAverageQuery.rows[0].average_property_price;
      }
    }

    const scrappedPropertyTransactionForRentAverageQuery = await sql.query(
      scrappedPropertyTransactionAverageTextQuery,
      [CONDOMINIUM_PROPERTY_TYPE_ID, FOR_RENT_LISTING_TYPE_ID, city_id, sqm],
    );

    if (scrappedPropertyTransactionForRentAverageQuery.rows.length) {
      if (
        scrappedPropertyTransactionForRentAverageQuery.rows[0]
          ?.average_property_price
      ) {
        scrappedTransaction.average_property_price_for_rent =
          scrappedPropertyTransactionForRentAverageQuery.rows[0].average_property_price;
      }
    }

    const condominiumRemainingUsefulLife =
      (CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS -
        (new Date().getFullYear() - year_built)) /
      CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS;

    const pricePerSqmInClosedTransactionForSale =
      (closedTransaction.average_property_price_for_sale * 0.6 +
        scrappedTransaction.average_property_price_for_sale * 0.4) /
      sqm;

    const pricePerSqmInClosedTransactionForRent =
      (closedTransaction.average_property_price_for_rent * 0.6 +
        scrappedTransaction.average_property_price_for_rent * 0.4) /
      sqm;

    const appraisalValueWithClosedTransactionForSale =
      pricePerSqmInClosedTransactionForSale *
      sqm *
      condominiumRemainingUsefulLife;

    const appraisalValueWithClosedTransactionForRent =
      pricePerSqmInClosedTransactionForRent *
      sqm *
      condominiumRemainingUsefulLife;

    const pricePerSqmInScrapedTransactionForSale =
      scrappedTransaction.average_property_price_for_sale / sqm;

    const pricePerSqmInScrapedTransactionForRent =
      scrappedTransaction.average_property_price_for_rent / sqm;

    const appraisalValueWithoutClosedTransactionForSale =
      pricePerSqmInScrapedTransactionForSale *
      (sqm * condominiumRemainingUsefulLife);

    const appraisalValueWithoutClosedTransactionForRent =
      pricePerSqmInScrapedTransactionForRent *
      (sqm * condominiumRemainingUsefulLife);

    await sql.query("commit");

    return new Response(
      JSON.stringify({
        closedTransaction: {
          forSale: closedTransaction.average_property_price_for_sale,
          forRent: closedTransaction.average_property_price_for_rent,
        },
        scrappedTransaction: {
          forSale: scrappedTransaction.average_property_price_for_sale,
          forRent: scrappedTransaction.average_property_price_for_rent,
        },
        appraisalValue: {
          condominiumRemainingUsefulLife,
          withClosedTransactionForSale:
            appraisalValueWithClosedTransactionForSale,
          withoutClosedTransactionForSale:
            appraisalValueWithoutClosedTransactionForSale,
          withClosedTransactionForRent:
            appraisalValueWithClosedTransactionForRent,
          withoutClosedTransactionForRent:
            appraisalValueWithoutClosedTransactionForRent,
        },
        phpFormat: {
          withClosedTransaction: {
            forSale: {
              pricePerSqm: formatToPhp(pricePerSqmInClosedTransactionForSale),
              appraisalValue: formatToPhp(
                appraisalValueWithClosedTransactionForSale,
              ),
            },
            forRent: {
              pricePerSqm: formatToPhp(pricePerSqmInClosedTransactionForRent),
              appraisalValue: formatToPhp(
                appraisalValueWithClosedTransactionForRent,
              ),
            },
          },
          withoutClosedTransaction: {
            forSale: {
              pricePerSqm: formatToPhp(pricePerSqmInScrapedTransactionForSale),
              appraisalValue: formatToPhp(
                appraisalValueWithoutClosedTransactionForSale,
              ),
            },
            forRent: {
              pricePerSqm: formatToPhp(pricePerSqmInScrapedTransactionForRent),
              appraisalValue: formatToPhp(
                appraisalValueWithoutClosedTransactionForRent,
              ),
            },
          },
        },
        metadata: {
          sqm,
          year_built,
        },
      }),
    );
  } catch (e) {
    await sql.query("rollback");

    return new Response("Neon Database Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
