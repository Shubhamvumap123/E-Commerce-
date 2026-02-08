import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/product?search=${search}`);
  };

  return (
    <header className="border-b border-gray-200 py-3 px-4 md:px-8 flex justify-between items-center sticky top-0 bg-white z-50 shadow-sm">
      <Link to="/product" className="flex items-center gap-2">
        {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" /> */}
        <span className="font-bold text-xl text-blue-600">Zoffl</span>
      </Link>

      <form onSubmit={handleSearch} className="hidden md:flex items-center border rounded-full px-4 py-2 w-1/3 bg-gray-50 focus-within:ring-2 ring-blue-100 transition">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          className="outline-none text-sm w-full bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-6 text-gray-700">
        <Link to="/product" className="hidden sm:block hover:text-blue-600 transition">Shop</Link>

        <Link to="/wishlist" className="relative hover:text-red-500 transition">
          <Heart size={24} />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative hover:text-blue-600 transition">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        <Link to="/login" className="hover:text-blue-600 transition">
          <User size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
