import axios from "axios";

import type { Dessert } from "../types/dessert.types";
import type { Category } from "../types/category.types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export type ProductFilters = {
  search?: string;
  categoryId?: number;
};

// Obtener productos
export const getProducts = async (
  filters: ProductFilters = {},
): Promise<Dessert[]> => {
  const response = await api.get<Dessert[]>("/products", {
    params: {
      "name:contains": filters.search || undefined,
      categoryId: filters.categoryId ?? undefined,
    },
  });

  return response.data;
};

// Obtener un producto por ID
export const getProductById = async (
  id: number,
): Promise<Dessert> => {
  const response = await api.get<Dessert>(`/products/${id}`);

  return response.data;
};

// Obtener todas las categorías
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");

  return response.data;
};

// Obtener una categoría por ID
export const getCategoryById = async (
  id: number,
): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);

  return response.data;
};

// Crear producto
export const createProduct = async (
  product: Omit<Dessert, "id">,
): Promise<Dessert> => {
  const response = await api.post<Dessert>("/products", product);

  return response.data;
};

// Actualizar producto
export const updateProduct = async (
  id: number,
  product: Omit<Dessert, "id">,
): Promise<Dessert> => {
  const response = await api.put<Dessert>(`/products/${id}`, product);

  return response.data;
};

// Eliminar producto
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export default api;
