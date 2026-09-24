"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("pion_cart");
        if (saved) {
            try { setItems(JSON.parse(saved)); } catch { }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pion_cart", JSON.stringify(items));
    }, [items]);

    const addItem = (id) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === id);
            if (existing) {
                return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
            }
            return [...prev, { id, qty: 1 }];
        });
        setIsOpen(true);
    };

    const removeItem = (id) => setItems((p) => p.filter((i) => i.id !== id));

    const updateQty = (id, qty) =>
        setItems((p) =>
            p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        );

    const clear = () => setItems([]);

    const count = items.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQty,
                clear,
                count,
                isOpen,
                setIsOpen,
                checkoutOpen,
                setCheckoutOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);