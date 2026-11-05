import { useQuery } from "@tanstack/react-query";

import { getProductById } from "../services/productService";
import { queryKeys } from "./queryKeys";

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),

    queryFn: () => getProductById(id),

    enabled: Number.isInteger(id) && id > 0,
  });
};
