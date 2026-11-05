import { z } from "zod";

export const dessertSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo"),

  categoryId: z
    .number()
    .int("Selecciona una categoría válida")
    .positive("Selecciona una categoría"),

  price: z
    .number()
    .positive("El precio debe ser mayor que cero"),

  image: z.object({
    desktop: z.string().min(1, "La imagen desktop es obligatoria"),
    tablet: z.string().min(1, "La imagen tablet es obligatoria"),
    mobile: z.string().min(1, "La imagen mobile es obligatoria"),
    thumbnail: z.string().min(1, "La miniatura es obligatoria"),
  }),
});

export type DessertFormValues = z.infer<typeof dessertSchema>;
