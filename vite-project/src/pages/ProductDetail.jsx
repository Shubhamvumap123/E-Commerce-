import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500); // Simple feedback
    // Could also use a toast notification here
    alert("Added to cart!");
  };

  if (!product) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Link to="/product" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={20} className="mr-2" /> Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700 font-medium">
              <span className="mr-1">{product.rating?.rate}</span>
              <Star size={16} fill="currentColor" stroke="none" />
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">{product.rating?.count} reviews</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="mt-auto border-t pt-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div>
                 <p className="text-sm text-gray-500 mb-1">Price</p>
                 <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isAdding
                    ? "bg-green-600 text-white scale-95"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                <ShoppingCart size={24} />
                {isAdding ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
