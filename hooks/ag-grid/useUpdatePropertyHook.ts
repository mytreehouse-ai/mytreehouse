import { useMutation } from "@tanstack/react-query"
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";


const UpdatePropertySchema = z.object({
slug: z.string().uuid(),
data: z.object({
property_type_id: z.string().optional(),
listing_type_id: z.string().optional(),
turnover_status_name: z.string().optional()
})
});

type UpdatePropertySchemaType = z.infer<typeof UpdatePropertySchema>

const updateProperty = async ({slug, data}:UpdatePropertySchemaType) => {
  const response = await fetch(`/api/properties/listing/update/${slug}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}


export const useUpdatePropertyHook = () => {

const mutationKey = ["properties"]

const queryClient = useQueryClient()

const mutation = useMutation({
    mutationKey,
    mutationFn: updateProperty,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["properties"]
        })

    }
})

return mutation

}
