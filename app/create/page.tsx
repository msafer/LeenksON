"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { FollowSelector } from "@/components/create/follow-selector"
import { ChannelSelector } from "@/components/create/channel-selector"
import { TutorialCastInput } from "@/components/create/tutorial-cast-input"
import { LinkPreview } from "@/components/create/link-preview"
import { Users, Shield, Settings, Zap, AlertCircle } from "lucide-react"

interface LinkConfig {
  type: "unsponsored" | "sponsored"
  slug?: string
  suggestedFollows: Array<{ fid: number; handle: string; name: string; required?: boolean }>
  channels: Array<{ id: string; name: string }>
  tutorialCasts: Array<{ url: string; title: string }>
  universalNameBudget: number
  sponsoredBudget?: number
}

export default function CreatePage() {
  const [config, setConfig] = useState<LinkConfig>({
    type: "unsponsored",
    suggestedFollows: [
      { fid: 1, handle: "creator", name: "Your Account", required: true }, // Creator is always required for sponsored
    ],
    channels: [],
    tutorialCasts: [],
    universalNameBudget: 10,
  })

  const [generatedLink, setGeneratedLink] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateConfig = (updates: Partial<LinkConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const handleTypeChange = (type: "unsponsored" | "sponsored") => {
    updateConfig({
      type,
      slug: type === "sponsored" ? "" : undefined,
      sponsoredBudget: type === "sponsored" ? 100 : undefined,
    })
  }

  const generateLink = async () => {
    setIsGenerating(true)
    try {
      // TODO: Implement actual link generation API call
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

      const baseUrl = "fx.ob/@creator"
      const fullUrl = config.type === "sponsored" && config.slug ? `${baseUrl}/${config.slug}` : baseUrl

      setGeneratedLink(fullUrl)
    } catch (error) {
      console.error("Failed to generate link:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const canGenerate = () => {
    if (config.type === "sponsored" && !config.slug?.trim()) return false
    if (config.suggestedFollows.length === 0) return false
    return true
  }

  const requiredFollowsCount = config.suggestedFollows.filter((f) => f.required).length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Onboarding Link</h1>
          <p className="text-muted-foreground">
            Configure your link to help new users join Farcaster with your guidance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Link Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Link Type
                </CardTitle>
                <CardDescription>Choose how new users will pay for their Farcaster account</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={config.type} onValueChange={(value) => handleTypeChange(value as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="unsponsored" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Unsponsored
                    </TabsTrigger>
                    <TabsTrigger value="sponsored" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Sponsored
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="unsponsored" className="mt-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-medium">Unsponsored Link</span>
                        <Badge variant="outline">$1.00</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        New users pay $1.00 to join. You earn $0.40 per successful onboard.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="sponsored" className="mt-4 space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="font-medium">Sponsored Link</span>
                        <Badge className="bg-primary text-primary-foreground">$0.50</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        You pay $0.50 per user. They must follow you for 30 days or pay $1.00.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">Campaign Slug</Label>
                      <Input
                        id="slug"
                        placeholder="winter-campaign"
                        value={config.slug || ""}
                        onChange={(e) => updateConfig({ slug: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Your link will be: fx.ob/@creator/{config.slug || "your-slug"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Campaign Budget (USDC)</Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="100"
                        value={config.sponsoredBudget || ""}
                        onChange={(e) => updateConfig({ sponsoredBudget: Number(e.target.value) })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Estimated {Math.floor((config.sponsoredBudget || 0) / 0.5)} sponsored onboards
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Suggested Follows */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Follows</CardTitle>
                <CardDescription>
                  Choose up to 5 accounts for new users to follow.{" "}
                  {config.type === "sponsored" && "Mark up to 3 as required."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FollowSelector
                  follows={config.suggestedFollows}
                  onChange={(follows) => updateConfig({ suggestedFollows: follows })}
                  maxFollows={5}
                  maxRequired={config.type === "sponsored" ? 3 : 0}
                  allowRequired={config.type === "sponsored"}
                />
                {config.type === "sponsored" && requiredFollowsCount > 3 && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">Maximum 3 required follows allowed</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Channels */}
            <Card>
              <CardHeader>
                <CardTitle>Channels to Join</CardTitle>
                <CardDescription>Select up to 5 channels for new users to join (optional)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChannelSelector
                  channels={config.channels}
                  onChange={(channels) => updateConfig({ channels })}
                  maxChannels={5}
                />
              </CardContent>
            </Card>

            {/* Tutorial Casts */}
            <Card>
              <CardHeader>
                <CardTitle>Tutorial Casts</CardTitle>
                <CardDescription>Add up to 5 helpful casts to guide new users (optional)</CardDescription>
              </CardHeader>
              <CardContent>
                <TutorialCastInput
                  casts={config.tutorialCasts}
                  onChange={(casts) => updateConfig({ tutorialCasts: casts })}
                  maxCasts={5}
                />
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>Additional configuration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="universal-budget">Universal Name Budget Cap (USD)</Label>
                  <Input
                    id="universal-budget"
                    type="number"
                    value={config.universalNameBudget}
                    onChange={(e) => updateConfig({ universalNameBudget: Number(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum amount to spend on claiming usernames across multiple networks
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Generation */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Link Preview</CardTitle>
                <CardDescription>How your onboarding link will appear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LinkPreview config={config} />

                <Button onClick={generateLink} disabled={!canGenerate() || isGenerating} className="w-full" size="lg">
                  {isGenerating ? "Generating..." : "Generate Link"}
                </Button>

                {!canGenerate() && (
                  <div className="text-xs text-muted-foreground">
                    {config.type === "sponsored" && !config.slug?.trim() && "• Campaign slug is required"}
                    {config.suggestedFollows.length === 0 && "• At least one suggested follow is required"}
                  </div>
                )}

                {generatedLink && (
                  <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="font-medium text-primary mb-2">Link Generated!</h3>
                    <div className="space-y-3">
                      <div className="p-2 bg-background border rounded font-mono text-sm break-all">
                        {generatedLink}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(generatedLink)}
                          className="flex-1 bg-transparent"
                        >
                          Copy Link
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
