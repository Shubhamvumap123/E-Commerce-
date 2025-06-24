import React from 'react';
import { Star, Heart, Search, ShoppingCart } from 'lucide-react';

// Inline Sidebar component defined here to avoid file not found error
const SidebarFilters = () => {
  return (
    <aside className="hidden md:block">
      <div className="border rounded p-4 space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>Nike <span className="text-gray-400">123</span></li>
            <li>Adidas <span className="text-gray-400">123</span></li>
            <li>Apple <span className="text-gray-400">123</span></li>
            <li>Puma <span className="text-gray-400">123</span></li>
          </ul>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-semibold mb-2">Price</h3>
          <div className="h-16 bg-gray-100 rounded" /> {/* Placeholder for price chart */}
          <div className="flex justify-between text-xs mt-1">
            <span>28,000 INR</span>
            <span>29,000 INR</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-semibold mb-2">Rating</h3>
          {[5, 4, 3].map((stars) => (
            <div key={stars} className="flex items-center gap-1 text-sm text-amber-500">
              {[...Array(stars)].map((_, i) => (
                <Star key={i} size={14} fill="#F59E0B" />
              ))}
              <span className="text-gray-600 ml-2">& up</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
export default SidebarFilters;