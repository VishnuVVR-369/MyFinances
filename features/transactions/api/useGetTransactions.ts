import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
