import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await client.api.accounts.$get();

      if (!res.ok) {
        throw new Error("Failed to fetch accounts");
      }
      const { data } = await res.json();
      return data;
    },
  });
};
