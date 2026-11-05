import { useParams, Link } from "react-router-dom";

import { useProduct } from "../../hooks/useProduct";
import { useCategories } from "../../hooks/useCategories";

const ProductDetailPage = () => {
  const { id } = useParams();

  const productId = Number(id);

  // Consultar producto
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(productId);

  // Consultar categorías
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  if (!Number.isInteger(productId) || productId <= 0) {
    return (
      <p className="rounded-xl bg-white p-6 text-sm text-stone-600 shadow-sm">
        Identificador de producto inválido.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2">
        <div className="aspect-[4/3] animate-pulse rounded-2xl bg-stone-200" />
        <div className="flex flex-col justify-center gap-5">
          <div className="h-4 w-28 animate-pulse rounded bg-stone-200" />
          <div className="h-12 w-4/5 animate-pulse rounded bg-stone-200" />
          <div className="h-8 w-28 animate-pulse rounded bg-stone-200" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-xl bg-red-50 p-6 text-sm text-red-700" role="alert">
        Error: {error.message}
      </p>
    );
  }

  if (!product) {
    return (
      <p className="rounded-xl bg-white p-6 text-sm text-stone-600 shadow-sm">
        Producto no encontrado.
      </p>
    );
  }

  // Resolver el nombre de la categoría
  const categoryName = categories?.find(
    (category) => category.id === product.categoryId,
  )?.name;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold text-orange-800 transition-colors hover:text-orange-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
      >
        <span aria-hidden="true">←</span>
        Volver al catálogo
      </Link>

      <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd8]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="bg-[#fcf8f5] p-4 sm:p-6 lg:p-8">
            <picture>
              <source
                media="(max-width: 480px)"
                srcSet={product.image.mobile}
              />
              <source
                media="(max-width: 1024px)"
                srcSet={product.image.tablet}
              />
              <img
                src={product.image.desktop}
                alt={product.name}
                draggable={false}
                className="pointer-events-none aspect-[4/3] w-full select-none rounded-2xl object-cover"
              />
            </picture>
          </div>

          <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87635a]">
                {isCategoriesLoading
                  ? "Cargando categoría..."
                  : isCategoriesError
                    ? "Categoría no disponible"
                    : categoryName ?? "Sin categoría"}
              </p>

              <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#260f08] sm:text-4xl">
                {product.name}
              </h1>

              <p className="text-2xl font-bold text-[#c73a0f]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="border-t border-[#eadfd8] pt-5">
              <p className="text-sm leading-6 text-[#87635a]">
                Disfruta de este postre preparado con ingredientes seleccionados.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductDetailPage;
