import { useQuery } from "@tanstack/react-query";

import { getProductById } from "../services/productService";
import { queryKeys } from "./queryKeys";

export const useProduct = (id: string | number) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),

    queryFn: () => getProductById(id),

    enabled:typeof id === "string"
              ? id.trim().length > 0
              : Number.isInteger(id) && id > 0
  });
};
