"use client"
import React, {useState } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
 
import { useQuery } from "@tanstack/react-query";
import { getLoggedUserCart } from "@/lib/Services/cart";

export default function Navbar() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
   }); 
   const cart = data?.data?.products ?? [];
 
 
  return (
    <HeroNavbar   position="static" 
  className="bg-gray-200 px-4 py-2 relative z-50">
       
      <NavbarBrand className="flex items-center gap-2">
        <i className="fa-solid fa-cart-shopping text-2xl text-teal-400"></i>
        <p className="font-bold text-2xl">Fresh Cart</p>
      </NavbarBrand>

 
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="/products">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/categories">
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/brands">
            Brands
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Actions */}
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link href="/wishList">
            <i className="fa-regular fa-heart text-xl"></i>
          </Link>
        </NavbarItem>
     <NavbarItem>
  <div className="relative">
    <Link href="/cart">
      <i className="fa-solid fa-cart-plus text-xl"></i>
    </Link>

    {  (
      <span className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {cart.length}
      </span>
    )}
  </div>
</NavbarItem>

        <NavbarItem>
          <Link href="/login">
            <i className="fa-regular fa-user text-xl"></i>
          </Link>
        </NavbarItem>
      </NavbarContent>

    
      <div className="sm:hidden flex items-center ml-auto z-50">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden z-50 absolute top-full left-0 w-full bg-gray-200  shadow-md flex flex-col gap-2 p-4 ">
          <Link href="/" className="py-2 px-3 hover:bg-gray-300 rounded">
            Home
          </Link>
          <Link href="/products" className="py-2 px-3 hover:bg-gray-300 rounded">
            Products
          </Link>
          <Link href="/categories" className="py-2 px-3 hover:bg-gray-300 rounded">
            Categories
          </Link>
          <Link href="/brands" className="py-2 px-3 hover:bg-gray-300 rounded">
            Brands
          </Link>
           
          <div className="flex gap-4 mt-2 justify-center">
            <Link href="/wishList">
              <i className="fa-regular fa-heart text-xl"></i>
            </Link>
          <div className="relative">
        <Link href="/cart">
          <i className="fa-solid fa-cart-plus text-xl"></i>
        </Link>

        {  (
          <span className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>
            <Link href="/login">
              <i className="fa-regular fa-user text-xl"></i>
            </Link>
          </div>
        </div>
      )}
    </HeroNavbar>
  );
}
