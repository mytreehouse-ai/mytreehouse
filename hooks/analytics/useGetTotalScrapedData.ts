import { useQuery } from "@tanstack/react-query";

type TotalScrapedData = {
    count: string
}[]

const totalScrapedApiQuery = async () => {
    const response = await fetch("/api/cms/total-scraped")

    return (await response.json()) as TotalScrapedData

}

export const useGetTotalScrapedData = () => {
    const {
        data: dataArray,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["total-scraped"],
        queryFn: () => totalScrapedApiQuery()
    })

 const data = dataArray ? dataArray[0] : null;

    return {
data,
isLoading,
isError,
error
    }
}