import { useQuery } from "@tanstack/react-query";

type TotalPropertiesForRent = {
    count: string
}[]

const totalPropertiesForRentQuery = async () => {
    const response = await fetch("/api/cms/total-for-rent")

    return (await response.json()) as TotalPropertiesForRent

}

export const useGetTotalPropertiesForRent = () => {
    const {
        data: dataArray,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["total-for-rent"],
        queryFn: () => totalPropertiesForRentQuery()
    })

 const data = dataArray ? dataArray[0] : null;

    return {
data,
isLoading,
isError,
error
    }
}