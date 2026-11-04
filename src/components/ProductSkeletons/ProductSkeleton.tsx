const ProductSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-4 animate-pulse"
      aria-hidden="true"
    >
      {/* Product image */}
      <div className="aspect-square w-full rounded-xl bg-stone-200" />

      {/* Product information */}
      <div className="flex flex-col gap-2">
        {/* Category */}
        <div className="h-4 w-1/3 rounded bg-stone-200" />

        {/* Product name */}
        <div className="h-5 w-2/3 rounded bg-stone-200" />

        {/* Price */}
        <div className="h-5 w-1/4 rounded bg-stone-200" />
      </div>

      {/* Add to cart button */}
      <div className="h-11 w-full rounded-full bg-stone-200" />
    </div>
  );
};

export default ProductSkeleton;
