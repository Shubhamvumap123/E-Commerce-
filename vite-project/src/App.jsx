// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<ProductList />} /> */}
        <Route path="/product" element={<ProductList  />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;