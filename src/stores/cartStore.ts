import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Dessert } from "../types/dessert.types";
import type { CartItem } from "../types/cart.types";

type CartState = {
  cartItems: CartItem[];

  addItem: (dessert: Dessert) => void;
  removeItem: (id: Dessert["id"]) => void;
  increaseQuantity: (id: Dessert["id"]) => void;
  decreaseQuantity: (id: Dessert["id"]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],

      addItem: (dessert) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.dessert.id === dessert.id,
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.dessert.id === dessert.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              { dessert, quantity: 1 },
            ],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.dessert.id !== id,
          ),
        }));
      },

      increaseQuantity: (id) => {
        set((state) => {
          const exists = state.cartItems.some(
            (item) => item.dessert.id === id,
          );

          if (!exists) return state;

          return {
            cartItems: state.cartItems.map((item) =>
              item.dessert.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        });
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.dessert.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "desserts-cart",
    },
  ),
);
