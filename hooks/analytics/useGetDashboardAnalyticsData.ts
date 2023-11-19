import { useQuery } from "@tanstack/react-query"

type TotalCount = {
    count: string
}[]

type DashboardAnalyticsData = {
    totalPropertiesScraped: string,
    totalPropertiesSold: string,
    totalPropertiesForRent: string,
    totalPropertiesForSale: string
}

const totalPropertiesForRentQuery = async () => {
    const response = await fetch("/api/cms/total-for-rent")
    return (await response.json()) as TotalCount
}

const totalPropertiesForSaleQuery = async () => {
    const response = await fetch("/api/cms/total-for-sale")
    return (await response.json()) as TotalCount
}

const totalScrapedApiQuery = async () => {
    const response = await fetch("/api/cms/total-scraped")

    return (await response.json()) as TotalCount
}

const totalSoldPropertiesQuery = async () => {
    const response = await fetch("/api/cms/total-sold")

    return (await response.json()) as TotalCount

}

export const useGetDashboardAnalyticsDataQuery =  () => {
 const {
        data: rentDataArray,
        isLoading: isRentLoading,
        isError: isRentError,
    } = useQuery({
        queryKey: ["total-for-rent"],
        queryFn: () => totalPropertiesForRentQuery()
    })

    const {
        data: saleDataArray,
        isLoading: isSaleLoading,
        isError: isSaleError,
    } = useQuery({
        queryKey: ["total-for-sale"],
        queryFn: () => totalPropertiesForSaleQuery()
    })

        const {
        data: scrapedDataArray,
        isLoading: isScrapedDataLoading,
        isError: isScrapedDataError,
    } = useQuery({
        queryKey: ["total-scraped"],
        queryFn: () => totalScrapedApiQuery()
    })

           const {
        data: soldDataArray,
        isLoading: isSoldDataLoading,
        isError: isSoldDataError,
    } = useQuery({
        queryKey: ["total-properties-sold"],
        queryFn: () => totalSoldPropertiesQuery()
    })

    const rentData = rentDataArray ? rentDataArray[0] : null;
    const saleData = saleDataArray ? saleDataArray[0] : null;
    const scrapedPropertiesData = scrapedDataArray ? scrapedDataArray[0] : null;
    const soldPropertiesData = soldDataArray ? soldDataArray[0] : null;

    const data: DashboardAnalyticsData = {
        totalPropertiesScraped: scrapedPropertiesData?.count || "N/A",
        totalPropertiesSold: soldPropertiesData?.count || "N/A",
        totalPropertiesForRent: rentData?.count || "N/A",
        totalPropertiesForSale: saleData?.count || "N/A"
    }

    const isLoading = isRentLoading || isSaleLoading || isScrapedDataLoading || isSoldDataLoading

    const isError = isRentError || isSaleError || isScrapedDataError || isSoldDataError

    return {
        data,
        isLoading,
        isError
    }
}

