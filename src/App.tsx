import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout/MainLayout";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import EditProductPage from "./pages/EditProductPage/EditProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// Components
import ConfirmOrderModal from "./components/ConfirmOrderModal/ConfirmOrderModal";

// Store
import { useCartStore } from "./stores/cartStore";

// Types
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
          {/* Tienda */}
          <Route index element={<HomePage />} />

          <Route
            path="producto/:id"
            element={<ProductDetailPage />}
          />

          {/* Administración de productos */}
          <Route
            path="admin/productos/nuevo"
            element={<CreateProductPage />}
          />

          <Route
            path="admin/productos/:id/editar"
            element={<EditProductPage />}
          />

          {/* Ruta no encontrada */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* Confirmación de compra */}
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
