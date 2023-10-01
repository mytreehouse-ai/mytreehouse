import { kv } from "@vercel/kv";
import sql from "@/server/db";
import { formatToPhp } from "@/lib/utils";

export async function GET() {
  const CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS: number | null = await kv.get(
    "CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS",
  );

  if (!CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS) {
    return new Response(
      JSON.stringify({
        message:
          "Config CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS is empty in redis kv",
      }),
      {
        status: 400,
        statusText: "Bad request",
      },
    );
  }

  const CLOSED_TRANSACTION_ID: string | null = await kv.get(
    "CLOSED_TRANSACTION_ID",
  );

  if (!CLOSED_TRANSACTION_ID) {
    return new Response(
      JSON.stringify({
        message: "Config CLOSED_TRANSACTION_ID is empty in redis kv",
      }),
      {
        status: 400,
        statusText: "Bad request",
      },
    );
  }

  const SOLD_TRANSACTION_ID: string | null = await kv.get(
    "SOLD_TRANSACTION_ID",
  );

  if (!SOLD_TRANSACTION_ID) {
    return new Response(
      JSON.stringify({
        message: "Config SOLD_TRANSACTION_ID is empty in redis kv",
      }),
      {
        status: 400,
        statusText: "Bad request",
      },
    );
  }

  const UNTAGGED_TRANSACTION_ID: string | null = await kv.get(
    "UNTAGGED_TRANSACTION_ID",
  );

  if (!UNTAGGED_TRANSACTION_ID) {
    return new Response(
      JSON.stringify({
        message: "Config UNTAGGED_TRANSACTION_ID is empty in redis kv",
      }),
      {
        status: 400,
        statusText: "Bad request",
      },
    );
  }

  const sqm = 234;
  const property_type_id = "e718f6f2-6f4b-48ae-9dff-93d64d5fb1a8";
  const listing_type_id = "cb2fbe3c-b9d0-4cbe-8b62-c28693837d2c";
  const city_id = "9574d79e-f8bd-4d07-b19a-00d3a5b96202";
  const year_built = 2022;

  const {
    closedTransaction,
    scrappedTransaction,
    condominiumRemainingUsefulLife,
    appraisalValueWithClosedTransaction,
    appraisalValueWithoutClosedTransaction,
    phpFormat,
    metadata,
  } = await sql.begin(async (sqltrx) => {
    const closedTransaction = {
      average_property_price: 0,
    };

    const closedTransactionAverageQuery = await sqltrx`
      select avg(p.current_price) as average_property_price
      from properties as p
      where 
        p.current_price > 0 
      and
        (
            p.property_status_id = ${SOLD_TRANSACTION_ID} or
            p.property_status_id = ${CLOSED_TRANSACTION_ID}
        ) 
      and
        p.property_status_id != ${UNTAGGED_TRANSACTION_ID} and
        p.current_price is distinct from 'NaN'::numeric and
        p.property_type_id = ${property_type_id} and
        p.listing_type_id = ${listing_type_id} and
        p.city_id = ${city_id} and
        p.floor_area between ${sqm} * 0.8 and ${sqm} * 1.2;
    `.execute();

    if (closedTransactionAverageQuery.length) {
      if (closedTransactionAverageQuery[0]?.average_property_price) {
        closedTransaction.average_property_price =
          closedTransactionAverageQuery[0].average_property_price;
      }
    }

    const scrappedTransaction = {
      average_property_price: 0,
    };

    const scrappedPropertyTransactionAverageQuery = await sqltrx`
      select avg(p.current_price) as average_property_price
      from properties as p
      where 
        p.current_price > 0 
      and
        p.current_price is distinct from 'NaN'::numeric and
        p.property_type_id = ${property_type_id} and
        p.listing_type_id = ${listing_type_id} and
        p.city_id = ${city_id} and
        p.floor_area between ${sqm} * 0.8 and ${sqm} * 1.2;
    `.execute();

    if (scrappedPropertyTransactionAverageQuery.length) {
      if (scrappedPropertyTransactionAverageQuery[0]?.average_property_price) {
        scrappedTransaction.average_property_price =
          scrappedPropertyTransactionAverageQuery[0].average_property_price;
      }
    }

    const condominiumRemainingUsefulLife =
      (CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS -
        (new Date().getFullYear() - year_built)) /
      CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS;

    const pricePerSqmInClosedTransaction =
      (closedTransaction.average_property_price * 0.6 +
        scrappedTransaction.average_property_price * 0.4) /
      sqm;

    const appraisalValueWithClosedTransaction =
      pricePerSqmInClosedTransaction * sqm * condominiumRemainingUsefulLife;

    const pricePerSqmInScrapedTransaction =
      scrappedTransaction.average_property_price / sqm;

    const appraisalValueWithoutClosedTransaction =
      pricePerSqmInScrapedTransaction * (sqm * condominiumRemainingUsefulLife);

    return {
      closedTransaction,
      scrappedTransaction,
      condominiumRemainingUsefulLife,
      appraisalValueWithClosedTransaction,
      appraisalValueWithoutClosedTransaction,
      phpFormat: {
        withClosedTransaction: {
          pricePerSqm: formatToPhp(pricePerSqmInClosedTransaction),
          appraisalValue: formatToPhp(appraisalValueWithClosedTransaction),
        },
        withoutClosedTransaction: {
          pricePerSqm: formatToPhp(pricePerSqmInScrapedTransaction),
          appraisalValue: formatToPhp(appraisalValueWithoutClosedTransaction),
        },
      },
      metadata: {
        sqm,
        year_built,
      },
    };
  });

  return new Response(
    JSON.stringify({
      closedTransaction,
      scrappedTransaction,
      condominiumRemainingUsefulLife,
      appraisalValueWithClosedTransaction,
      appraisalValueWithoutClosedTransaction,
      phpFormat,
      metadata,
    }),
  );
}
