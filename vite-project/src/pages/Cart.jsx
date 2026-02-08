import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/product"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg truncate pr-4">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x">{item.quantity}</span>
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 p-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-500">₹{item.price} each</p>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-500 text-sm hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:w-80 h-fit bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2 font-bold text-lg flex justify-between">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => alert("Checkout functionality coming soon!")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
