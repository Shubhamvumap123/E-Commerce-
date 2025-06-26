import { Star } from 'lucide-react';
import React, { useState } from 'react';
import ReactSlider from 'react-slider';

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState([29000, 29000]);

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
          
          {/* Price histogram bars (mock-up as per image) */}
          <div className="relative h-16 flex items-end space-x-1">
            {[3, 5, 7, 9, 10, 9, 7, 5, 4].map((height, idx) => (
              <div
                key={idx}
                className="bg-blue-200"
                style={{ width: '8%', height: `${height * 10}%` }}
              />
            ))}
          </div>

          {/* Price Range Slider */}
          <ReactSlider
            className="w-full mt-2"
            thumbClassName="bg-blue-500 w-4 h-4 rounded-full cursor-pointer"
            trackClassName="bg-blue-300 h-1"
            min={29000}
            max={29000}
            value={priceRange}
            onChange={setPriceRange}
            pearling
            minDistance={0}
          />

          <div className="flex justify-between text-xs mt-1">
            <span>{priceRange[0]} INR</span>
            <span>{priceRange[1]} INR</span>
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
}
