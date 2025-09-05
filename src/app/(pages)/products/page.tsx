import React, { Suspense } from 'react'
import ProductGridSkeleton from '@/app/_Component/Product/Skeleton/ProductGridSkeleton';
import AllProducts from '@/app/_Component/Product/AllProducts';
import SearchInput from '@/app/_Component/Product/SearchComponent';

export default async function Page({ searchParams }) {
  return (
    <>
      <SearchInput />
      <Suspense fallback={<ProductGridSkeleton/>}>
        <AllProducts searchParams={searchParams} />
      </Suspense>
    </>
  );
}