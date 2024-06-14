import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategory = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const res = await client.api.categories[":id"].$get({
        param: { id },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const { data } = await res.json();
      return data;
    },
  });
};
