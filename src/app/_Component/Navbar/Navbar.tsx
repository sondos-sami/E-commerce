"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getLoggedUserCart } from "@/lib/Services/cart";

// Helper function to parse JWT token
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// Helper function to get cookie value by name
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
    enabled: isLoggedIn, // Only fetch cart if user is logged in
  });

  const cart = cartData?.data?.products ?? [];

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getCookie('token');
      const isAuthenticated = !!token;
      setIsLoggedIn(isAuthenticated);
      
      if (isAuthenticated) {
        // Extract user information from token
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken.name) {
          setUserName(decodedToken.name);
        } else {
          // Fallback if name isn't in token
          setUserName("User");
        }
      } else {
        setUserName("");
      }
    };

    // Check auth status on initial load
    checkAuthStatus();

    // Set up interval to check auth status periodically
    const intervalId = setInterval(checkAuthStatus, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    // Clear token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Reset state
    setIsLoggedIn(false);
    setUserName("");
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <HeroNavbar
      position="static"
      className="bg-gray-200 px-4 py-2 relative z-50"
    >
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
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </NavbarItem>

        {isLoggedIn ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="flex items-center gap-2">
                  <i className="fa-regular fa-user text-xl"></i>
                  <span className="hidden md:inline">{userName}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem key="profile">
                  
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Link href="/login">
              <i className="fa-regular fa-user text-xl"></i>
              <span className="hidden md:inline ml-2">Login</span>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Menu Button */}
      <div className="sm:hidden flex items-center ml-auto z-50">
        <Button
          size="sm"
          variant="bordered"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden z-50 absolute top-full left-0 w-full bg-gray-200 shadow-md flex flex-col gap-2 p-4">
          <Link
            href="/"
            className="py-2 px-3 hover:bg-gray-300 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="py-2 px-3 hover:bg-gray-300 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-300 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className="py-2 px-3 hover:bg-gray-300 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Brands
          </Link>

          <div className="flex gap-4 mt-2 justify-center items-center">
            <Link href="/wishList" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fa-regular fa-heart text-xl"></i>
            </Link>

            <div className="relative">
              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <i className="fa-solid fa-cart-plus text-xl"></i>
              </Link>
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>

            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <i className="fa-regular fa-user text-xl"></i>
              </Link>
            )}
          </div>
        </div>
      )}
    </HeroNavbar>
  );
}