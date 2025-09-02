"use server";
import { cookies } from "next/headers";

 export async function addProductToWishlist(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         token: cookies().get("token")?.value || "",
      },
      body: JSON.stringify({ productId: id }),
    });

    const result = await response.json();
 
  
    return result;  
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function getLoggedUserWishlist( ) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        token: cookies().get("token")?.value || "",
      },
    
    });

    const result = await response.json();
 
     
  
    return result;  
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function deleteProductFromWishlist(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
       token: cookies().get("token")?.value || "",
      },
    
    });

    const result = await response.json();
 
     
  
    return result;  
  } catch (err: any) {
    return { error: err.message };
  }
}