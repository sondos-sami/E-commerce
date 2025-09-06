"use client"
import {Skeleton } from '@heroui/react'
import React from 'react'

export default function OrderSkeleton() {
  return (
 
        <section className="p-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
             <Skeleton className="rounded-xl">
          <div className="h-[4rem] w-[270px] rounded-xl bg-default-300" />
        </Skeleton>
          {Array.from({ length: 5 }).map((_, indx) => (
           <Skeleton className="rounded-xl">
          <div className="h-[30rem] w-[270px] rounded-xl bg-default-300" />
        </Skeleton>
          ))}
        </section>
     
    
  
  )
}
