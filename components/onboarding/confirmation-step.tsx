"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ExternalLink, Users, Hash, Zap } from "lucide-react"

interface CampaignConfig {
  type: "sponsored" | "unsponsored"
  creatorHandle: string
  creatorName: string
  suggestedFollows: Array<{ fid: number; handle: string; name: string; required?: boolean }>
  channels: Array<{ id: string; name: string }>
  tutorialCasts: Array<{ url: string; title: string }>
}

interface OnboardingState {
  email: string
  username: string
  universalChoice: "farcaster_only" | "universal"
  selectedFollows: number[]
  selectedChannels: string[]
  paymentComplete: boolean
}

interface ConfirmationStepProps {
  config: CampaignConfig
  onboardingState: OnboardingState
}

export function ConfirmationStep({ config, onboardingState }: ConfirmationStepProps) {
  const selectedFollowAccounts = config.suggestedFollows.filter((f) => onboardingState.selectedFollows.includes(f.fid))
  const selectedChannelList = config.channels.filter((c) => onboardingState.selectedChannels.includes(c.id))

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Welcome to Farcaster!</h3>
        <p className="text-muted-foreground">Your account @{onboardingState.username} has been successfully created</p>
      </div>

      {/* Account Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Account Summary
          </CardTitle>
          <CardDescription>Your new Farcaster account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Username</div>
              <div className="font-medium">@{onboardingState.username}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Account Type</div>
              <Badge variant={config.type === "sponsored" ? "default" : "secondary"}>{config.type}</Badge>
            </div>
            <div>
              <div className="text-muted-foreground">Universal Claim</div>
              <div className="font-medium">
                {onboardingState.universalChoice === "universal" ? "Yes" : "Farcaster only"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Sponsored by</div>
              <div className="font-medium">
                {config.type === "sponsored" ? `@${config.creatorHandle}` : "Self-paid"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>Get started with your new Farcaster account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Following */}
          {selectedFollowAccounts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">Following ({selectedFollowAccounts.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFollowAccounts.map((follow) => (
                  <Badge key={follow.fid} variant={follow.required ? "default" : "secondary"}>
                    @{follow.handle}
                    {follow.required && config.type === "sponsored" && " (required)"}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Channels */}
          {selectedChannelList.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-primary" />
                <span className="font-medium">Joined Channels ({selectedChannelList.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedChannelList.map((channel) => (
                  <Badge key={channel.id} variant="outline">
                    #{channel.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tutorial Casts */}
          {config.tutorialCasts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="w-4 h-4 text-primary" />
                <span className="font-medium">Helpful Resources</span>
              </div>
              <div className="space-y-2">
                {config.tutorialCasts.map((cast, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{cast.title}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={cast.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sponsored Reminder */}
      {config.type === "sponsored" && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="font-medium text-amber-800">Remember: 30-Day Follow Requirement</div>
                <div className="text-sm text-amber-700 mt-1">
                  Keep following @{config.creatorHandle} for 30 days to avoid the $1.00 charge. We'll send you a
                  reminder before the period ends.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <div className="space-y-3">
        <Button asChild className="w-full" size="lg">
          <a href="https://warpcast.com" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Warpcast
          </a>
        </Button>
        <Button variant="outline" asChild className="w-full bg-transparent">
          <a href="/">Return to Leenks</a>
        </Button>
      </div>
    </div>
  )
}
