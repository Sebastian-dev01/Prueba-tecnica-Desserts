import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/productService";

export const useProducts = (
  search: string = "",
  category: string = "",
) => {
  return useQuery({
    queryKey: ["products", {search, category}],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      return getProducts({ search, category })
    },
    placeholderData:(previusData)=>previusData,
  });
};
