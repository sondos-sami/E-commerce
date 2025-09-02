"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import {
  deleteAllProductFromCart,
  deleteProductFromCart,
  getLoggedUserCart,
  updateQuantityProduct,
} from "@/lib/Services/cart";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/app/_Component/Loading";

export default function CartPage() {
  const queryClient = useQueryClient();

  // Fetch cart
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
   });
const cart = data?.data?.products ?? [];
 
  const { mutate: removeFromCart } = useMutation({
    mutationFn: (id: string) => deleteProductFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product deleted from cart");
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  // Remove all products
  const { mutate: removeAllFromCart } = useMutation({
    mutationFn: () => deleteAllProductFromCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("All products deleted from cart");
    },
    onError: () => {
      toast.error("Failed to delete all products");
    },
  });

  // Update quantity
  const { mutate: updateQuantity } = useMutation({
    mutationFn: ({ id, count }: { id: string; count: number }) =>
      updateQuantityProduct(id, count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });

  // Calculate total
  const total = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.count,
    0
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item: any) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center sm:items-start border-b border-gray-200 pb-4 mb-4 gap-4"
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.product.title}</h2>
                <p className="text-sm text-gray-500">
                  {item.product.category.name}
                </p>
                <p className="text-green-600 font-bold">{item.price} EGP</p>
              </div>

              <div className="flex items-center gap-2 mr-6">
                <Button
                  size="sm"
                  variant="flat"
                  onPress={() =>
                    item.count > 1 &&
                    updateQuantity({
                      id: item.product._id,
                      count: item.count - 1,
                    })
                  }
                >
                  -
                </Button>
                <span className="px-2">{item.count}</span>
                <Button
                  size="sm"
                  variant="flat"
                  onPress={() =>
                    updateQuantity({
                      id: item.product._id,
                      count: item.count + 1,
                    })
                  }
                >
                  +
                </Button>
              </div>

              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <>
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-bold">Total:</h2>
              <span className="text-xl text-green-600 font-semibold">
                {total} EGP
              </span>
            </div>

            {/* Buttons Section */}
            <div className="mt-6 flex justify-between">
              <Button
                color="danger"
                size="lg"
                variant="flat"
                onPress={() => removeAllFromCart()}
              >
                Clear All
              </Button>
              <Button color="success" size="lg" className="px-8">
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
