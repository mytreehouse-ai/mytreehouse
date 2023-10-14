interface TransactionDetail {
  forSale: number | string;
  forRent: number | string;
}

interface AppraisalValueDetail {
  withClosedTransaction: TransactionDetail;
  withoutClosedTransaction: TransactionDetail;
}

interface PriceDetail {
  pricePerSqm: string;
  appraisalValue: string;
}

interface PhpFormatDetail {
  withClosedTransaction: {
    forSale: PriceDetail;
    forRent: PriceDetail;
  };
  withoutClosedTransaction: {
    forSale: PriceDetail;
    forRent: PriceDetail;
  };
}

interface QueryDetail {
  propertyType: string;
  propertySize: number;
  yearBuilt: number;
  city: string;
}

export interface ValuationTransactionsData {
  closedTransaction: TransactionDetail;
  scrappedTransaction: TransactionDetail;
  appraisalValue: AppraisalValueDetail;
  phpFormat: PhpFormatDetail;
  query: QueryDetail;
}
