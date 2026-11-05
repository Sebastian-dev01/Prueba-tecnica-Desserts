import { Link, useSearchParams } from "react-router-dom";

import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/header/Header";
import ProductSkeleton from "../../components/ProductSkeletons/ProductSkeleton";

import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useDebounce } from "../../hooks/useDebounce";
import { useCartStore } from "../../stores/cartStore";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const categoryId = searchParams.get("category") ?? "";
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const debouncedSearch = useDebounce(search, 200);

  // Estado global del carrito
  const cartItems = useCartStore((state) => state.cartItems);

  // Consultar categorías
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  // Consultar productos con filtros y paginación
  const {
    data: desserts,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useProducts(
    debouncedSearch,
    categoryId ? Number(categoryId) : undefined,
    page,
  );

  // Productos de la página actual
  const products = desserts?.data ?? [];

  // Buscar productos y regresar a la primera página
  const handleSearch = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }

    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });
  };

  // Filtrar por categoría y regresar a la primera página
  const handleCategory = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set("category", value);
    } else {
      nextParams.delete("category");
    }

    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });
  };

  // Cambiar página
  const handlePreviousPage = () => {
    if (desserts?.prev && !isFetching) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(page - 1));
      setSearchParams(nextParams, { replace: true });
    }
  };

  const handleNextPage = () => {
    if (desserts?.next && !isFetching) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(page + 1));
      setSearchParams(nextParams, { replace: true });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Header />

        {/* Acceso a administración */}
        <Link
          to="/admin/productos/nuevo"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#c73a0f] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#a82f0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73a0f] sm:w-auto"
        >
          <span aria-hidden="true">+</span>
          Crear producto
        </Link>
      </div>

      {/* Búsqueda y filtros */}
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#eadfd8] sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="dessert-search">
          Buscar postres
        </label>

        <input
          id="dessert-search"
          type="search"
          placeholder="Buscar postres..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          className="h-12 min-w-0 flex-1 rounded-xl border border-[#eadfd8] bg-[#fcf8f6] px-4 text-base text-[#260f08] outline-none placeholder:text-[#87635a] transition-colors focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20"
        />

        <label className="sr-only" htmlFor="dessert-category">
          Filtrar por categoría
        </label>

        <select
          id="dessert-category"
          value={categoryId}
          onChange={(event) => handleCategory(event.target.value)}
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

      {/* Error de categorías */}
      {isCategoriesError && (
        <p role="alert" className="text-sm text-red-600">
          No se pudieron cargar las categorías.
        </p>
      )}

      {/* Indicador de actualización */}
      {isFetching && !isLoading && (
        <p className="text-sm text-stone-500" role="status">
          Actualizando productos...
        </p>
      )}

      {/* Estados de productos */}
      {isLoading ? (
        <section
          aria-label="Cargando productos"
          aria-busy="true"
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </section>
      ) : isError ? (
        <p role="alert">
          Error al cargar los productos: {error.message}
        </p>
      ) : products.length === 0 ? (
        <p className="text-stone-500">
          No encontramos productos con esos filtros.
        </p>
      ) : (
        <>
          {/* Listado de productos */}
          <section
            aria-label="Productos"
            className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3"
          >
            {products.map((dessert) => {
              // Obtener cantidad del producto en el carrito
              const quantity =
                cartItems.find(
                  (item) => item.dessert.id === dessert.id,
                )?.quantity ?? 0;

              // Resolver categoría normalizando identificadores
              const categoryName =
                categories?.find(
                  (category) =>
                    String(category.id) === String(dessert.categoryId),
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

          {/* Paginación */}
          {desserts && desserts.pages > 1 && (
            <nav
              aria-label="Paginación de productos"
              className="flex flex-wrap items-center justify-center gap-4 py-4"
            >
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={!desserts.prev || isFetching}
                className="rounded-xl border border-[#eadfd8] px-5 py-3 text-sm font-semibold text-[#260f08] transition-colors hover:bg-[#fcf8f6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Anterior
              </button>

              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-sm font-bold text-[#260f08]">
                  {isPlaceholderData
                    ? "Cargando página..."
                    : `Página ${page} de ${desserts.pages}`}
                </span>

                <span className="text-xs text-[#87635a]">
                  {desserts.items} productos en total
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={!desserts.next || isFetching}
                className="rounded-xl border border-[#eadfd8] px-5 py-3 text-sm font-semibold text-[#260f08] transition-colors hover:bg-[#fcf8f6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente →
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
