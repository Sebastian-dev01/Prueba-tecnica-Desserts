import { Link, useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/ProductForm/ProductForm";
import { useProduct } from "../../hooks/useProduct";
import { useCategories } from "../../hooks/useCategories";
import { useProductsMutations } from "../../hooks/mutations/useProductsMutations";

import type { DessertFormValues } from "../../schemas/dessertSchema";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Conservar el identificador original
  const productId = id ?? "";

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useProduct(productId);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  const { updateMutation } = useProductsMutations();

  const handleUpdate = async (values: DessertFormValues) => {
    await updateMutation.mutateAsync({
      id: productId,
      product: values,
    });

    navigate(`/producto/${productId}`);
  };

  if (!productId.trim()) {
    return <p>Identificador de producto inválido.</p>;
  }

  if (isProductLoading || isCategoriesLoading) {
    return <p>Cargando información del producto...</p>;
  }

  if (isProductError) {
    return (
      <p role="alert">
        No se pudo cargar el producto: {productError.message}
      </p>
    );
  }

  if (isCategoriesError || !categories) {
    return <p role="alert">No se pudieron cargar las categorías.</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  const defaultValues: DessertFormValues = {
    name: product.name,
    categoryId: product.categoryId,
    price: product.price,
    image: {
      desktop: product.image.desktop,
      tablet: product.image.tablet,
      mobile: product.image.mobile,
      thumbnail: product.image.thumbnail,
    },
  };

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Link
        to={`/producto/${productId}`}
        className="text-sm font-semibold text-[#c73a0f] hover:underline"
      >
        ← Volver al producto
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-[#260f08]">
          Editar producto
        </h1>

        <p className="mt-2 text-sm text-[#87635a]">
          Modifica la información de {product.name}.
        </p>
      </div>

      <ProductForm
        categories={categories}
        defaultValues={defaultValues}
        onSubmit={handleUpdate}
        submitLabel="Guardar cambios"
        isPending={updateMutation.isPending}
      />

      {updateMutation.isError && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          No se pudo actualizar el producto: {updateMutation.error.message}
        </p>
      )}
    </main>
  );
};

export default EditProductPage;
