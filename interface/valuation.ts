export interface Valuation {
  closedTransaction: {
    forSale: number;
    forRent: number;
  };
  scrappedTransaction: {
    forSale: string;
    forRent: string;
  };
  appraisalValue: {
    condominiumRemainingUsefulLife: number;
    withClosedTransactionForSale: number;
    withoutClosedTransactionForSale: number;
    withClosedTransactionForRent: number;
    withoutClosedTransactionForRent: number;
  };
  phpFormat: {
    withClosedTransaction: {
      forSale: {
        pricePerSqm: string;
        appraisalValue: string;
      };
      forRent: {
        pricePerSqm: string;
        appraisalValue: string;
      };
    };
    withoutClosedTransaction: {
      forSale: {
        pricePerSqm: string;
        appraisalValue: string;
      };
      forRent: {
        pricePerSqm: string;
        appraisalValue: string;
      };
    };
  };
  metadata: {
    propertyType: string;
    propertySize: number;
    yearBuilt: number;
    city: string;
  };
}
