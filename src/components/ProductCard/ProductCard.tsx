import type { Dessert } from "../../types/dessert.types";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import { Link } from "react-router-dom";

type ProductCardProps = {
  dessert: Dessert;
  quantity: number;
  onAdd: (dessert: Dessert) => void;
  onIncrease: (dessert: Dessert) => void;
  onDecrease: (dessert: Dessert) => void;
};

const ProductCard = ({
  dessert,
  quantity,
  onAdd,
  onDecrease,
  onIncrease,
}: ProductCardProps) => {
  return (
    <article className="group flex flex-col gap-4">
      <div className="relative">
        <Link
          to={`/producto/${dessert.id}`}
          aria-label={`Ver detalles de ${dessert.name}`}
          className="block"
        >
          <picture>
            <source
              media="(max-width:480px)"
              srcSet={dessert.image.mobile}
            />

            <source
              media="(max-width:768px)"
              srcSet={dessert.image.tablet}
            />

            <img
              src={dessert.image.desktop}
              alt={dessert.name}
              draggable={false}
              className="pointer-events-none w-full select-none rounded-xl border border-transparent object-cover transition-colors duration-200 group-hover:border-[#c73a0f]"
            />
          </picture>
        </Link>

        <div className="absolute -bottom-5 left-1/2 w-44 -translate-x-1/2">
          {quantity > 0 ? (
            <QuantityStepper
              quantity={quantity}
              onIncrease={() => onIncrease(dessert)}
              onDecrease={() => onDecrease(dessert)}
            />
          ) : (
            <button
              type="button"
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#ad8a82] bg-white px-5 text-sm font-semibold text-[#260f08] shadow-sm transition-colors hover:border-[#c73a0f] hover:text-[#c73a0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73a0f]"
              onClick={() => onAdd(dessert)}
            >
              <img
                src="assets/images/icons/icon-add-to-cart.svg"
                className="size-4.7"
                alt=""
              />
              Add to cart
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-5">
        <span className="text-sm text-[#87635a]">
          {dessert.category}
        </span>

        <Link
          to={`/producto/${dessert.id}`}
          className="w-fit"
        >
          <h2
            draggable={false}
            className="select-none text-base font-semibold text-[#260f08] transition-colors group-hover:text-[#c73a0f]"
          >
            {dessert.name}
          </h2>
        </Link>

        <span className="text-base font-bold text-[#c73a0f]">
          ${dessert.price.toFixed(2)}
        </span>
      </div>
    </article>
  );
};

export default ProductCard;
