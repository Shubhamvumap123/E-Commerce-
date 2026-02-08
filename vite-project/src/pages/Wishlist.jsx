import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
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
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl p-4 relative hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="relative">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-contain rounded-lg mb-4"
                />
              </Link>
              <button
                className="absolute top-0 right-0 p-2 bg-white rounded-full shadow hover:bg-gray-100 text-red-500"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <h3 className="font-semibold text-base truncate mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{item.description}</p>
            <p className="font-bold text-lg mb-3">₹{item.price}</p>

            <button
              className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              onClick={() => {
                addToCart(item);
                removeFromWishlist(item.id);
              }}
            >
              <ShoppingCart size={16} />
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
