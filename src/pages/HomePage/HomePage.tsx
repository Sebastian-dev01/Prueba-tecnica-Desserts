//import { useState } from 'react'
import ProductCard from "../../components/ProductCard/ProductCard";
import { desserts } from "../../data/desserts";
import type { Dessert } from "../../types/dessert.types";
import type { CartItem } from "../../types/cart.types";

type HomePageProps = {
  cartItems: CartItem[]
  onAdd: (dessert: Dessert) => void
  onIncrease: (dessert: Dessert) => void
  onDecrease: (dessert: Dessert) => void
}


const HomePage = ( {cartItems,onAdd,onIncrease,onDecrease}: HomePageProps) => {

  return (
    <div className="flex flex-col gap-8">

      <h1 className="text-4xl font-bold text-[#260f08]" draggable={false}>
        Desserts
      </h1>

      <section
        aria-label="Dessert products"
        className='grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3'>

        {desserts.map((dessert) => {
          const quantity =
            cartItems.find((item) => item.dessert.id === dessert.id)?.quantity ?? 0

          return (
            <ProductCard
              key={dessert.id}
              dessert={dessert}
              quantity={quantity}
              onAdd={onAdd}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          )
        })}
      </section>
    </div>
  )
}
export default HomePage
