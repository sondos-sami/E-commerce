"use server"
 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkoutCartCash(id: string, data: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: (await cookies()).get("token")?.value || "",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to checkout cart" };
    }
    
    return await response.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function checkoutCartCredit(id: string, data: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/checkout-session/${id}?url=${process.env.NEXT_PUBLIC_Site_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: (await cookies()).get("token")?.value || "",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to checkout cart" };
    }
    
    const result = await response.json();
    redirect(result.session.url);
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function getAllUserOrders(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to fetch orders" };
    }
    
    return await response.json();
  } catch (err: any) {
    return { error: err.message };
  }
}