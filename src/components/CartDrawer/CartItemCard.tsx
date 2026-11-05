
import type { CartItem } from '../../types/cart.types'

type CartItemCardProps = {
  item: CartItem
  onRemove: (id: number) => void
}

const CartItemCard = ({ item, onRemove }: CartItemCardProps) => {
  const subTotal = item.dessert.price * item.quantity

  return (
    <article className="flex items-center justify-between gap-4 border-b border-[#f0e5df] py-4">

      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="truncate text-sm font-semibold text-[#260f08]">
          {item.dessert.name}
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold text-[#c73a0f]">
            {item.quantity}x
          </span>

          <span className="text-[#87635a]">
            @ ${item.dessert.price.toFixed(2)}
          </span>

          <span className="font-semibold text-[#87635a]">
            ${subTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.dessert.id)}
        aria-label={`Remove ${item.dessert.name}`}
        className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#ad8985] text-[#ad8985] transition-colors hover:border-[#260f08] hover:text-[#260f08]"
      >
        <span className="text-xs font-semibold">×</span>
      </button>

    </article>
  )
}

export default CartItemCard
