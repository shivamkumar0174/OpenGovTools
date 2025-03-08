"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  image?: string
} | null

type AuthContextType = {
  user: User
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false,
  signOut: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking for an existing session
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    // In a real app, this would call your authentication API
    if (email && password) {
      const mockUser = {
        id: "user-1",
        name: "Demo User",
        email: email,
        image: "/placeholder.svg?height=40&width=40",
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  // Mock sign out function
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

