import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useProduct } from "../../hooks/useProduct";
import { useCategories } from "../../hooks/useCategories";
import { useProductsMutations } from "../../hooks/mutations/useProductsMutations";

import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";

import { useCartStore } from "../../stores/cartStore";

type ProductDetailMessageProps = {
  eyebrow: string;
  title: string;
  message: string;
};

const ProductDetailMessage = ({
  eyebrow,
  title,
  message,
}: ProductDetailMessageProps) => {
  return (
    <div className="flex min-h-[55vh] items-center justify-center py-8">
      <section className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-[#eadfd8] sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#fcf8f5] text-2xl font-bold text-[#c73a0f]">
          !
        </span>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#87635a]">
          {eyebrow}
        </p>

        <h1 className="mt-3 text-2xl font-bold text-[#260f08]">
          {title}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#87635a]">
          {message}
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex rounded-full bg-[#c73a0f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73a0f]"
        >
          Volver al catálogo
        </Link>
      </section>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mantener el ID como string para admitir IDs numéricos y alfanuméricos
  const productId = id ?? "";

  // Estado del modal de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mutación DELETE
  const { deleteMutation } = useProductsMutations();

  // Acción del carrito
  const removeCartItem = useCartStore((state) => state.removeItem);

  // Consultar producto
  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(productId);

  // Consultar categorías
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  // Validar identificador
  if (!productId.trim()) {
    return (
      <ProductDetailMessage
        eyebrow="Producto"
        title="Identificador inválido"
        message="El identificador del producto no es válido. Regresa al catálogo para elegir un postre."
      />
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
      <ProductDetailMessage
        eyebrow="Producto no disponible"
        title={`No encontramos el producto ${productId}`}
        message="Este postre no existe o ya no está disponible. Puedes volver al catálogo y seguir explorando."
      />
    );
  }

  if (!product) {
    return (
      <ProductDetailMessage
        eyebrow="Producto no disponible"
        title={`No encontramos el producto ${productId}`}
        message="Este postre no existe o ya no está disponible. Puedes volver al catálogo y seguir explorando."
      />
    );
  }

  // Resolver el nombre de la categoría
  const categoryName = categories?.find(
    (category) => String(category.id) === String(product.categoryId),
  )?.name;

  // Abrir modal de eliminación
  const handleOpenDelete = () => {
    deleteMutation.reset();
    setIsDeleteModalOpen(true);
  };

  // Cerrar modal
  const handleCloseDelete = () => {
    if (deleteMutation.isPending) return;

    deleteMutation.reset();
    setIsDeleteModalOpen(false);
  };

  // Eliminar producto
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(product.id);

      // Retirar también el producto del carrito
      removeCartItem(product.id);

      // Regresar al catálogo
      navigate("/");
    } catch {
      // El error se mostrará dentro del modal
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      {/* Navegación y acciones */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold text-orange-800 transition-colors hover:text-orange-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
        >
          <span aria-hidden="true">←</span>
          Volver al catálogo
        </Link>

        <div className="flex flex-wrap gap-3">
          {/* Editar */}
          <Link
            to={`/admin/productos/${product.id}/editar`}
            className="inline-flex items-center justify-center rounded-xl bg-[#c73a0f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a82f0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73a0f]"
          >
            Editar producto
          </Link>

          {/* Eliminar */}
          <button
            type="button"
            onClick={handleOpenDelete}
            className="inline-flex items-center justify-center rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            Eliminar producto
          </button>
        </div>
      </div>

      {/* Información del producto */}
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

      {/* Modal de confirmación */}
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          productName={product.name}
          isPending={deleteMutation.isPending}
          errorMessage={
            deleteMutation.isError
              ? deleteMutation.error.message
              : undefined
          }
          onConfirm={() => void handleDelete()}
          onCancel={handleCloseDelete}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
