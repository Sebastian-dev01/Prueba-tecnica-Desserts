import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ConfirmOrderModal from "./components/ConfirmOrderModal/ConfirmOrderModal";

import { useCartStore } from "./stores/cartStore";

import type { CartItem } from "./types/cart.types";

function App() {
  const clearCart = useCartStore((state) => state.clearCart);

  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CartItem[]>([]);

  const handleConfirmOrder = () => {
    const currentItems = useCartStore.getState().cartItems;

    if (currentItems.length === 0) return;

    setConfirmedOrder([...currentItems]);
    setIsOrderConfirmed(true);
  };

  const handleStartNewOrder = () => {
    clearCart();
    setConfirmedOrder([]);
    setIsOrderConfirmed(false);
  };

  return (
    <div className="app-container">
      <Routes>
        <Route
          element={<MainLayout onConfirm={handleConfirmOrder} />}
        >
          <Route index element={<HomePage />} />

          <Route
            path="producto/:id"
            element={<ProductDetailPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {isOrderConfirmed && (
        <ConfirmOrderModal
          items={confirmedOrder}
          onStartNewOrder={handleStartNewOrder}
        />
      )}
    </div>
  );
}

export default App;
