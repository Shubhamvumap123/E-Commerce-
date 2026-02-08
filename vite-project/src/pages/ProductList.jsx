import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SidebarFilters from "./SidebarFilter";
import { Filter, Star, Heart, ShoppingCart } from "lucide-react";

const PRODUCTS_PER_PAGE = 8;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories")
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    // Search
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    // Category
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    // Price
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    // Rating
    const matchesRating = selectedRating ? (product.rating?.rate || 0) >= selectedRating : true;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return (b.rating?.count || 0) - (a.rating?.count || 0); // Popularity based on count
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading products...</div>;

  return (
    <div className="font-inter bg-gray-50 text-[#1E1E1E] min-h-screen pb-12">

      {/* Banner / Hero Section replacement if needed, or just breadcrumbs */}
      <div className="bg-white border-b mb-6 py-4 px-4 md:px-8">
         <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
            <Link to="/product" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Products</span>
            {searchTerm && <span className="ml-2 font-medium text-gray-800">Results for "{searchTerm}"</span>}
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6">

        <SidebarFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => { setSelectedCategory(cat); setPage(1); }}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedRating={selectedRating}
          setSelectedRating={(rate) => { setSelectedRating(rate); setPage(1); }}
        />

        <section className="flex-1">
          {/* Top Bar: Sort & Mobile Filter Toggle */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Showing {paginatedProducts.length} of {filteredProducts.length} products</p>

            <div className="flex items-center gap-4">
              <div className="md:hidden">
                  {/* Mobile filter button could go here - for now Sidebar is hidden on mobile */}
                  <button className="flex items-center gap-2 border px-3 py-1.5 rounded-lg bg-white text-sm">
                      <Filter size={16} /> Filter
                  </button>
              </div>

              <select
                className="border px-3 py-1.5 text-sm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="popular">Sort by: Popular</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 relative group hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image & Wishlist Button */}
                  <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-50 p-4">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <button
                      className={`absolute top-2 right-2 rounded-full p-2 shadow-sm transition-all duration-200 ${
                        isInWishlist(product.id)
                          ? "bg-red-50 text-red-500"
                          : "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
                      }`}
                      onClick={() => toggleWishlist(product)}
                    >
                      <Heart
                        size={18}
                        fill={isInWishlist(product.id) ? "currentColor" : "none"}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{product.category}</p>
                    <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 leading-tight mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                            {product.title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-amber-400">
                             {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < Math.round(product.rating?.rate || 0) ? "currentColor" : "none"}
                                    stroke="currentColor"
                                />
                             ))}
                        </div>
                        <span className="text-xs text-gray-400">({product.rating?.count})</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                            title="Add to Cart"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-800">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                <button
                    onClick={() => {
                        setSelectedCategory(null);
                        setPriceRange([0, 1000]);
                        setSelectedRating(null);
                        setSearchParams({});
                    }}
                    className="mt-4 text-blue-600 font-medium hover:underline"
                >
                    Clear all filters
                </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                className="border px-3 py-1 rounded bg-white hover:bg-gray-50 disabled:opacity-50 transition"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx + 1}
                  className={`px-3 py-1 rounded border ${
                    page === idx + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50 border-gray-200"
                  } transition`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="border px-3 py-1 rounded bg-white hover:bg-gray-50 disabled:opacity-50 transition"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductList;
