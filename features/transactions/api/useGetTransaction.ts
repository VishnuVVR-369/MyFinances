import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTransaction = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const res = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const { data } = await res.json();
      return data;
    },
  });
};
