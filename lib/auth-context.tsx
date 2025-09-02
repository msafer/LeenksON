"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Creator } from "./types"

interface AuthContextType {
  user: Creator | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  signInWithFarcaster: () => Promise<void>
  signInWithEmail: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Creator | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user
  const isAdmin = user?.role === "admin"

  // Initialize auth state
  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const devUser: Creator = {
        id: "dev-admin",
        fid: 318555,
        handle: "admin",
        name: "Admin User",
        avatar: "/admin-avatar.png",
        emailExportPref: true,
        role: "admin",
      }
      setUser(devUser)
      setIsLoading(false)
      console.log("[v0] Dev mode: Auto-signed in as admin")
      return

      // TODO: Re-enable for production
      // const response = await fetch("/api/auth/me")
      // if (response.ok) {
      //   const userData = await response.json()
      //   setUser(userData.data)
      // }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithFarcaster = async () => {
    try {
      setIsLoading(true)
      console.log("[v0] SIWF attempt - using dev mode bypass")

      const devUser: Creator = {
        id: "dev-creator-" + Math.random().toString(36).substr(2, 9),
        fid: Math.floor(Math.random() * 1000000),
        handle: "testcreator",
        name: "Test Creator",
        avatar: "/crypto-builder.png",
        emailExportPref: true,
        role: "creator",
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(devUser)
      console.log("[v0] Dev SIWF successful:", devUser)

      // TODO: Implement real SIWF with Neynar
      // const response = await fetch("/api/auth/siwf", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      // })
      // if (response.ok) {
      //   const userData = await response.json()
      //   setUser(userData.data)
      // } else {
      //   throw new Error("SIWF failed")
      // }
    } catch (error) {
      console.error("SIWF error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithEmail = async (email: string) => {
    try {
      setIsLoading(true)
      // TODO: Implement email magic link
      const response = await fetch("/api/auth/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Email sign-in failed")
      }

      // Email auth typically requires verification step
      return response.json()
    } catch (error) {
      console.error("Email auth error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" })
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        signInWithFarcaster,
        signInWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
