import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ProductForm from "../../components/ProductForm/ProductForm";
import { useCategories } from "../../hooks/useCategories";
import { useProductsMutations } from "../../hooks/mutations/useProductsMutations";

import type { DessertFormValues } from "../../schemas/dessertSchema";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading,
    isError,
  } = useCategories();

  const { createMutation } = useProductsMutations();

  // Crear producto
  const handleCreate = async (values: DessertFormValues) => {
    try {
      const createdProduct = await createMutation.mutateAsync(values);

      toast.success("Producto creado correctamente");

      navigate(`/producto/${createdProduct.id}`);
    } catch (error) {
      console.error("Error al crear producto:", error);

      toast.error("No se pudo crear el producto");
    }
  };

  if (isLoading) {
    return <p>Cargando categorías...</p>;
  }

  if (isError || !categories) {
    return (
      <p role="alert">
        No se pudieron cargar las categorías.
      </p>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Link
        to="/admin/productos"
        className="text-sm font-semibold text-[#c73a0f] hover:underline"
      >
        ← Volver a productos
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
    </main>
  );
};

export default CreateProductPage;
