import SidebarFilters from "./SidebarFilter";
import { Star, Heart, Search, ShoppingCart } from 'lucide-react';
const ProductListingPage = () => {
  const products = new Array(8).fill({
    title: 'TDX Sinkers',
    price: '₹ 675.00',
    description: 'Your perfect pack for everyday use and walks in the forest...',
    rating: 4.5,
    reviews: 121,
    image: 'https://via.placeholder.com/200x200',
  });

return (
    <div className="font-inter bg-white text-[#1E1E1E] min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-200 py-3 px-4 md:px-8 flex justify-between items-center sticky top-0 bg-white z-10 shadow-sm">
            <div className="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
                <div className="hidden md:flex items-center border rounded px-3 py-1 w-72 bg-gray-50">
                    <Search size={18} className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search Here..."
                        className="outline-none text-sm w-full bg-transparent"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-700">
                <span className="hidden sm:inline">Zoffl</span>
                <span className="hidden sm:inline">Become a Seller</span>
                <span className="hidden sm:inline">More</span>
                <ShoppingCart size={20} />
            </div>
        </header>

        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-gray-500 px-4 md:px-8 py-2">
            Home <span className="mx-1">›</span> Clothes
        </nav>

        <main className="px-2 md:px-8 flex flex-row md:flex-row gap-1   md:gap-2">
            {/* Sidebar Filters (inline) */}
            <aside className="hidden md:block">
                <SidebarFilters />
            </aside>

            {/* Product Grid */}
            <section className="w-full">
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                    <div className="flex gap-2">
                        <button className="p-2 border rounded bg-white hover:bg-gray-100 transition">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3h14v2H3V3zm0 6h14v2H3V9zm0 6h14v2H3v-2z" /></svg>
                        </button>
                        <button className="p-2 border rounded bg-white hover:bg-gray-100 transition">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h5v5H4V4zm7 0h5v5h-5V4zM4 11h5v5H4v-5zm7 0h5v5h-5v-5z" /></svg>
                        </button>
                    </div>
                    <select className="border px-2 py-1 text-sm rounded bg-white focus:outline-blue-400">
                        <option>Sort by: Popular</option>
                        <option>Price Low to High</option>
                        <option>Price High to Low</option>
                    </select>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl p-3 relative hover:shadow-lg transition-shadow flex flex-col"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition">
                                    <Heart className="text-gray-400" size={16} />
                                </button>
                            </div>
                            <h3 className="font-semibold mt-3 text-base truncate">{product.title}</h3>
                            <p className="text-xs text-gray-500 leading-snug line-clamp-2 mb-1">
                                {product.description}
                            </p>
                            <p className="font-bold text-blue-600 text-base mt-auto">{product.price}</p>
                            <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="#F59E0B" />
                                ))}
                                <span className="text-gray-500 ml-1">({product.reviews})</span>
                            </div>
                            <button className="mt-3 bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-8 text-sm">
                    <button className="border px-2 py-1 rounded bg-white hover:bg-gray-100 transition">&lt;</button>
                    {[1, 2, 3].map((num) => (
                        <button
                            key={num}
                            className={`border px-3 py-1 rounded ${num === 2 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'} transition`}
                        >
                            {num}
                        </button>
                    ))}
                    <button className="border px-2 py-1 rounded bg-white hover:bg-gray-100 transition">&gt;</button>
                </div>
            </section>
        </main>
    </div>
);
};

export default ProductListingPage;