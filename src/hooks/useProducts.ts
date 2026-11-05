import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/productService";
import { queryKeys } from "./queryKeys";

export const useProducts = (
  search: string = "",
  categoryId?: number,
) => {
  return useQuery({
    queryKey: queryKeys.products.list({ search, categoryId }),

    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      return getProducts({
        search,
        categoryId,
      });
    },

    placeholderData: (previousData) => previousData,
  });
};
