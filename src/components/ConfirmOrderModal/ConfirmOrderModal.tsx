import type { CartItem } from '../../types/cart.types'

type ConfirmOrderModalProps = {
  items: CartItem[]
  onStartNewOrder: () => void
}

const ConfirmOrderModal = ({
  items,
  onStartNewOrder,
}: ConfirmOrderModalProps) => {

  const orderTotal = items.reduce(
    (total, item) => total + item.quantity * item.dessert.price,
    0,
  )

  return (
    <dialog
      open
      aria-labelledby="order-title"
      aria-modal="true"
      className="fixed inset-0 m-auto max-h-[90vh] w-[min(100%-2rem,32rem)] overflow-y-auto rounded-xl border-0 bg-white p-6 shadow-2xl backdrop:bg-black/50 sm:p-8"
    >
      {/* Header */}
      <header className="mb-7">
        <div className="flex size-12 items-center justify-center rounded-full   text-2xl font-medium text-[#1ea779">
          <img
            src="/assets/images/icons/icon-order-confirmed.svg"
            alt=""
            aria-hidden={true}
            className='size-10'
          />
        </div>

        <h2
          id="order-title"
          className="text-3xl font-bold tracking-tight text-[#260f08] sm:text-4xl"
        >
          Order Confirmed
        </h2>

        <p className="mt-2 text-sm text-[#87635a]">
          We hope you enjoy your food!
        </p>
      </header>

      {/* Products */}
      <div className="rounded-xl bg-[#fcf8f5] px-4 sm:px-5">

        <div className="divide-y divide-[#f0e5df]">
          {items.map((item) => {
            const subtotal = item.dessert.price * item.quantity

            return (
              <article
                key={item.dessert.id}
                className="flex items-center gap-4 py-4 first:pt-5"
              >
                <img
                  src={item.dessert.image.thumbnail}
                  alt={item.dessert.name}
                  className="size-12 shrink-0 rounded-md object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-[#260f08]">
                    {item.dessert.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-3 text-sm">
                    <span className="font-semibold text-[#c73a0f]">
                      {item.quantity}x
                    </span>

                    <span className="text-[#87635a]">
                      @ ${item.dessert.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <strong className="shrink-0 text-sm font-semibold text-[#260f08] tabular-nums">
                  ${subtotal.toFixed(2)}
                </strong>
              </article>
            )
          })}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-[#f0e5df] py-5">
          <span className="text-sm text-[#260f08]">
            Order Total
          </span>

          <strong className="text-2xl font-bold text-[#260f08] tabular-nums">
            ${orderTotal.toFixed(2)}
          </strong>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={onStartNewOrder}
        className="mt-6 w-full rounded-full bg-[#c73a0f] px-5 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c73a0f]"
      >
        Start New Order
      </button>
    </dialog>
  )
}

export default ConfirmOrderModal
