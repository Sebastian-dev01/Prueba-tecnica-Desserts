import { useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/header/Header";
import ProductSkeleton from "../../components/ProductSkeletons/ProductSkeleton";

import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useDebounce } from "../../hooks/useDebounce";
import { useCartStore } from "../../stores/cartStore";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const debouncedSearch = useDebounce(search, 200);

  // Estado global del carrito
  const cartItems = useCartStore((state) => state.cartItems);

  // Consultar categorías
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  // Consultar productos
  const {
    data: desserts,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProducts(
    debouncedSearch,
    categoryId ? Number(categoryId) : undefined,
  );

  return (
    <div className="flex flex-col gap-8">
      <Header />

      {/* Search and filters */}
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#eadfd8] sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="dessert-search">
          Buscar postres
        </label>

        <input
          id="dessert-search"
          type="search"
          placeholder="Buscar postres..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-12 min-w-0 flex-1 rounded-xl border border-[#eadfd8] bg-[#fcf8f6] px-4 text-base text-[#260f08] outline-none placeholder:text-[#87635a] transition-colors focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20"
        />

        <label className="sr-only" htmlFor="dessert-category">
          Filtrar por categoría
        </label>

        <select
          id="dessert-category"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isCategoriesLoading || isCategoriesError}
          className="h-12 w-full rounded-xl border border-[#eadfd8] bg-[#fcf8f6] px-4 text-base text-[#260f08] outline-none transition-colors focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20 sm:w-64"
        >
          <option value="">Todas las categorías</option>

          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category error */}
      {isCategoriesError && (
        <p role="alert" className="text-sm text-red-600">
          No se pudieron cargar las categorías.
        </p>
      )}

      {/* Updating indicator */}
      {isFetching && !isLoading && (
        <p className="text-sm text-stone-500" role="status">
          Actualizando productos...
        </p>
      )}

      {/* Product states */}
      {isLoading ? (
        <section
          aria-label="Loading products"
          aria-busy="true"
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3"
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </section>
      ) : isError ? (
        <p role="alert">
          Error al cargar los productos: {error.message}
        </p>
      ) : !desserts || desserts.length === 0 ? (
        <p className="text-stone-500">
          No encontramos productos con esos filtros.
        </p>
      ) : (
        <section
          aria-label="Dessert products"
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3"
        >
          {desserts.map((dessert) => {
            const quantity =
              cartItems.find(
                (item) => item.dessert.id === dessert.id,
              )?.quantity ?? 0;

            // Relacionar el producto con su categoría
            const categoryName =
              categories?.find(
                (category) => category.id === dessert.categoryId,
              )?.name ?? "Sin categoría";

            return (
              <ProductCard
                key={dessert.id}
                dessert={dessert}
                quantity={quantity}
                categoryName={categoryName}
              />
            );
          })}
        </section>
      )}
    </div>
  );
};

export default HomePage;
