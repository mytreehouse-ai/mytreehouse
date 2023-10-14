import sql from "@/server/db";
import { formatToPhp } from "@/lib/utils";
import { fetchVercelEdgeConfig } from "@/lib/edge-config";

export async function GET() {
  const {
    CONDOMINIUM_PROPERTY_TYPE_ID,
    CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS,
    FOR_SALE_LISTING_TYPE_ID,
    FOR_RENT_LISTING_TYPE_ID,
    CLOSED_TRANSACTION_ID,
    SOLD_TRANSACTION_ID,
    UNTAGGED_TRANSACTION_ID,
  } = await fetchVercelEdgeConfig();

  const sqm = 234;
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
    const closedTransactionForSale = {
      average_property_price: 0,
    };

    const closedTransactionForSaleAverageQuery = await sqltrx`
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
        p.property_type_id = ${CONDOMINIUM_PROPERTY_TYPE_ID} and
        p.listing_type_id = ${FOR_SALE_LISTING_TYPE_ID} and
        p.city_id = ${city_id} and
        p.floor_area between ${sqm} * 0.8 and ${sqm} * 1.2;
    `.execute();

    if (closedTransactionForSaleAverageQuery.length) {
      if (closedTransactionForSaleAverageQuery[0]?.average_property_price) {
        closedTransactionForSale.average_property_price =
          closedTransactionForSaleAverageQuery[0].average_property_price;
      }
    }

    const scrappedTransactionForSale = {
      average_property_price: 0,
    };

    const scrappedPropertyTransactionForSaleAverageQuery = await sqltrx`
      select avg(p.current_price) as average_property_price
      from properties as p
      where 
        p.current_price > 0 
      and
        p.current_price is distinct from 'NaN'::numeric and
        p.property_type_id = ${CONDOMINIUM_PROPERTY_TYPE_ID} and
        p.listing_type_id = ${FOR_SALE_LISTING_TYPE_ID} and
        p.city_id = ${city_id} and
        p.floor_area between ${sqm} * 0.8 and ${sqm} * 1.2;
    `.execute();

    if (scrappedPropertyTransactionForSaleAverageQuery.length) {
      if (
        scrappedPropertyTransactionForSaleAverageQuery[0]
          ?.average_property_price
      ) {
        scrappedTransactionForSale.average_property_price =
          scrappedPropertyTransactionForSaleAverageQuery[0].average_property_price;
      }
    }

    const condominiumRemainingUsefulLife =
      (CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS -
        (new Date().getFullYear() - year_built)) /
      CONDOMINIUM_LIFE_SPAN_IN_NUMBER_YEARS;

    const pricePerSqmInClosedTransactionForSale =
      (closedTransactionForSale.average_property_price * 0.6 +
        scrappedTransactionForSale.average_property_price * 0.4) /
      sqm;

    const appraisalValueWithClosedTransactionForSale =
      pricePerSqmInClosedTransactionForSale *
      sqm *
      condominiumRemainingUsefulLife;

    const pricePerSqmInScrapedTransactionForSale =
      scrappedTransactionForSale.average_property_price / sqm;

    const appraisalValueWithoutClosedTransactionForSale =
      pricePerSqmInScrapedTransactionForSale *
      (sqm * condominiumRemainingUsefulLife);

    return {
      closedTransaction: closedTransactionForSale,
      scrappedTransaction: scrappedTransactionForSale,
      condominiumRemainingUsefulLife,
      appraisalValueWithClosedTransaction:
        appraisalValueWithClosedTransactionForSale,
      appraisalValueWithoutClosedTransaction:
        appraisalValueWithoutClosedTransactionForSale,
      phpFormat: {
        withClosedTransaction: {
          pricePerSqm: formatToPhp(pricePerSqmInClosedTransactionForSale),
          appraisalValue: formatToPhp(
            appraisalValueWithClosedTransactionForSale,
          ),
        },
        withoutClosedTransaction: {
          pricePerSqm: formatToPhp(pricePerSqmInScrapedTransactionForSale),
          appraisalValue: formatToPhp(
            appraisalValueWithoutClosedTransactionForSale,
          ),
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
