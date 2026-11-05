import axios from "axios";

import type { Dessert } from "../types/dessert.types";
import type { Category } from "../types/category.types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Filtros y parámetros de paginación
export type ProductFilters = {
  search?: string;
  categoryId?: number;
  page?: number;
  perPage?: number;
};

// Cantidad de productos por página
export const PRODUCTS_PER_PAGE = 8;

// Respuesta paginada de json-server v1
export type PaginatedProductsResponse = {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number;
  items: number;
  data: Dessert[];
};

// Obtener productos con búsqueda, categoría y paginación
export const getProducts = async (
  filters: ProductFilters = {},
): Promise<PaginatedProductsResponse> => {
  const response = await api.get<PaginatedProductsResponse>("/products", {
    params: {
      "name:contains": filters.search || undefined,
      categoryId: filters.categoryId ?? undefined,
      _page: filters.page ?? 1,
      _per_page: filters.perPage ?? PRODUCTS_PER_PAGE,
    },
  });

  return response.data;
};

// Obtener un producto por ID
export const getProductById = async (
  id: string | number,
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
  id: string | number,
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
  id: string | number,
  product: Omit<Dessert, "id">,
): Promise<Dessert> => {
  const response = await api.put<Dessert>(`/products/${id}`, product);

  return response.data;
};

// Eliminar producto
export const deleteProduct = async (
  id: string | number,
): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export default api;
