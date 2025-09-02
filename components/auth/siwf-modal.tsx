"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Zap } from "lucide-react"

interface SIWFModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SIWFModal({ open, onOpenChange }: SIWFModalProps) {
  const { signInWithFarcaster, isLoading } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    try {
      setError(null)
      await signInWithFarcaster()
      onOpenChange(false)
    } catch (err) {
      setError("Failed to sign in with Farcaster. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            Sign in with Farcaster
          </DialogTitle>
          <DialogDescription>Connect your Farcaster account to create and manage onboarding links.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg">
              {error}
            </div>
          )}

          <Button onClick={handleSignIn} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <div className="w-5 h-5 bg-white rounded mr-2 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">FC</span>
                </div>
                Continue with Farcaster
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
