"use client";

import { verfiyCode } from "@/lib/Services/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function VerifyCode() {
    const [code, setCode] = useState<string>("");
  const router = useRouter()
 
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
          e.preventDefault();
        try{
        const res=await verfiyCode({"resetCode":code});
router.push('/resetPassword');
        console.log(res)}
        catch(err: any){
            console.log(err)
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Verify Code</h2>
        <p className="text-gray-500 text-center mb-6">
          Please enter the verification code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-gray-700 font-medium mb-2"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              placeholder="Enter your code"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-white hover:text-black hover:border hover:border-black text-white font-medium py-2 px-4 rounded-lg transition"
          >
         Verify
          </button>
        </form>

     

    
      </div>
    </div>
  );
}
