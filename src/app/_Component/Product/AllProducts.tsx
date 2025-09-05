import React from 'react'
import { Iproduct } from '@/app/types/products.type';
import ProductCard from '@/app/_Component/Product/ProductCard';
import { getAllProducts } from '@/lib/Services/products';
import { getLoggedUserWishlist } from '@/lib/Services/wishList';

export default async function AllProducts({ searchParams }) {
  const { data } = await getAllProducts();
  const res = await getLoggedUserWishlist();
  const productIds = res?.data?.map(product => product._id);
  
  // Filter products based on search query
  const filteredProducts = searchParams?.search 
    ? data.filter(product =>
        product.title?.toLowerCase().includes(searchParams.search.toLowerCase())
      )
    : data;

  return (
    <div>
      <section className="p-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
        {filteredProducts.map((p: Iproduct) => (
          <ProductCard 
            key={p._id} 
            product={p} 
            isInWishlist={productIds?.includes(p._id)} 
          />
        ))}
      </section>
      
      {searchParams?.search && filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No products found for "{searchParams.search}"</p>
        </div>
      )}
    </div>
  );
}