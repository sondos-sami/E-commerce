"use client"
import { createContext, useState, ReactNode  } from "react"

export const IdContext=createContext();
export function UserProvider({children}:{ children: ReactNode }){
    const [id,setId]=useState<string>("");
    return <IdContext.Provider value={{id,setId}}>
{children}
    </IdContext.Provider>
}