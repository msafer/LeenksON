"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, ExternalLink } from "lucide-react"

interface TutorialCast {
  url: string
  title: string
}

interface TutorialCastInputProps {
  casts: TutorialCast[]
  onChange: (casts: TutorialCast[]) => void
  maxCasts: number
}

export function TutorialCastInput({ casts, onChange, maxCasts }: TutorialCastInputProps) {
  const [newCastUrl, setNewCastUrl] = useState("")
  const [newCastTitle, setNewCastTitle] = useState("")

  const addCast = () => {
    if (!newCastUrl.trim() || !newCastTitle.trim() || casts.length >= maxCasts) return

    const newCast = {
      url: newCastUrl.trim(),
      title: newCastTitle.trim(),
    }

    onChange([...casts, newCast])
    setNewCastUrl("")
    setNewCastTitle("")
  }

  const removeCast = (index: number) => {
    onChange(casts.filter((_, i) => i !== index))
  }

  const updateCast = (index: number, field: keyof TutorialCast, value: string) => {
    const updatedCasts = casts.map((cast, i) => (i === index ? { ...cast, [field]: value } : cast))
    onChange(updatedCasts)
  }

  return (
    <div className="space-y-4">
      {/* Add New Cast */}
      {casts.length < maxCasts && (
        <div className="space-y-3 p-4 border border-dashed border-border rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="cast-title">Cast Title</Label>
            <Input
              id="cast-title"
              placeholder="Getting Started with Farcaster"
              value={newCastTitle}
              onChange={(e) => setNewCastTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cast-url">Cast URL</Label>
            <Input
              id="cast-url"
              placeholder="https://warpcast.com/username/0x..."
              value={newCastUrl}
              onChange={(e) => setNewCastUrl(e.target.value)}
            />
          </div>
          <Button onClick={addCast} disabled={!newCastUrl.trim() || !newCastTitle.trim()} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Tutorial Cast
          </Button>
        </div>
      )}

      {/* Existing Casts */}
      {casts.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Tutorial Casts</h4>
          {casts.map((cast, index) => (
            <div key={index} className="p-3 border border-border rounded-lg space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`cast-title-${index}`}>Title</Label>
                <Input
                  id={`cast-title-${index}`}
                  value={cast.title}
                  onChange={(e) => updateCast(index, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cast-url-${index}`}>URL</Label>
                <div className="flex gap-2">
                  <Input
                    id={`cast-url-${index}`}
                    value={cast.url}
                    onChange={(e) => updateCast(index, "url", e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm" asChild>
                    <a href={cast.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeCast(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Status */}
      <div className="text-sm text-muted-foreground">
        {casts.length}/{maxCasts} tutorial casts added
      </div>
    </div>
  )
}
