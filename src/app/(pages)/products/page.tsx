"use client"
import React, { Suspense } from 'react'
 import ProductGridSkeleton from '@/app/_Component/Product/Skeleton/ProductGridSkeleton';
import AllProducts from '@/app/_Component/Product/AllProducts';
import { Input } from '@heroui/react';
export default   function Page() {
  
  return (
 <>
 <Input  className='w-[75%] mx-auto my-10' type="search" placeholder='search'/>
   
    
  <Suspense fallback={<ProductGridSkeleton/>}>
    
 <AllProducts/>
     </Suspense>
   
      
 
 </>
  )
}
