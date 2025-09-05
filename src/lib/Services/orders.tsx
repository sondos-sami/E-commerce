"use server"
 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkoutCartCash(id: string,data) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`, {
    method: "POST",
    headers: {
    
      "Content-Type": "application/json",
      token: cookies().get("token")?.value || "",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
export async function checkoutCartCredit(id: string,data) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/checkout-session/${id}?url=${process.env.NEXT_PUBLIC_Site_URL}`, {
    method: "POST",
    headers: {
    
      "Content-Type": "application/json",
      token: cookies().get("token")?.value || "",
    },
    body: JSON.stringify(data),
  
  });
    const result = await response.json();
redirect( result.session.url);
 
}
export async function getAllUserOrders(id: string ){

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/user/${id}`, {
    method: "GET",
    headers: {
    
      "Content-Type": "application/json",
    
    },
  
  });
  return response.json();
}