import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const emptyCart: Cart = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};

type CartStore = {
  cart: Cart;
  setCart: (cart: Cart) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: emptyCart,
  setCart: (cart: Cart) => set({ cart }),
}));

export const useCart = () => {
  const [storedValue, setStoredValue] = useLocalStorage<Cart>(
    "cart",
    emptyCart,
  );
  const { cart, setCart: setStoreCart } = useCartStore();
  const [_cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    setCart(storedValue);
  }, [storedValue]);

  useEffect(() => {
    if (_cart && JSON.stringify(cart) !== JSON.stringify(_cart)) {
      setStoreCart(_cart);
    }
  }, [_cart, cart, setStoreCart]);

  const syncCart = (newCart: Cart) => {
    setCart(newCart);
    setStoredValue(newCart);
    setStoreCart(newCart);
  };

  const addItem = (product: Product, variants: Variants) => {
    if (!_cart) return;

    const item = {
      product: product,
      quantity: 1,
      variants: variants,
    };

    if (
      _cart.items.some(
        (cartItem) => JSON.stringify(cartItem) === JSON.stringify(item),
      )
    )
      return;

    const newItems = [..._cart.items, { id: uuidv4(), ...item }];
    const totalPrice =
      newItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      ) - newItems.reduce((acc, item) => acc + item.product.discount, 0);
    const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);

    const newCart = { items: newItems, totalPrice, totalItems };
    syncCart(newCart);
  };

  const removeItem = (itemId: string) => {
    if (!_cart) return;

    const itemToRemove = _cart.items.find((cartItem) => cartItem.id === itemId);
    if (!itemToRemove) return;

    const newItems = _cart.items.filter((cartItem) => cartItem.id !== itemId);
    const totalPrice =
      newItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      ) - newItems.reduce((acc, item) => acc + item.product.discount, 0);
    const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);

    const newCart = { items: newItems, totalPrice, totalItems };
    syncCart(newCart);
  };

  const clearCart = () => {
    if (!_cart) return;

    syncCart(emptyCart);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (!_cart || quantity <= 0) return; // Ensure _cart is initialized and quantity is positive

    const itemIndex = _cart.items.findIndex(
      (cartItem) => cartItem.id === itemId,
    );
    if (itemIndex === -1) return;

    const updatedItem = { ..._cart.items[itemIndex], quantity };
    const newItems = [..._cart.items];
    newItems[itemIndex] = updatedItem;

    const totalPrice =
      newItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      ) - newItems.reduce((acc, item) => acc + item.product.discount, 0);
    const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);

    const newCart = { items: newItems, totalPrice, totalItems };
    syncCart(newCart);
  };

  if (_cart === null)
    return { cart: emptyCart, addItem, removeItem, clearCart, updateQuantity };

  return { cart: _cart, addItem, removeItem, clearCart, updateQuantity };
};
