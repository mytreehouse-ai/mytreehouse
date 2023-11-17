import { useQuery } from "@tanstack/react-query";

type TotalPropertiesForSale = {
    count: string
}[]

const totalPropertiesForSaleQuery = async () => {
    const response = await fetch("/api/cms/total-for-sale")

    return (await response.json()) as TotalPropertiesForSale

}

export const useGetTotalPropertiesForSale = () => {
    const {
        data: dataArray,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["total-for-sale"],
        queryFn: () => totalPropertiesForSaleQuery()
    })

 const data = dataArray ? dataArray[0] : null;

    return {
data,
isLoading,
isError,
error
    }
}