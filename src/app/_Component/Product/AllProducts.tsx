import React from 'react'
import { Iproduct } from '@/app/types/products.type';
import ProductCard from '@/app/_Component/Product/ProductCard';
import { getAllProducts } from '@/lib/Services/products';
import { getLoggedUserWishlist } from '@/lib/Services/wishList';

interface AllProductsProps {
  searchParams?: {
    search?: string;
  };
}

export default async function AllProducts({ searchParams }: AllProductsProps) {
  const productsResponse = await getAllProducts();
  const wishlistResponse = await getLoggedUserWishlist();
  
  // Handle error cases
  if (productsResponse.error || !productsResponse.data) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-lg">Error loading products: {productsResponse.error || 'No data available'}</p>
      </div>
    );
  }
  
  const data = productsResponse.data;
  const productIds = wishlistResponse?.data?.map((product: any) => product._id) || [];
  
  // Filter products based on search query
  const filteredProducts = searchParams?.search 
    ? data.filter((product: Iproduct) =>
        product.title?.toLowerCase().includes(searchParams.search?.toLowerCase() || "")
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