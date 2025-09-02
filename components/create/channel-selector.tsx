"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, Search, Hash } from "lucide-react"

interface Channel {
  id: string
  name: string
  description?: string
}

interface ChannelSelectorProps {
  channels: Channel[]
  onChange: (channels: Channel[]) => void
  maxChannels: number
}

export function ChannelSelector({ channels, onChange, maxChannels }: ChannelSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Channel[]>([])

  // Mock popular channels
  const mockChannels = [
    { id: "farcaster", name: "farcaster", description: "All things Farcaster" },
    { id: "crypto", name: "crypto", description: "Cryptocurrency discussions" },
    { id: "dev", name: "dev", description: "Developer community" },
    { id: "art", name: "art", description: "Digital art and NFTs" },
    { id: "memes", name: "memes", description: "Memes and fun content" },
    { id: "music", name: "music", description: "Music and audio content" },
    { id: "gaming", name: "gaming", description: "Gaming discussions" },
    { id: "defi", name: "defi", description: "Decentralized finance" },
  ]

  const searchChannels = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    // Simulate API call
    const results = mockChannels
      .filter(
        (channel) =>
          (channel.name.toLowerCase().includes(query.toLowerCase()) ||
            channel.description?.toLowerCase().includes(query.toLowerCase())) &&
          !channels.some((c) => c.id === channel.id),
      )
      .slice(0, 5)

    setSearchResults(results)
  }

  const addChannel = (channel: Channel) => {
    if (channels.length >= maxChannels) return
    onChange([...channels, channel])
    setSearchQuery("")
    setSearchResults([])
  }

  const removeChannel = (id: string) => {
    onChange(channels.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            searchChannels(e.target.value)
          }}
          className="pl-10"
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="border border-border rounded-lg p-2 space-y-1">
          {searchResults.map((channel) => (
            <div
              key={channel.id}
              className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer"
              onClick={() => addChannel(channel)}
            >
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{channel.name}</div>
                  {channel.description && <div className="text-sm text-muted-foreground">{channel.description}</div>}
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Popular Channels */}
      {searchQuery === "" && channels.length < maxChannels && (
        <div>
          <h4 className="text-sm font-medium mb-2">Popular Channels</h4>
          <div className="flex flex-wrap gap-2">
            {mockChannels
              .filter((channel) => !channels.some((c) => c.id === channel.id))
              .slice(0, 6)
              .map((channel) => (
                <Button
                  key={channel.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addChannel(channel)}
                  className="bg-transparent"
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {channel.name}
                </Button>
              ))}
          </div>
        </div>
      )}

      {/* Selected Channels */}
      {channels.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Channels</h4>
          <div className="space-y-2">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-2 border border-border rounded">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{channel.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeChannel(channel.id)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="text-sm text-muted-foreground">
        {channels.length}/{maxChannels} channels selected
      </div>
    </div>
  )
}
