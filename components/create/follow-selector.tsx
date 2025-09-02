"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { X, Plus, Search } from "lucide-react"

interface Follow {
  fid: number
  handle: string
  name: string
  required?: boolean
}

interface FollowSelectorProps {
  follows: Follow[]
  onChange: (follows: Follow[]) => void
  maxFollows: number
  maxRequired: number
  allowRequired: boolean
}

export function FollowSelector({ follows, onChange, maxFollows, maxRequired, allowRequired }: FollowSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Follow[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock search results
  const mockUsers = [
    { fid: 2, handle: "dwr", name: "Dan Romero" },
    { fid: 3, handle: "vitalik", name: "Vitalik Buterin" },
    { fid: 4, handle: "jessepollak", name: "Jesse Pollak" },
    { fid: 5, handle: "balajis", name: "Balaji Srinivasan" },
    { fid: 6, handle: "linda", name: "Linda Xie" },
    { fid: 7, handle: "cdixon", name: "Chris Dixon" },
    { fid: 8, handle: "naval", name: "Naval" },
  ]

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const results = mockUsers
      .filter(
        (user) =>
          (user.handle.toLowerCase().includes(query.toLowerCase()) ||
            user.name.toLowerCase().includes(query.toLowerCase())) &&
          !follows.some((f) => f.fid === user.fid),
      )
      .slice(0, 5)

    setSearchResults(results)
    setIsSearching(false)
  }

  const addFollow = (user: Follow) => {
    if (follows.length >= maxFollows) return

    const newFollow = { ...user, required: false }
    onChange([...follows, newFollow])
    setSearchQuery("")
    setSearchResults([])
  }

  const removeFollow = (fid: number) => {
    onChange(follows.filter((f) => f.fid !== fid))
  }

  const toggleRequired = (fid: number) => {
    const requiredCount = follows.filter((f) => f.required).length
    const follow = follows.find((f) => f.fid === fid)

    if (!follow) return

    // Don't allow unchecking if it would exceed max required
    if (!follow.required && requiredCount >= maxRequired) return

    onChange(follows.map((f) => (f.fid === fid ? { ...f, required: !f.required } : f)))
  }

  const requiredCount = follows.filter((f) => f.required).length

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by handle or name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            searchUsers(e.target.value)
          }}
          className="pl-10"
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="border border-border rounded-lg p-2 space-y-1">
          {searchResults.map((user) => (
            <div
              key={user.fid}
              className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer"
              onClick={() => addFollow(user)}
            >
              <div>
                <div className="font-medium">@{user.handle}</div>
                <div className="text-sm text-muted-foreground">{user.name}</div>
              </div>
              <Button size="sm" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Selected Follows */}
      <div className="space-y-3">
        {follows.map((follow) => (
          <div key={follow.fid} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">@{follow.handle}</div>
                <div className="text-sm text-muted-foreground">{follow.name}</div>
              </div>
              {follow.required && <Badge variant="default">Required</Badge>}
            </div>
            <div className="flex items-center gap-2">
              {allowRequired && follow.handle !== "creator" && (
                <div className="flex items-center gap-2">
                  <Label htmlFor={`required-${follow.fid}`} className="text-sm">
                    Required
                  </Label>
                  <Switch
                    id={`required-${follow.fid}`}
                    checked={follow.required || false}
                    onCheckedChange={() => toggleRequired(follow.fid)}
                    disabled={!follow.required && requiredCount >= maxRequired}
                  />
                </div>
              )}
              {follow.handle !== "creator" && (
                <Button variant="ghost" size="sm" onClick={() => removeFollow(follow.fid)}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="text-sm text-muted-foreground">
        {follows.length}/{maxFollows} follows selected
        {allowRequired && ` • ${requiredCount}/${maxRequired} required`}
      </div>
    </div>
  )
}
