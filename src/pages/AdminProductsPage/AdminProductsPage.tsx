
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useProductsMutations } from "../../hooks/mutations/useProductsMutations";
import { useDebounce } from "../../hooks/useDebounce";

import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import ProductSkeleton from "../../components/ProductSkeletons/ProductSkeleton";

import type { Dessert } from "../../types/dessert.types";
import { useCartStore } from "../../stores/cartStore";

const AdminProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parámetros de búsqueda y paginación
  const search = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const pageParam = Number(searchParams.get("page"));

  const page =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const debouncedSearch = useDebounce(search, 200);

  // Consultar categorías
  const { data: categories } = useCategories();

  // Consultar productos
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProducts(
    debouncedSearch,
    categoryParam ? Number(categoryParam) : undefined,
    page,
  );

  // Mutación DELETE
  const { deleteMutation } = useProductsMutations();

  // Acción del carrito
  const removeCartItem = useCartStore(
    (state) => state.removeItem,
  );

  // Estado del modal
  const [selectedProduct, setSelectedProduct] =
    useState<Dessert | null>(null);

  const [deleteError, setDeleteError] =
    useState<string | null>(null);

  // Actualizar filtros en la URL
  const updateFilters = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    nextParams.delete("page");

    setSearchParams(nextParams, { replace: true });
  };

  // Cambiar página
  const handlePageChange = (nextPage: number) => {
    if (!products || isFetching) return;

    const hasPrevious = Boolean(products.prev);
    const hasNext = Boolean(products.next);

    if (
      (nextPage < page && hasPrevious) ||
      (nextPage > page && hasNext)
    ) {
      const nextParams = new URLSearchParams(searchParams);

      nextParams.set("page", String(nextPage));

      setSearchParams(nextParams, { replace: true });
    }
  };

  // Eliminar producto
  const handleDelete = async () => {
    if (!selectedProduct) return;

    setDeleteError(null);

    try {
      await deleteMutation.mutateAsync(selectedProduct.id);

      // Retirar producto del carrito
      removeCartItem(selectedProduct.id);

      // Mostrar notificación
      toast.success("Producto eliminado correctamente");

      // Cerrar modal
      setSelectedProduct(null);

      // Reiniciar estado de la mutación
      deleteMutation.reset();
    } catch (error) {
      console.error("Error al eliminar producto:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Error al eliminar el producto";

      setDeleteError(message);

      toast.error("No se pudo eliminar el producto");
    }
  };

  const productList = products?.data ?? [];

  return (
    <section className="flex flex-col gap-7">

      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#260f08]">
            Productos
          </h1>

          <p className="mt-2 text-sm text-[#87635a]">
            Administra los productos de tu tienda.
          </p>
        </div>

        <Link
          to="/admin/productos/nuevo"
          className="rounded-xl bg-[#c73a0f] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#a82f0b]"
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Resumen */}
      <div className="rounded-2xl border border-[#eadfd8] bg-white p-5">
        <p className="text-sm text-[#87635a]">
          Total de productos registrados
        </p>

        <p className="mt-1 text-3xl font-bold text-[#260f08]">
          {products?.items ?? "—"}
        </p>
      </div>

      {/* Búsqueda y filtros */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(event) =>
            updateFilters("search", event.target.value)
          }
          placeholder="Buscar producto..."
          className="h-12 flex-1 rounded-xl border border-[#eadfd8] bg-white px-4 outline-none focus:border-[#c73a0f]"
        />

        <select
          value={categoryParam}
          onChange={(event) =>
            updateFilters("category", event.target.value)
          }
          className="h-12 rounded-xl border border-[#eadfd8] bg-white px-4 sm:w-64"
        >
          <option value="">Todas las categorías</option>

          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div
          className="grid grid-cols-1 gap-3"
          aria-busy="true"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 p-5 text-red-700"
        >
          No se pudieron cargar los productos: {error.message}
        </div>
      )}

      {/* Tabla */}
      {!isLoading && !isError && (
        <>
          {isFetching && (
            <p role="status" className="text-sm text-[#87635a]">
              Actualizando productos...
            </p>
          )}

          {productList.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#eadfd8] bg-white p-10 text-center">
              <p className="font-semibold text-[#260f08]">
                No se encontraron productos
              </p>

              <p className="mt-2 text-sm text-[#87635a]">
                Prueba con otros filtros o registra un producto nuevo.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#eadfd8] bg-white">
              <table className="w-full min-w-[700px] text-left">
                <thead className="border-b border-[#eadfd8] bg-[#fcf8f5]">
                  <tr className="text-xs uppercase tracking-wide text-[#87635a]">
                    <th className="px-5 py-4">Producto</th>
                    <th className="px-5 py-4">Categoría</th>
                    <th className="px-5 py-4">Precio</th>
                    <th className="px-5 py-4 text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#eadfd8]">
                  {productList.map((product) => {
                    const categoryName = categories?.find(
                      (category) =>
                        String(category.id) ===
                        String(product.categoryId),
                    )?.name ?? "Sin categoría";

                    return (
                      <tr key={product.id}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image.thumbnail}
                              alt={product.name}
                              className="size-12 rounded-lg object-cover"
                            />

                            <div>
                              <p className="font-semibold text-[#260f08]">
                                {product.name}
                              </p>

                              <p className="text-xs text-[#87635a]">
                                ID: {product.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-[#87635a]">
                          {categoryName}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-[#260f08]">
                          ${product.price.toFixed(2)}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-3">
                            <Link
                              to={`/admin/productos/${product.id}/editar`}
                              className="rounded-lg border border-[#eadfd8] px-3 py-2 text-sm font-semibold text-[#260f08] hover:bg-[#fcf8f5]"
                            >
                              Editar
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                deleteMutation.reset();
                                setDeleteError(null);
                                setSelectedProduct(product);
                              }}
                              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Paginación */}
      {products && products.pages > 1 && (
        <div className="flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={!products.prev || isFetching}
            className="rounded-xl border border-[#eadfd8] px-4 py-2 text-sm font-semibold disabled:opacity-40"
          >
            ← Anterior
          </button>

          <span className="text-sm font-semibold text-[#260f08]">
            Página {page} de {products.pages}
          </span>

          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={!products.next || isFetching}
            className="rounded-xl border border-[#eadfd8] px-4 py-2 text-sm font-semibold disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {selectedProduct && (
        <ConfirmDeleteModal
          productName={selectedProduct.name}
          isPending={deleteMutation.isPending}
          errorMessage={deleteError ?? undefined}
          onConfirm={() => void handleDelete()}
          onCancel={() => {
            if (deleteMutation.isPending) return;

            setSelectedProduct(null);
            setDeleteError(null);
            deleteMutation.reset();
          }}
        />
      )}
    </section>
  );
};

export default AdminProductsPage;
