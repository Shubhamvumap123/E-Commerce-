// src/pages/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-96 object-contain rounded-lg border"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              Category: {product.category}
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-6">
          <span className="text-3xl font-extrabold text-blue-600">₹{product.price}</span>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;