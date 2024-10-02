import React from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Cart = () => {
  const { state, dispatch } = useShop();

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    } else {
      removeFromCart(id);
    }
  };

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>
      {state.cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {state.cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="mx-2 text-gray-700">{item.quantity}</span>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  className="ml-4 text-gray-400 hover:text-gray-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
          <div className="mt-8">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-purple-600 text-white py-3 px-4 rounded-md"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;