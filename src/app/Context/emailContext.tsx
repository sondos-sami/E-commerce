"use client"
import { createContext, useState, ReactNode } from "react";
 
 
 
export const EmailContext = createContext();

 
export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string>("");
 
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}
