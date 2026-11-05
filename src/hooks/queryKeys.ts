
type ProductListFilters = {
  search: string;
  categoryId?: number;
  page: number;
  perPage: number;
};

export const queryKeys = {
  products: {
    all: ["products"] as const,

    lists: () => [...queryKeys.products.all, "list"] as const,

    list: (filters: ProductListFilters) =>
      [...queryKeys.products.lists(), filters] as const,

    details: () => [...queryKeys.products.all, "detail"] as const,

    detail: (id: string | number) =>
      [...queryKeys.products.details(), id] as const,
  },

  categories: {
    all: ["categories"] as const,
  },
};
