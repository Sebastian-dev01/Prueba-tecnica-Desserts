import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

import type { Dessert } from "../../types/dessert.types";
import { queryKeys } from "../queryKeys";

type ProductInput = Omit<Dessert, "id">;
type ProductId = Dessert["id"];

export const useProductsMutations = () => {
  const queryClient = useQueryClient();

  // CREAR PRODUCTO
  const createMutation = useMutation({
    mutationFn: (product: ProductInput) => createProduct(product),

    onSuccess: (createdProduct) => {
      console.log("✅ CREATE SUCCESS:", createdProduct);

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });

      toast.success("Producto creado correctamente");
    },

    onError: (error) => {
      console.error("❌ CREATE ERROR:", error);

      toast.error("No se pudo crear el producto");
    },
  });

  // ACTUALIZAR PRODUCTO
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: ProductId;
      product: ProductInput;
    }) => updateProduct(id, product),

    onSuccess: (updatedProduct) => {
      console.log("✅ UPDATE SUCCESS:", updatedProduct);

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(updatedProduct.id),
      });

      toast.success("Producto actualizado correctamente");
    },

    onError: (error) => {
      console.error("❌ UPDATE ERROR:", error);

      toast.error("No se pudo actualizar el producto");
    },
  });

  // ELIMINAR PRODUCTO
  const deleteMutation = useMutation({
    mutationFn: (id: ProductId) => deleteProduct(id),

    onSuccess: (_, deletedId) => {
      console.log("✅ DELETE SUCCESS. ID:", deletedId);

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });

      queryClient.removeQueries({
        queryKey: queryKeys.products.detail(deletedId),
        exact: true,
      });

      toast.success("Producto eliminado correctamente");
    },

    onError: (error) => {
      console.error("❌ DELETE ERROR:", error);

      toast.error("No se pudo eliminar el producto");
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
