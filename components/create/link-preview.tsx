"use client"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Hash, ExternalLink } from "lucide-react"

interface LinkConfig {
  type: "unsponsored" | "sponsored"
  slug?: string
  suggestedFollows: Array<{ fid: number; handle: string; name: string; required?: boolean }>
  channels: Array<{ id: string; name: string }>
  tutorialCasts: Array<{ url: string; title: string }>
  universalNameBudget: number
  sponsoredBudget?: number
}

interface LinkPreviewProps {
  config: LinkConfig
}

export function LinkPreview({ config }: LinkPreviewProps) {
  const linkUrl = config.type === "sponsored" && config.slug ? `fx.ob/@creator/${config.slug}` : "fx.ob/@creator"

  const requiredFollows = config.suggestedFollows.filter((f) => f.required)
  const optionalFollows = config.suggestedFollows.filter((f) => !f.required)

  return (
    <div className="space-y-4">
      {/* Link URL */}
      <div className="p-3 bg-muted/30 rounded-lg">
        <div className="text-xs text-muted-foreground mb-1">Your Link</div>
        <div className="font-mono text-sm break-all">{linkUrl}</div>
      </div>

      {/* Link Type */}
      <div className="flex items-center gap-2">
        {config.type === "sponsored" ? (
          <>
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-medium">Sponsored</span>
            <Badge className="bg-primary text-primary-foreground">$0.50</Badge>
          </>
        ) : (
          <>
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium">Unsponsored</span>
            <Badge variant="outline">$1.00</Badge>
          </>
        )}
      </div>

      {/* Configuration Summary */}
      <div className="space-y-3 text-sm">
        {/* Follows */}
        {config.suggestedFollows.length > 0 && (
          <div>
            <div className="font-medium mb-1">Suggested Follows ({config.suggestedFollows.length})</div>
            <div className="space-y-1">
              {requiredFollows.length > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <Badge variant="default" className="text-xs">
                    Required
                  </Badge>
                  <span className="text-muted-foreground">{requiredFollows.map((f) => `@${f.handle}`).join(", ")}</span>
                </div>
              )}
              {optionalFollows.length > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <Badge variant="secondary" className="text-xs">
                    Optional
                  </Badge>
                  <span className="text-muted-foreground">{optionalFollows.map((f) => `@${f.handle}`).join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Channels */}
        {config.channels.length > 0 && (
          <div>
            <div className="font-medium mb-1">Channels ({config.channels.length})</div>
            <div className="flex flex-wrap gap-1">
              {config.channels.map((channel) => (
                <Badge key={channel.id} variant="outline" className="text-xs">
                  <Hash className="w-3 h-3 mr-1" />
                  {channel.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tutorial Casts */}
        {config.tutorialCasts.length > 0 && (
          <div>
            <div className="font-medium mb-1">Tutorial Casts ({config.tutorialCasts.length})</div>
            <div className="space-y-1">
              {config.tutorialCasts.map((cast, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{cast.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Budget Info */}
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Universal name budget: ${config.universalNameBudget}
            {config.type === "sponsored" && config.sponsoredBudget && (
              <> • Campaign budget: ${config.sponsoredBudget}</>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
