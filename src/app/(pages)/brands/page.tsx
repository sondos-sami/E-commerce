 import React from 'react'
 
import { getAllBrands } from '@/lib/Services/brands';

export default async function Page() {
  const { data } = await getAllBrands();

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-6">Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((brand) => (
          <div
            key={brand._id}
            className="border rounded-xl shadow hover:shadow-lg transition-shadow p-3 cursor-pointer text-center bg-white"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-64 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
