"use client";
import React, { useState } from "react";
import { Iproduct } from "@/app/types/products.type";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "@/lib/Services/cart";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from "@/lib/Services/wishList";

export default function ProductCard({
  product,
  isInWishlist = false,
}: {
  product: Iproduct;
  isInWishlist?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [inWishlist, setInWishlist] = useState(isInWishlist);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  // Add to Cart 
  const { mutate: addToCartMutate } = useMutation({
    mutationFn: () => addProductToCart(product._id),
    onMutate: () => setLoadingCart(true),
    onSuccess: (data) => {
      toast.success(data?.message || "Added to cart");
     
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
    },
    onSettled: () => setLoadingCart(false),
  });

  // Add to Wishlist 
  const { mutate: addToWishlistMutate } = useMutation({
    mutationFn: () => addProductToWishlist(product._id),
    onMutate: () => setLoadingWishlist(true),
    onSuccess: (data) => {
      toast.success(data?.message || "Added to wishlist");
      setInWishlist(true);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => toast.error("You are not logged in. Please login"),
    onSettled: () => setLoadingWishlist(false),
  });

  // Remove from Wishlist 
  const { mutate: removeFromWishlistMutate } = useMutation({
    mutationFn: () => deleteProductFromWishlist(product._id),
    onMutate: () => setLoadingWishlist(true),
    onSuccess: (data) => {
      toast.success(data?.message || "Removed from wishlist");
      setInWishlist(false);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => toast.error("Failed to remove from wishlist"),
    onSettled: () => setLoadingWishlist(false),
  });

  return (
    <Card
      isPressable
      onPress={() => router.push(`/products/${product.id}`)}
      className="relative py-4 cursor-pointer hover:scale-105 transition-transform"
    >
      {/* Wishlist Icon */}
      <div
        role="button"
        aria-pressed={inWishlist}
        className={`absolute top-3 right-3 z-50 p-2 rounded-full shadow cursor-pointer
          ${inWishlist ? "bg-red-500 text-white" : "bg-white hover:bg-red-500"}`}
        onClick={(e) => {
          e.stopPropagation();
          if (inWishlist) removeFromWishlistMutate();
          else addToWishlistMutate();
        }}
      >
        {loadingWishlist ? (
          <i className="fa-solid fa-spinner fa-spin text-xl"></i>
        ) : (
          <i className={`text-xl ${inWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}`}></i>
        )}
      </div>

      {/* Product Image */}
      <CardBody className="overflow-visible py-2 relative">
        <Image
          alt={product.title}
          className="object-cover rounded-xl h-[22rem] w-full"
          src={product.imageCover}
          width={270}
        />
      </CardBody>

      {/* Product Info */}
      <CardHeader className="pb-2 pt-2 px-4 flex-col items-start space-y-2">
        <p className="text-green-600">{product.category.name}</p>
        <h4 className="font-bold text-lg line-clamp-1">{product.title}</h4>
        <small className="text-default-500 font-semibold">{product.price} EGP</small>

        <Button
          size="sm"
          variant="solid"
          color="success"
          className="mt-2 w-full"
          onClick={(e) => {
            e.stopPropagation();
            addToCartMutate();
          }}
        >
          {loadingCart ? "Adding..." : "Add to Cart"}
        </Button>
      </CardHeader>
    </Card>
  );
}
