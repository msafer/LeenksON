import type { Creator, OnboardedUser, Campaign, LeaderboardEntry } from "./types"

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Generic API response wrapper
interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

// API Client class
export class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "API request failed")
      }

      return { data, success: true }
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Authentication endpoints
  async signInWithFarcaster(signature: string, message: string) {
    return this.request<{ token: string; creator: Creator }>("/auth/siwf", {
      method: "POST",
      body: JSON.stringify({ signature, message }),
    })
  }

  async signInWithEmail(email: string) {
    return this.request<{ success: boolean }>("/auth/email", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async verifyEmailToken(token: string) {
    return this.request<{ token: string; user: any }>("/auth/email/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
  }

  async getCurrentUser() {
    return this.request<Creator>("/auth/me")
  }

  // Campaign management
  async createCampaign(campaign: Partial<Campaign>) {
    return this.request<Campaign>("/campaigns", {
      method: "POST",
      body: JSON.stringify(campaign),
    })
  }

  async getCampaigns(creatorId: string) {
    return this.request<Campaign[]>(`/campaigns?creatorId=${creatorId}`)
  }

  async updateCampaign(id: string, updates: Partial<Campaign>) {
    return this.request<Campaign>(`/campaigns/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    })
  }

  // Analytics endpoints
  async getCreatorStats(creatorId: string, timeframe: "week" | "month" | "all" = "week") {
    return this.request<{
      clicks: number
      starts: number
      completions: number
      hqRate: number
      retention7d: number
      retention30d: number
      earnings: number
      sponsoredSpend: number
    }>(`/analytics/creator/${creatorId}?timeframe=${timeframe}`)
  }

  async getOnboardedUsers(creatorId: string, limit = 50) {
    return this.request<OnboardedUser[]>(`/analytics/onboarded?creatorId=${creatorId}&limit=${limit}`)
  }

  // Leaderboard endpoints
  async getLeaderboard(timeframe: "week" | "all" = "week") {
    return this.request<LeaderboardEntry[]>(`/leaderboard?timeframe=${timeframe}`)
  }

  // Farcaster integration
  async checkUsernameAvailability(username: string) {
    return this.request<{ available: boolean; suggestions?: string[] }>(`/farcaster/username/${username}`)
  }

  async searchUsers(query: string) {
    return this.request<Array<{ fid: number; username: string; displayName: string; pfp: string }>>(
      `/farcaster/search?q=${query}`,
    )
  }

  async getChannels() {
    return this.request<Array<{ id: string; name: string; description: string; imageUrl: string }>>(
      "/farcaster/channels",
    )
  }

  // Payment endpoints
  async createPaymentIntent(amount: number, currency: "USD" | "USDC" = "USD") {
    return this.request<{ clientSecret: string; paymentIntentId: string }>("/payments/intent", {
      method: "POST",
      body: JSON.stringify({ amount, currency }),
    })
  }

  async fundSponsoredBudget(creatorId: string, amount: number) {
    return this.request<{ success: boolean; newBalance: number }>("/payments/fund", {
      method: "POST",
      body: JSON.stringify({ creatorId, amount }),
    })
  }

  // Webhook configuration
  async updateWebhookConfig(creatorId: string, config: { url: string; events: string[] }) {
    return this.request<{ success: boolean }>(`/webhooks/${creatorId}`, {
      method: "PUT",
      body: JSON.stringify(config),
    })
  }

  // Export data
  async exportOnboardedUsers(creatorId: string, format: "csv" | "json" = "csv") {
    const response = await fetch(`${API_BASE_URL}/export/onboarded?creatorId=${creatorId}&format=${format}`)
    return response.blob()
  }
}

// Singleton instance
export const api = new ApiClient()

// Utility functions for common operations
export const formatCurrency = (amount: number, currency: "USD" | "USDC" = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "USDC" ? "USD" : currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(1)}%`
}

export const generateShortLink = (campaignId: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL || "https://leenks.app"}/join/${campaignId}`
}
