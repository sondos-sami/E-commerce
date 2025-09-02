"use server";
import { cookies } from "next/headers";

// Get logged-in user's cart

export async function getLoggedUserCart() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
    headers: {
      "Content-Type": "application/json",
 
      token: cookies().get("token")?.value || "",
    },
     
    
  });

  return response.json();
}

//  Add product to cart
export async function addProductToCart(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: cookies().get("token")?.value || "",
    },
    body: JSON.stringify({ productId: id }),
  });

  return response.json();
}

//  Delete product from cart
export async function deleteProductFromCart(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: cookies().get("token")?.value || "",
      },
    }
  );

  return response.json();
}

//  Update product quantity in cart
export async function updateQuantityProduct(id: string, count: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cart/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: cookies().get("token")?.value || "",
      },
      body: JSON.stringify({ count }),
    }
  );

  return response.json();
}
export async function deleteAllProductFromCart() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: cookies().get("token")?.value || "",
      },
    }
  );

  return response.json();
}
 