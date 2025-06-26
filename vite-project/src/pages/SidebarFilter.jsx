import { Star } from 'lucide-react';
import React, { useState } from 'react';
import ReactSlider from 'react-slider';

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState([20000, 40000]);

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

          <div className="relative h-16 flex items-end space-x-0.5">
            {[3, 5, 7, 9, 10, 9, 7, 5, 4,3].map((height, idx) => (
              <div
                key={idx}
                className="bg-blue-200"
                style={{ width: '8%', height: `${height * 10}%` }}
              />
            ))}
          </div>

        <ReactSlider
  className="w-40 mt-1 flex items-center" 
  thumbClassName="bg-white w-5 h-5 rounded-full cursor-pointer border border-blue-700 -mt-0.3" 
  thumbActiveClassName="shadow-lg"
  trackClassName="bg-blue-300 h-2"
  min={10000}
  max={50000}
  value={priceRange}
  onChange={setPriceRange}
  pearling
  minDistance={1000}
/>



          <div className="flex justify-between text-xs mt-4">
            <span>{priceRange[0]}INR</span>
            <span>{priceRange[1]}INR</span>
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
            </div>
          ))}
        </div>

      </div>
    </aside>
  );
}
