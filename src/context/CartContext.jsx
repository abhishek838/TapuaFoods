import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'tapua_cart';
const COUPON_STORAGE_KEY = 'tapua_coupon';

// Valid promo codes for testing
const PROMO_CODES = {
  'TAPUA10': { discountPercent: 10, description: '10% OFF on all orders' },
  'WELCOME50': { discountFlat: 50, description: '₹50 OFF on your order' },
  'FREESHIP': { freeShipping: true, description: 'Free Express Shipping' }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync coupon', e);
    }
  }, [appliedCoupon]);

  // Add Item to Cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // Remove Item from Cart
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Update Item Quantity
  const updateQuantity = (productId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Set absolute quantity
  const setItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Apply Promo Coupon
  const applyCoupon = (code) => {
    const cleanCode = code.toUpperCase().trim();
    if (PROMO_CODES[cleanCode]) {
      setAppliedCoupon({
        code: cleanCode,
        ...PROMO_CODES[cleanCode]
      });
      return { success: true, message: `Coupon ${cleanCode} applied successfully!` };
    }
    return { success: false, message: 'Invalid coupon code. Try TAPUA10 or WELCOME50.' };
  };

  // Remove Coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Computed Totals
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Free shipping above ₹499
  const baseShippingFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 49;
  const shippingFee = appliedCoupon?.freeShipping ? 0 : baseShippingFee;

  let discountAmount = 0;
  if (appliedCoupon?.discountPercent) {
    discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
  } else if (appliedCoupon?.discountFlat) {
    discountAmount = Math.min(cartSubtotal, appliedCoupon.discountFlat);
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, 499 - cartSubtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        cartTotal,
        shippingFee,
        discountAmount,
        appliedCoupon,
        amountNeededForFreeShipping,
        addToCart,
        removeFromCart,
        updateQuantity,
        setItemQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
