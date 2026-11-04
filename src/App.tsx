import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ConfirmOrderModal from "./components/ConfirmOrderModal/ConfirmOrderModal";

import type { Dessert } from "./types/dessert.types";
import type { CartItem } from "./types/cart.types";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleAdd = (dessert: Dessert) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.dessert.id === dessert.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.dessert.id === dessert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { dessert, quantity: 1 }];
    });
  };

  const updateQuantity = (dessert: Dessert, change: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.dessert.id === dessert.id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleIncrease = (dessert: Dessert) =>
    updateQuantity(dessert, 1);

  const handleDecrease = (dessert: Dessert) =>
    updateQuantity(dessert, -1);

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;

    setIsOrderConfirmed(true);
  };

  const handleStartNewOrder = () => {
    setCartItems([]);
    setIsOrderConfirmed(false);
  };

  return (
    <div className="app-container">
      <Routes>
        <Route
          element={
            <MainLayout
              cartItems={cartItems}
              onConfirm={handleConfirmOrder}
            />
          }
        >
          {/* Catálogo */}
          <Route
            index
            element={
              <HomePage
                cartItems={cartItems}
                onAdd={handleAdd}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            }
          />

          {/* Detalle del producto */}
          <Route
            path="producto/:id"
            element={<ProductDetailPage />}
          />

          {/* Página 404 */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>

      {isOrderConfirmed && (
        <ConfirmOrderModal
          items={cartItems}
          onStartNewOrder={handleStartNewOrder}
        />
      )}
    </div>
  );
}

export default App;
