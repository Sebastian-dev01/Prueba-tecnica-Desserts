import { useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/header/Header";
import ProductSkeleton from "../../components/ProductSkeletons/ProductSkeleton";

import { useProducts } from "../../hooks/useProducts";
import { useDebounce } from "../../hooks/useDebounce";

import type { Dessert } from "../../types/dessert.types";
import type { CartItem } from "../../types/cart.types";

type HomePageProps = {
  cartItems: CartItem[];
  onAdd: (dessert: Dessert) => void;
  onIncrease: (dessert: Dessert) => void;
  onDecrease: (dessert: Dessert) => void;
};

const HomePage = ({
  cartItems,
  onAdd,
  onIncrease,
  onDecrease,
}: HomePageProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const debouncedSearch = useDebounce(search, 200);

  const {
    data: desserts,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProducts(debouncedSearch, category);

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
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-12 w-full rounded-xl border border-[#eadfd8] bg-[#fcf8f6] px-4 text-base text-[#260f08] outline-none transition-colors focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20 sm:w-64"
        >
          <option value="">Todas las categorías</option>
          <option value="Waffle">Waffle</option>
          <option value="Crème Brûlée">Crème Brûlée</option>
          <option value="Macaron">Macaron</option>
          <option value="Tiramisu">Tiramisu</option>
          <option value="Baklava">Baklava</option>
          <option value="Pie">Pie</option>
          <option value="Cake">Cake</option>
          <option value="Brownie">Brownie</option>
          <option value="Panna Cotta">Panna Cotta</option>
        </select>
      </div>

      {/* Updating indicator */}
      {isFetching && !isLoading && (
        <p className="text-sm text-stone-500" role="status">
          Actualizando productos...
        </p>
      )}

      {/* Initial loading */}
      {isFetching ? (
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
        /* Error */
        <p role="alert">
          Error al cargar los productos: {error.message}
        </p>
      ) : !desserts || desserts.length === 0 ? (
        /* Empty state */
        <p className="text-stone-500">
          No encontramos productos con esos filtros.
        </p>
      ) : (
        /* Product catalog */
        <section
          aria-label="Dessert products"
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3"
        >
          {desserts.map((dessert) => {
            const quantity =
              cartItems.find(
                (item) => item.dessert.id === dessert.id,
              )?.quantity ?? 0;

            return (
              <ProductCard
                key={dessert.id}
                dessert={dessert}
                quantity={quantity}
                onAdd={onAdd}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            );
          })}
        </section>
      )}
    </div>
  );
};

export default HomePage;
