import React, { createContext, useContext, useReducer } from 'react';

const ShopContext = createContext();

const initialState = {
  cart: [],
  products: [
    { id: 1, name: 'African Print Dress', price: 59.99, image: '/placeholder.svg?height=300&width=300', category: 'clothing' },
    { id: 2, name: 'Handmade Basket', price: 29.99, image: '/placeholder.svg?height=300&width=300', category: 'home' },
    { id: 3, name: 'Beaded Necklace', price: 39.99, image: '/placeholder.svg?height=300&width=300', category: 'jewelry' },
    { id: 4, name: 'Wooden Sculpture', price: 89.99, image: '/placeholder.svg?height=300&width=300', category: 'art' },
    { id: 5, name: 'Kente Cloth', price: 79.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles' },
    { id: 6, name: 'Djembe Drum', price: 129.99, image: '/placeholder.svg?height=300&width=300', category: 'music' },
  ],
  searchTerm: '',
  category: 'all',
};

function shopReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}