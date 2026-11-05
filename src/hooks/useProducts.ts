import { useQuery } from "@tanstack/react-query";

import {
  getProducts,
  PRODUCTS_PER_PAGE,
} from "../services/productService";

import { queryKeys } from "./queryKeys";

export const useProducts = (
  search: string = "",
  categoryId?: number,
  page: number = 1,
) => {
  return useQuery({
    queryKey: queryKeys.products.list({
      search,
      categoryId,
      page,
      perPage: PRODUCTS_PER_PAGE,
    }),

    queryFn: async () => {
      // Delay artificial de 1.2 segundos
      await new Promise((resolve) => setTimeout(resolve, 1200));

      return getProducts({
        search,
        categoryId,
        page,
        perPage: PRODUCTS_PER_PAGE,
      });
    },

    // Mantener temporalmente los datos anteriores al cambiar de página
    placeholderData: (previousData) => previousData,
  });
};
