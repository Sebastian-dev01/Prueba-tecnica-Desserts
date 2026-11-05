import axios from "axios";
import type { Dessert } from "../types/dessert.types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

type ProductFilters = {
  search?: string;
  category?: string;
}

export const getProducts = async (
  filters: ProductFilters = {},
): Promise<Dessert[]> => {
  const response = await api.get<Dessert[]>("/products", {
    params: {
      "name:contains": filters.search || undefined,
      category: filters.category || undefined,
    },
  });

  return response.data;
};

export const getProductById = async (
  id: number,
): Promise<Dessert> => {
  const response = await api.get<Dessert>(`/products/${id}`);

  return response.data;
};

export default api
