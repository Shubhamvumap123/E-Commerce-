// src/pages/ProductGrid.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarFilters from "./SidebarFilter";
import { Link } from "react-router-dom";

const PRODUCTS_PER_PAGE = 8;

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => setProducts(res.data));
  }, []);

  // Filtered by search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return (b.rating?.count || 0) - (a.rating?.count || 0);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const RectangleBar = () => (
    <div
      className="hidden md:block w-full mx-auto"
      style={{
        maxWidth: "1440px",
        height: "301px",
        backgroundColor: "#D9D9D9",
        marginTop: "0.5rem",
        marginBottom: "1.5rem",
        borderRadius: "0.75rem",
        position: "relative",
        top: "0",
      }}
    ></div>
  );

  const toggleWishlist = (id) => {
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((wid) => wid !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (!products.length) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="font-inter bg-white text-[#1E1E1E] min-h-screen">
      <header className="border-b border-gray-200 py-3 px-4 md:px-8 flex justify-between items-center sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <div className="hidden md:flex items-center border rounded px-3 py-1 w-72 bg-gray-50">
            <span className="text-gray-500 mr-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </span>
            <input
              type="text"
              placeholder="Search Here..."
              className="outline-none text-sm w-full bg-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <span className="hidden sm:inline">Zoffl</span>
          <span className="hidden sm:inline">Become a Seller</span>
          <span className="hidden sm:inline">More</span>
          <span className="hidden sm:inline">Cart</span>
          
        </div>
      </header>

      <RectangleBar />

      <nav className="text-xs md:text-sm text-gray-500 px-4 md:px-8 py-2">
        Home <span className="mx-1">›</span> Clothes
      </nav>

      <main className="px-2 md:px-8 flex flex-row md:flex-row gap-1 md:gap-2">
        <aside className="hidden md:block w-64">
          <SidebarFilters />
        </aside>

        <section className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <div className="flex gap-2">
              <button className="p-2 border rounded bg-white hover:bg-gray-100 transition">
                <img src="/mi_filter.svg" alt="Filter" className="w-5 h-5" />
              </button>
              <button className="p-2 border rounded bg-white hover:bg-gray-100 transition">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h5v5H4V4zm7 0h5v5h-5V4zM4 11h5v5H4v-5zm7 0h5v5h-5v-5z" /></svg>
              </button>
            </div>
            <select
              className="border px-2 py-1 text-sm rounded bg-white focus:outline-blue-400"
              value={sort}
              onChange={(e) => {
                setSort(
                  e.target.value === "Price Low to High"
                    ? "low"
                    : e.target.value === "Price High to Low"
                    ? "high"
                    : "popular"
                );
                setPage(1);
              }}
            >
              <option>Sort by: Popular</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl p-3 relative hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-contain rounded-lg"
                    />
                  </Link>
                  <button
                    className={`absolute top-2 right-2 rounded-full p-1 shadow transition ${
                      wishlist.includes(product.id)
                        ? "bg-red-100"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <svg
                      className={wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"}
                      width="16"
                      height="16"
                      fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.09C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                    </svg>
                  </button>
                </div>
                <h3 className="font-semibold mt-3 text-base truncate">{product.title}</h3>
                <p className="text-xs text-gray-500 leading-snug line-clamp-2 mb-1">
                  {product.description}
                </p>
                <p className="font-bold text-black-600 text-base mt-auto">₹{product.price}</p>
                <div className="flex items-center gap-1 text-xs mt-1">
  {Array.from({ length: 5 }).map((_, i) => (
    <svg
      key={i}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill={i < Math.round(product.rating?.rate || 4.5) ? "#F59E0B" : "none"}
      stroke="#F59E0B"
      strokeWidth="1.5"
    >
      <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.8,11.2 15,17 9.9,14.1 4.8,17 6,11.2 1.6,7.3 7.5,6.6 " />
    </svg>
  ))}
  <span className="text-gray-500 ml-1">({product.rating?.count || 100})</span>
</div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 text-sm">
            <button
              className="border px-2 py-1 rounded bg-white hover:bg-gray-100 transition"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx + 1}
                className={`border px-3 py-1 rounded ${
                  page === idx + 1 ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
                } transition`}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="border px-2 py-1 rounded bg-white hover:bg-gray-100 transition"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductGrid;
