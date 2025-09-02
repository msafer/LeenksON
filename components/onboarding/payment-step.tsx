"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, CreditCard, Smartphone, Shield, AlertTriangle, Loader2 } from "lucide-react"

interface CampaignConfig {
  type: "sponsored" | "unsponsored"
  creatorHandle: string
  creatorName: string
}

interface PaymentStepProps {
  config: CampaignConfig
  paymentMethod?: "usdc" | "coinbase" | "apple" | "stripe"
  onPaymentMethodChange: (method: "usdc" | "coinbase" | "apple" | "stripe") => void
  onPaymentComplete: () => void
}

export function PaymentStep({ config, paymentMethod, onPaymentMethodChange, onPaymentComplete }: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [authorizationGranted, setAuthorizationGranted] = useState(false)

  const handlePayment = async (method: "usdc" | "coinbase" | "apple" | "stripe") => {
    setIsProcessing(true)
    onPaymentMethodChange(method)

    try {
      // TODO: Implement actual payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onPaymentComplete()
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSponsoredAuthorization = async () => {
    setIsProcessing(true)
    try {
      // TODO: Set up retrocharge authorization
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setAuthorizationGranted(true)
      onPaymentComplete()
    } catch (error) {
      console.error("Authorization failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (config.type === "sponsored") {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Sponsored Account</h3>
          <p className="text-muted-foreground">Your Farcaster account is being sponsored by @{config.creatorHandle}</p>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              No Payment Required Today
            </CardTitle>
            <CardDescription>@{config.creatorHandle} is covering your $0.50 account creation fee</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-background border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <div className="font-medium">30-Day Follow Requirement</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    You must follow @{config.creatorHandle} for 30 days. If you unfollow within 30 days, you'll be
                    automatically charged $1.00 to cover the account cost.
                  </div>
                </div>
              </div>
            </div>

            {!authorizationGranted ? (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  To proceed, we need authorization to charge you $1.00 if you unfollow within 30 days.
                </div>
                <Button onClick={handleSponsoredAuthorization} disabled={isProcessing} className="w-full" size="lg">
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up authorization...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Authorize & Create Account
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="font-medium text-primary">Authorization Complete</div>
                <div className="text-sm text-muted-foreground">Creating your account...</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Complete Your Payment</h3>
        <p className="text-muted-foreground">Pay $1.00 to create your Farcaster account</p>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span>Farcaster account creation</span>
          <span className="font-medium">$1.00</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Includes storage rent and network fees. Creator earns $0.40.
        </div>
      </div>

      <Tabs defaultValue="usdc" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="usdc">USDC (Recommended)</TabsTrigger>
          <TabsTrigger value="fiat">Card/Apple Pay</TabsTrigger>
        </TabsList>

        <TabsContent value="usdc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">$</span>
                </div>
                Pay with USDC on Base
              </CardTitle>
              <CardDescription>Fast, low-cost payment using USDC on Base network</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handlePayment("usdc")} disabled={isProcessing} className="w-full" size="lg">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Pay $1.00 USDC
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fiat" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">CB</span>
                  </div>
                  Coinbase Pay
                </CardTitle>
                <CardDescription>Pay with your Coinbase account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handlePayment("coinbase")}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay with Coinbase
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Apple Pay
                </CardTitle>
                <CardDescription>Quick payment with Touch ID or Face ID</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handlePayment("apple")}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Smartphone className="mr-2 h-4 w-4" />
                      Pay with Apple Pay
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
