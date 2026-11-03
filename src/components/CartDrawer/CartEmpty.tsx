const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <img
        src="/assets/images/illustration-empty-cart.svg"
        alt=""
        aria-hidden="true"
        className="h-32 w-32"
      />

      <p className="text-sm font-semibold text-[#87635a]">
        Your added items will appear here.
      </p>
    </div>
  )
}

export default CartEmpty
