"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, XCircle, Loader2, User, Globe } from "lucide-react"

interface UsernameStepProps {
  username: string
  universalChoice: "farcaster_only" | "universal"
  universalBudget: number
  onUsernameChange: (username: string) => void
  onUniversalChoiceChange: (choice: "farcaster_only" | "universal") => void
  onNext: () => void
}

interface AvailabilityStatus {
  platform: string
  available: boolean
  cost?: number
}

export function UsernameStep({
  username,
  universalChoice,
  universalBudget,
  onUsernameChange,
  onUniversalChoiceChange,
  onNext,
}: UsernameStepProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [farcasterAvailable, setFarcasterAvailable] = useState<boolean | null>(null)
  const [universalStatus, setUniversalStatus] = useState<AvailabilityStatus[]>([])
  const [suggestedAlternatives, setSuggestedAlternatives] = useState<string[]>([])

  useEffect(() => {
    if (username.length >= 3) {
      checkAvailability(username)
    } else {
      setFarcasterAvailable(null)
      setUniversalStatus([])
      setSuggestedAlternatives([])
    }
  }, [username])

  const checkAvailability = async (name: string) => {
    setIsChecking(true)
    try {
      // TODO: Check actual availability via API
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mock availability check
      const isAvailable = !["dan", "vitalik", "creator", "admin"].includes(name.toLowerCase())
      setFarcasterAvailable(isAvailable)

      if (universalChoice === "universal") {
        // Mock universal availability
        const mockUniversalStatus: AvailabilityStatus[] = [
          { platform: "Lens", available: isAvailable, cost: isAvailable ? 0 : undefined },
          { platform: "ENS", available: !isAvailable, cost: !isAvailable ? undefined : 5 },
          { platform: "Unstoppable", available: isAvailable, cost: isAvailable ? 3 : undefined },
        ]
        setUniversalStatus(mockUniversalStatus)
      }

      if (!isAvailable) {
        setSuggestedAlternatives([`${name}1`, `${name}_fc`, `${name}2024`])
      } else {
        setSuggestedAlternatives([])
      }
    } catch (error) {
      console.error("Availability check failed:", error)
    } finally {
      setIsChecking(false)
    }
  }

  const totalUniversalCost = universalStatus.reduce((sum, status) => sum + (status.cost || 0), 0)
  const canProceed =
    farcasterAvailable && (universalChoice === "farcaster_only" || totalUniversalCost <= universalBudget)

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          Choose a unique username that will represent you across the Farcaster network.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input
              id="username"
              placeholder="yourname"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
              className="pr-10"
            />
            {isChecking && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin" />
            )}
            {!isChecking && farcasterAvailable === true && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
            {!isChecking && farcasterAvailable === false && (
              <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
        </div>

        {/* Farcaster Availability */}
        {farcasterAvailable !== null && (
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">FC</span>
                </div>
                <span className="font-medium">Farcaster</span>
              </div>
              <Badge variant={farcasterAvailable ? "default" : "destructive"}>
                {farcasterAvailable ? "Available" : "Taken"}
              </Badge>
            </div>
          </div>
        )}

        {/* Universal Toggle */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="font-medium">Claim universally</div>
              <div className="text-sm text-muted-foreground">Check availability across multiple networks</div>
            </div>
          </div>
          <Switch
            checked={universalChoice === "universal"}
            onCheckedChange={(checked) => onUniversalChoiceChange(checked ? "universal" : "farcaster_only")}
          />
        </div>

        {/* Universal Status */}
        {universalChoice === "universal" && universalStatus.length > 0 && (
          <div className="space-y-2">
            <Label>Universal Availability</Label>
            <div className="space-y-2">
              {universalStatus.map((status) => (
                <div key={status.platform} className="flex items-center justify-between p-2 border rounded">
                  <span className="font-medium">{status.platform}</span>
                  <div className="flex items-center gap-2">
                    {status.cost !== undefined && <span className="text-sm text-muted-foreground">${status.cost}</span>}
                    <Badge variant={status.available ? "default" : "destructive"}>
                      {status.available ? "Available" : "Taken"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Total cost: ${totalUniversalCost} / ${universalBudget} budget
              {totalUniversalCost > universalBudget && <span className="text-destructive"> (exceeds budget)</span>}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestedAlternatives.length > 0 && (
          <div className="space-y-2">
            <Label>Suggested alternatives</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedAlternatives.map((alt) => (
                <Button
                  key={alt}
                  variant="outline"
                  size="sm"
                  onClick={() => onUsernameChange(alt)}
                  className="bg-transparent"
                >
                  {alt}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button onClick={onNext} disabled={!canProceed} className="w-full" size="lg">
        Continue with @{username}
      </Button>
    </div>
  )
}
