"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Users, Hash, ExternalLink, AlertCircle } from "lucide-react"

interface CampaignConfig {
  type: "sponsored" | "unsponsored"
  creatorHandle: string
  suggestedFollows: Array<{ fid: number; handle: string; name: string; required?: boolean }>
  channels: Array<{ id: string; name: string }>
  tutorialCasts: Array<{ url: string; title: string }>
}

interface PreferencesStepProps {
  config: CampaignConfig
  selectedFollows: number[]
  selectedChannels: string[]
  onFollowsChange: (follows: number[]) => void
  onChannelsChange: (channels: string[]) => void
  onNext: () => void
}

export function PreferencesStep({
  config,
  selectedFollows,
  selectedChannels,
  onFollowsChange,
  onChannelsChange,
  onNext,
}: PreferencesStepProps) {
  const requiredFollows = config.suggestedFollows.filter((f) => f.required)
  const optionalFollows = config.suggestedFollows.filter((f) => !f.required)

  const toggleFollow = (fid: number, required: boolean) => {
    if (required) return // Can't uncheck required follows

    if (selectedFollows.includes(fid)) {
      onFollowsChange(selectedFollows.filter((id) => id !== fid))
    } else {
      onFollowsChange([...selectedFollows, fid])
    }
  }

  const toggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      onChannelsChange(selectedChannels.filter((id) => id !== channelId))
    } else {
      onChannelsChange([...selectedChannels, channelId])
    }
  }

  const canProceed = requiredFollows.every((f) => selectedFollows.includes(f.fid))

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          Customize your Farcaster experience by following accounts and joining channels.
        </p>
      </div>

      {/* Required Notice for Sponsored */}
      {config.type === "sponsored" && requiredFollows.length > 0 && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <div className="font-medium text-primary">Sponsored Account Requirements</div>
              <div className="text-sm text-muted-foreground mt-1">
                You must follow the required accounts for 30 days. If you unfollow within 30 days, you'll be charged
                $1.00.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Follows */}
      {config.suggestedFollows.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Suggested Follows</h3>
          </div>

          <div className="space-y-3">
            {requiredFollows.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-primary">Required</Label>
                {requiredFollows.map((follow) => (
                  <div
                    key={follow.fid}
                    className="flex items-center justify-between p-3 border border-primary/20 rounded-lg bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{follow.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">@{follow.handle}</div>
                        <div className="text-sm text-muted-foreground">{follow.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Required</Badge>
                      <Checkbox checked={true} disabled />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {optionalFollows.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Optional</Label>
                {optionalFollows.map((follow) => (
                  <div key={follow.fid} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{follow.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">@{follow.handle}</div>
                        <div className="text-sm text-muted-foreground">{follow.name}</div>
                      </div>
                    </div>
                    <Checkbox
                      checked={selectedFollows.includes(follow.fid)}
                      onCheckedChange={() => toggleFollow(follow.fid, false)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Channels */}
      {config.channels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Channels to Join</h3>
          </div>

          <div className="space-y-2">
            {config.channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Hash className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">#{channel.name}</div>
                    <div className="text-sm text-muted-foreground">Join this channel</div>
                  </div>
                </div>
                <Checkbox
                  checked={selectedChannels.includes(channel.id)}
                  onCheckedChange={() => toggleChannel(channel.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tutorial Casts */}
      {config.tutorialCasts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Helpful Resources</h3>
          </div>

          <div className="space-y-2">
            {config.tutorialCasts.map((cast, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{cast.title}</div>
                    <div className="text-sm text-muted-foreground">Tutorial cast</div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={cast.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={onNext} disabled={!canProceed} className="w-full" size="lg">
        Continue to Payment
      </Button>
    </div>
  )
}
