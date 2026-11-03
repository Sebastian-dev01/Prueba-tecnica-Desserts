import MainLayout from "./layouts/MainLayout/MainLayout.tsx"
import HomePage from './pages/HomePage/HomePage'
import ConfirmOrderModal from './components/ConfirmOrderModal/ConfirmOrderModal.tsx'

import type { Dessert } from './types/dessert.types.ts'
import type { CartItem } from './types/cart.types'

import { useState } from 'react'

function App() {

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)

  const handleAdd = (dessert: Dessert) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.dessert.id === dessert.id,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.dessert.id === dessert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { dessert, quantity: 1 }]
    })
  }

  const updateQuantity = (dessert: Dessert, change: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.dessert.id === dessert.id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleIncrease = (dessert: Dessert) => updateQuantity(dessert, 1)

  const handleDecrease = (dessert: Dessert) => updateQuantity(dessert, -1)

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return

    setIsOrderConfirmed(true)
  }

  const handleStartNewOrder = () => {
    setCartItems([])
    setIsOrderConfirmed(false)
  }

  return (
    <div className='app-container'>
      <MainLayout
        cartItems={cartItems}
        onConfirm= {handleConfirmOrder}
      >
        <HomePage
          cartItems={cartItems}
          onAdd={handleAdd}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </MainLayout>

      {isOrderConfirmed && (
        <ConfirmOrderModal
          items={cartItems}
          onStartNewOrder={handleStartNewOrder}
        />
      )}
    </div>
  )
}

export default App
