import CartEmpty from "./CartEmpty";
import CartItemCard from "./CartItemCard";

import { useCartStore } from "../../stores/cartStore";

type CartDrawerProps = {
  onConfirm: () => void;
};

const CartDrawer = ({ onConfirm }: CartDrawerProps) => {
  // Consultamos el estado global
  const items = useCartStore((state) => state.cartItems);
  const removeItem = useCartStore((state) => state.removeItem);

  const isEmpty = items.length === 0;

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cartTotal = items.reduce(
    (total, item) => total + item.dessert.price * item.quantity,
    0,
  );

  return (
    <aside className="h-fit w-full rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-[#c73a0f]">
        Your Cart ({totalItems})
      </h2>

      {isEmpty ? (
        <CartEmpty />
      ) : (
        <>
          <div>
            {items.map((item) => (
              <CartItemCard
                key={item.dessert.id}
                item={item}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="flex items-center justify-between py-6">
            <span className="text-sm text-[#260f08]">
              Order Total
            </span>

            <strong className="text-2xl font-bold text-[#260f08] tabular-nums">
              ${cartTotal.toFixed(2)}
            </strong>
          </div>

          <div className="mb-5 flex items-center justify-center gap-2 rounded-lg bg-[#fcf8f5] px-3 py-4 text-center text-sm text-[#260f08]">
            <img
              src="assets/images/icons/icon-carbon-neutral.svg"
              alt=""
            />

            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-[#c73a0f] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#952c0c]"
            onClick={onConfirm}
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
};

export default CartDrawer;
