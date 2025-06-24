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
    <div className="p-4 max-w-3xl mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-96 object-contain mb-4" />
      <h1 className="text-xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold">Category: {product.category}</p>
      <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
    </div>
  );
};

export default ProductDetail;