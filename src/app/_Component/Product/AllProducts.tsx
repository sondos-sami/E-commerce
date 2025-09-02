 
import React from 'react'
import { Iproduct } from '@/app/types/products.type';
import ProductCard from '@/app/_Component/Product/ProductCard';
import { getAllProducts } from '@/lib/Services/products';
import { getLoggedUserWishlist } from '@/lib/Services/wishList';

export default async function AllProducts() {
   const { data} = await getAllProducts();
 
      const res = await getLoggedUserWishlist();
      const productIds = res?.data?.map(product => product._id);
    
   
  return (
    <div> <section  className="p-6 grid grid-cols-1  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
              {data.map((p: Iproduct) => (
      <ProductCard key={p._id} product={p} isInWishlist={productIds?.includes(p._id) }  />
    ))}
    
        </section></div>
  )
}
