import { useQuery } from "@tanstack/react-query";

type TotalSoldProperties= {
    count: string
}[]

const totalSoldPropertiesQuery = async () => {
    const response = await fetch("/api/cms/total-sold")

    return (await response.json()) as TotalSoldProperties

}

export const useGetTotalSoldProperties = () => {
    const {
        data: dataArray,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["total-sold"],
        queryFn: () => totalSoldPropertiesQuery()
    })

 const data = dataArray ? dataArray[0] : null;

    return {
data,
isLoading,
isError,
error
    }
}