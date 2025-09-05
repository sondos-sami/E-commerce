import React, { Suspense } from 'react'
import ProductGridSkeleton from '@/app/_Component/Product/Skeleton/ProductGridSkeleton';
import AllProducts from '@/app/_Component/Product/AllProducts';
import SearchInputWithSuspense from '@/app/_Component/Product/searchWrapper';
 

export default async function Page({ searchParams }) {
  return (
    <>
   
       <SearchInputWithSuspense />
      <Suspense fallback={<ProductGridSkeleton/>}>
        <AllProducts searchParams={searchParams} />
      </Suspense>
    </>
  );
}