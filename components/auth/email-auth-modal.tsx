"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Mail, CheckCircle } from "lucide-react"

interface EmailAuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmailAuthModal({ open, onOpenChange }: EmailAuthModalProps) {
  const { signInWithEmail, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "sent">("email")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      setError(null)
      await signInWithEmail(email)
      setStep("sent")
    } catch (err) {
      setError("Failed to send magic link. Please try again.")
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset state when modal closes
    setTimeout(() => {
      setStep("email")
      setEmail("")
      setError(null)
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            {step === "email" ? "Sign in with Email" : "Check your email"}
          </DialogTitle>
          <DialogDescription>
            {step === "email"
              ? "Enter your email address to receive a magic link."
              : `We've sent a magic link to ${email}. Click the link to complete your sign-in.`}
          </DialogDescription>
        </DialogHeader>

        {step === "email" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading || !email} className="w-full" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Magic Link
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button variant="outline" onClick={() => setStep("email")} className="w-full">
                Try Different Email
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
