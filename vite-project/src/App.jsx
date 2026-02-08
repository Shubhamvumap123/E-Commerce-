import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
