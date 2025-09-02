"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Loader2, Shield } from "lucide-react"

interface EmailStepProps {
  email: string
  onEmailChange: (email: string) => void
  onNext: () => void
}

export function EmailStep({ email, onEmailChange, onNext }: EmailStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [captchaCompleted, setCaptchaCompleted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !agreedToTerms || !captchaCompleted) return

    setIsLoading(true)
    try {
      // TODO: Send magic link email
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onNext()
    } catch (error) {
      console.error("Email signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const simulateCaptcha = () => {
    // Simulate CAPTCHA completion
    setTimeout(() => setCaptchaCompleted(true), 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          We'll send you a magic link to verify your email and continue the onboarding process.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Mock CAPTCHA */}
      <div className="space-y-3">
        <Label>Security Verification</Label>
        {!captchaCompleted ? (
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="captcha" onCheckedChange={simulateCaptcha} />
                <Label htmlFor="captcha" className="text-sm">
                  I'm not a robot
                </Label>
              </div>
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Verification complete</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm leading-relaxed">
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={!email || !agreedToTerms || !captchaCompleted || isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Magic Link...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Magic Link
          </>
        )}
      </Button>
    </form>
  )
}
