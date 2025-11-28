import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SET_ANIMATION: 'SET_ANIMATION',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          animateCart: true
        };
      } else {
        // If item doesn't exist, add it with quantity 1
        return {
          ...state,
          items: [...state.items, { ...product, quantity: 1 }],
          animateCart: true
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const { productId } = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        // If quantity > 1, decrease quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
      } else {
        // If quantity = 1, remove item completely
        return {
          ...state,
          items: state.items.filter(item => item.id !== productId)
        };
      }
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CART_ACTIONS.SET_ANIMATION:
      return {
        ...state,
        animateCart: action.payload
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || []
      };
    
    default:
      return state;
  }
}

// LocalStorage key
const CART_STORAGE_KEY = 'untdf_cart';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

// Initial state
const initialState = {
  items: loadCartFromStorage(),
  animateCart: false
};

// Cart Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);
  
  // Helper functions
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product } });
  };
  
  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { productId } });
  };
  
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };
  
  const setCartAnimation = (shouldAnimate) => {
    dispatch({ type: CART_ACTIONS.SET_ANIMATION, payload: shouldAnimate });
  };
  
  // Calculate total items
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Get item quantity by product id
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  
  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    animateCart: state.animateCart,
    setCartAnimation
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;