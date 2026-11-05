import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  dessertSchema,
  type DessertFormValues,
} from "../../schemas/dessertSchema";

import type { Category } from "../../types/category.types";

// Valores iniciales para crear un producto
const EMPTY_VALUES: DessertFormValues = {
  name: "",
  categoryId: 0,
  price: 0,
  image: {
    desktop: "",
    tablet: "",
    mobile: "",
    thumbnail: "",
  },
};

type ProductFormProps = {
  categories: Category[];
  defaultValues?: DessertFormValues;
  onSubmit: (values: DessertFormValues) => void | Promise<void>;
  submitLabel: string;
  isPending?: boolean;
};

const ProductForm = ({
  categories,
  defaultValues,
  onSubmit,
  submitLabel,
  isPending = false,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DessertFormValues>({
    resolver: zodResolver(dessertSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });

  const disabled = isPending || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd8]"
    >
      {/* Nombre */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-[#260f08]">
          Nombre del producto
        </label>

        <input
          id="name"
          type="text"
          placeholder="Ej. Chocolate Cake"
          {...register("name")}
          className="h-11 rounded-xl border border-[#eadfd8] px-3 outline-none focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20"
        />

        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="categoryId"
          className="text-sm font-semibold text-[#260f08]"
        >
          Categoría
        </label>

        <select
          id="categoryId"
          {...register("categoryId", { valueAsNumber: true })}
          className="h-11 rounded-xl border border-[#eadfd8] bg-white px-3 outline-none focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20"
        >
          <option value="">Selecciona una categoría</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="text-sm text-red-600">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* Precio */}
      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="text-sm font-semibold text-[#260f08]">
          Precio
        </label>

        <input
          id="price"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="15.50"
          {...register("price", { valueAsNumber: true })}
          className="h-11 rounded-xl border border-[#eadfd8] px-3 outline-none focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20"
        />

        {errors.price && (
          <p className="text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      {/* Imágenes */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-3 text-base font-bold text-[#260f08]">
          Imágenes del producto
        </legend>

        {(
          [
            ["desktop", "Imagen desktop"],
            ["tablet", "Imagen tablet"],
            ["mobile", "Imagen mobile"],
            ["thumbnail", "Miniatura"],
          ] as const
        ).map(([field, label]) => (
          <div key={field} className="flex flex-col gap-2">
            <label
              htmlFor={`image.${field}`}
              className="text-sm font-semibold text-[#260f08]"
            >
              {label}
            </label>

            <input
              id={`image.${field}`}
              type="text"
              placeholder={`Ruta o URL de imagen ${field}`}
              {...register(`image.${field}`)}
              className="h-11 rounded-xl border border-[#eadfd8] px-3 outline-none focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/20"
            />

            {errors.image?.[field] && (
              <p className="text-sm text-red-600">
                {errors.image[field]?.message}
              </p>
            )}
          </div>
        ))}
      </fieldset>

      {/* Enviar */}
      <button
        type="submit"
        disabled={disabled}
        className="h-12 rounded-full bg-[#c73a0f] px-6 font-semibold text-white transition-colors hover:bg-[#a82f0b] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending || isSubmitting ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;
