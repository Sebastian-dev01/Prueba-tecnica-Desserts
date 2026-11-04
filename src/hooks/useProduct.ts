import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
};
