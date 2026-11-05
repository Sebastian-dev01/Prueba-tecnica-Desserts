import { Link, useNavigate } from "react-router-dom";

import ProductForm from "../../components/ProductForm/ProductForm";
import { useCategories } from "../../hooks/useCategories";
import { useProductsMutations } from "../../hooks/mutations/useProductsMutations";

import type { DessertFormValues } from "../../schemas/dessertSchema";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading, isError } = useCategories();

  const { createMutation } = useProductsMutations();

  const handleCreate = async (values: DessertFormValues) => {
    const createdProduct = await createMutation.mutateAsync(values);

    navigate(`/producto/${createdProduct.id}`);
  };

  if (isLoading) {
    return <p>Cargando categorías...</p>;
  }

  if (isError || !categories) {
    return <p role="alert">No se pudieron cargar las categorías.</p>;
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Link
        to="/"
        className="text-sm font-semibold text-[#c73a0f] hover:underline"
      >
        ← Volver al catálogo
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-[#260f08]">
          Crear producto
        </h1>

        <p className="mt-2 text-sm text-[#87635a]">
          Registra un nuevo postre en la tienda.
        </p>
      </div>

      <ProductForm
        categories={categories}
        onSubmit={handleCreate}
        submitLabel="Crear producto"
        isPending={createMutation.isPending}
      />

      {createMutation.isError && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          No se pudo crear el producto: {createMutation.error.message}
        </p>
      )}
    </main>
  );
};

export default CreateProductPage;
