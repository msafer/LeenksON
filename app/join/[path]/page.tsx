"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { EmailStep } from "@/components/onboarding/email-step"
import { UsernameStep } from "@/components/onboarding/username-step"
import { PreferencesStep } from "@/components/onboarding/preferences-step"
import { PaymentStep } from "@/components/onboarding/payment-step"
import { ConfirmationStep } from "@/components/onboarding/confirmation-step"
import { Zap, ArrowLeft } from "lucide-react"

interface CampaignConfig {
  id: string
  type: "sponsored" | "unsponsored"
  creatorHandle: string
  creatorName: string
  slug?: string
  suggestedFollows: Array<{ fid: number; handle: string; name: string; required?: boolean }>
  channels: Array<{ id: string; name: string }>
  tutorialCasts: Array<{ url: string; title: string }>
  universalNameBudget: number
}

interface OnboardingState {
  email: string
  username: string
  universalChoice: "farcaster_only" | "universal"
  selectedFollows: number[]
  selectedChannels: string[]
  paymentMethod?: "usdc" | "coinbase" | "apple" | "stripe"
  paymentComplete: boolean
}

export default function OnboardingPage() {
  const params = useParams()
  const path = params.path as string

  const [currentStep, setCurrentStep] = useState(1)
  const [campaignConfig, setCampaignConfig] = useState<CampaignConfig | null>(null)
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    email: "",
    username: "",
    universalChoice: "farcaster_only",
    selectedFollows: [],
    selectedChannels: [],
    paymentComplete: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Mock campaign data based on path
  useEffect(() => {
    const loadCampaign = async () => {
      setIsLoading(true)
      // TODO: Fetch actual campaign config from API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock campaign config
      const mockConfig: CampaignConfig = {
        id: "1",
        type: path === "creator" ? "unsponsored" : "sponsored",
        creatorHandle: "creator",
        creatorName: "Creator Name",
        slug: path !== "creator" ? path : undefined,
        suggestedFollows: [
          { fid: 1, handle: "creator", name: "Creator Name", required: true },
          { fid: 2, handle: "dwr", name: "Dan Romero", required: path !== "creator" },
          { fid: 3, handle: "vitalik", name: "Vitalik Buterin" },
        ],
        channels: [
          { id: "farcaster", name: "farcaster" },
          { id: "crypto", name: "crypto" },
        ],
        tutorialCasts: [
          { url: "https://warpcast.com/example/1", title: "Getting Started with Farcaster" },
          { url: "https://warpcast.com/example/2", title: "How to Cast and Engage" },
        ],
        universalNameBudget: 10,
      }

      setCampaignConfig(mockConfig)
      // Pre-select required follows
      setOnboardingState((prev) => ({
        ...prev,
        selectedFollows: mockConfig.suggestedFollows.filter((f) => f.required).map((f) => f.fid),
      }))
      setIsLoading(false)
    }

    loadCampaign()
  }, [path])

  const updateState = (updates: Partial<OnboardingState>) => {
    setOnboardingState((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Welcome to Farcaster"
      case 2:
        return "Choose Your Username"
      case 3:
        return "Customize Your Experience"
      case 4:
        return campaignConfig?.type === "sponsored" ? "Sponsored Onboarding" : "Complete Your Account"
      case 5:
        return "Welcome to Farcaster!"
      default:
        return "Onboarding"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Enter your email to get started"
      case 2:
        return "Pick a unique username for your Farcaster account"
      case 3:
        return "Follow accounts and join channels to personalize your feed"
      case 4:
        return campaignConfig?.type === "sponsored"
          ? "Your account is sponsored - just follow the required accounts"
          : "Complete your payment to create your account"
      case 5:
        return "Your Farcaster account has been created successfully"
      default:
        return ""
    }
  }

  if (isLoading || !campaignConfig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-5 h-5 text-primary-foreground animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading onboarding...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Leenks</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={campaignConfig.type === "sponsored" ? "default" : "secondary"}>
                {campaignConfig.type === "sponsored" ? "Sponsored" : "Unsponsored"}
              </Badge>
              <span className="text-sm text-muted-foreground">by @{campaignConfig.creatorHandle}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep} of 5</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / 5) * 100)}% complete</span>
          </div>
          <Progress value={(currentStep / 5) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{getStepTitle()}</CardTitle>
                <CardDescription>{getStepDescription()}</CardDescription>
              </div>
              {currentStep > 1 && (
                <Button variant="ghost" size="sm" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <EmailStep
                email={onboardingState.email}
                onEmailChange={(email) => updateState({ email })}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <UsernameStep
                username={onboardingState.username}
                universalChoice={onboardingState.universalChoice}
                universalBudget={campaignConfig.universalNameBudget}
                onUsernameChange={(username) => updateState({ username })}
                onUniversalChoiceChange={(universalChoice) => updateState({ universalChoice })}
                onNext={nextStep}
              />
            )}
            {currentStep === 3 && (
              <PreferencesStep
                config={campaignConfig}
                selectedFollows={onboardingState.selectedFollows}
                selectedChannels={onboardingState.selectedChannels}
                onFollowsChange={(selectedFollows) => updateState({ selectedFollows })}
                onChannelsChange={(selectedChannels) => updateState({ selectedChannels })}
                onNext={nextStep}
              />
            )}
            {currentStep === 4 && (
              <PaymentStep
                config={campaignConfig}
                paymentMethod={onboardingState.paymentMethod}
                onPaymentMethodChange={(paymentMethod) => updateState({ paymentMethod })}
                onPaymentComplete={() => {
                  updateState({ paymentComplete: true })
                  nextStep()
                }}
              />
            )}
            {currentStep === 5 && <ConfirmationStep config={campaignConfig} onboardingState={onboardingState} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
