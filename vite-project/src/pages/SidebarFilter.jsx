import { Star } from 'lucide-react';
import React from 'react';
import ReactSlider from 'react-slider';

export default function SidebarFilter({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
}) {
  return (
    <aside className="hidden md:block w-64">
      <div className="border rounded-lg p-6 space-y-8 bg-white shadow-sm sticky top-24">
        
        {/* Category Filter */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3 uppercase text-xs tracking-wider">Category</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <button
                className={`w-full text-left transition-colors hover:text-blue-600 ${!selectedCategory ? 'font-bold text-blue-600' : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`w-full text-left capitalize transition-colors hover:text-blue-600 ${selectedCategory === cat ? 'font-bold text-blue-600' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-wider">Price Range</h3>

          <ReactSlider
            className="w-full flex items-center h-1 bg-gray-200 rounded-full"
            thumbClassName="bg-white w-4 h-4 rounded-full cursor-pointer border-2 border-blue-600 -mt-1.5 focus:outline-none shadow-sm hover:scale-110 transition-transform"
            trackClassName="bg-blue-600 h-1 rounded-full"
            min={0}
            max={1000}
            value={priceRange}
            onChange={setPriceRange}
            pearling
            minDistance={10}
            renderTrack={(props, state) => {
               // Only color the track between the thumbs
               const index = state.index;
               let className = props.className;
               if (index === 1) {
                   className = "bg-blue-600 h-1 rounded-full";
               } else {
                   className = "bg-gray-200 h-1 rounded-full";
               }
               return <div {...props} className={className} />;
            }}
          />

          <div className="flex justify-between text-xs mt-4 text-gray-500 font-medium">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3 uppercase text-xs tracking-wider">Rating</h3>
          <div className="space-y-1">
          {[4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              className={`flex items-center gap-2 text-sm w-full py-1.5 px-2 rounded transition-colors ${selectedRating === stars ? 'bg-blue-50 ring-1 ring-blue-100' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < stars ? "#F59E0B" : "none"}
                    stroke={i < stars ? "#F59E0B" : "#D1D5DB"} // Gray-300 for empty stars
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-xs">& Up</span>
            </button>
          ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
