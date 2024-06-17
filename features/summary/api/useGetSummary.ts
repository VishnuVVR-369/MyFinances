import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromPaisa } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    // TODO: Check if params are needed in the key
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch summary");
      }
      const { data } = await res.json();
      return {
        ...data,
        incomeAmount: convertAmountFromPaisa(data.incomeAmount),
        expensesAmount: convertAmountFromPaisa(data.expensesAmount),
        remainingAmount: convertAmountFromPaisa(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromPaisa(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromPaisa(day.income),
          expenses: convertAmountFromPaisa(day.expenses),
        })),
      };
    },
  });
  return query;
};
