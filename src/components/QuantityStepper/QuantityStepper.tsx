type QuantityStepperProps = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

const QuantityStepper = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityStepperProps) => {
  return (
    <div className="flex h-11 w-full items-center justify-between rounded-full bg-[#c73a0f] px-5 text-sm font-semibold text-white shadow-sm">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-white text-base leading-none transition-colors hover:bg-white hover:text-[#c73a0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        -
      </button>

      <span className="min-w-6 text-center tabular-nums">{quantity}</span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-white text-base leading-none transition-colors hover:bg-white hover:text-[#c73a0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper
