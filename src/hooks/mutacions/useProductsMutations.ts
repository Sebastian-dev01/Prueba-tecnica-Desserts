import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

import type { Dessert } from "../../types/dessert.types";
import { queryKeys } from "../queryKeys";

type ProductInput = Omit<Dessert, "id">;

export const useProductsMutations = () => {
  const queryClient = useQueryClient();

  // Crear producto
  const createMutation = useMutation({
    mutationFn: (product: ProductInput) => createProduct(product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
  });

  // Actualizar producto
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: number;
      product: ProductInput;
    }) => updateProduct(id, product),

    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(updatedProduct.id),
      });
    },
  });

  // Eliminar producto
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),

    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });

      queryClient.removeQueries({
        queryKey: queryKeys.products.detail(deletedId),
      });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
