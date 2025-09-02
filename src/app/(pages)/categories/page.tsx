import { getAllCategories } from '@/lib/Services/categories'
import React from 'react'
import { Icategory } from '@/app/types/categories.type';
import Loading from '@/app/_Component/Loading';

export default async function Page() {
  const { data }: { data: Icategory[] } = await getAllCategories();
 
  return (
   <>
   <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((category) => (
          <div
            key={category._id}
            className="border rounded-xl shadow hover:shadow-lg transition-shadow p-3 cursor-pointer text-center bg-white"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-72 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
   </>
  )
}
