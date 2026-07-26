"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/constants/categories";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string | number, delta: number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add product or increment count
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => String(item.product.id) === String(product.id),
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Adjust quantity (+ / -) directly
  const updateQuantity = (productId: string | number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (String(item.product.id) === String(productId)) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  // Remove single item completely
  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => String(item.product.id) !== String(productId)),
    );
  };

  // Clear all items
  const clearCart = () => setCart([]);

  // Calculate totals
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
