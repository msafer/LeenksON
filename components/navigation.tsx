"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SIWFModal } from "@/components/auth/siwf-modal"
import { SettingsModal } from "@/components/settings-modal"
import { useAuth } from "@/lib/auth-context"
import { Menu, X, Zap, Shield } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSIWFModal, setShowSIWFModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const { user, isAuthenticated, isAdmin, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false)
  }

  const handleSettingsClick = () => {
    setShowSettingsModal(true)
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Leenks</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Leaderboard
              </Link>
              {isAuthenticated && user ? (
                <>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/create" className="text-muted-foreground hover:text-foreground transition-colors">
                    Create Link
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">@{user.handle}</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button onClick={() => setShowSIWFModal(true)}>Get Started</Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
                <Link
                  href="/leaderboard"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/create"
                      className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Link
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Admin</span>
                        </div>
                      </Link>
                    )}
                    <div className="px-3 py-2 border-t border-border">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">@{user.handle}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSettingsClick}
                        className="w-full mb-2 bg-transparent"
                      >
                        Settings
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full bg-transparent">
                        Sign out
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="px-3 py-2">
                    <Button
                      onClick={() => {
                        setShowSIWFModal(true)
                        setIsMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <SIWFModal open={showSIWFModal} onOpenChange={setShowSIWFModal} />
      <SettingsModal open={showSettingsModal} onOpenChange={setShowSettingsModal} />
    </>
  )
}
