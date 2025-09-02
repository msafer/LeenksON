// Core types for the Leenks platform
export interface User {
  id: string
  email?: string
  emailHash?: string
  wallet?: string
  fcFid?: number
  createdAt: string
}

export interface Creator {
  id: string
  fid: number
  handle: string
  name: string
  avatar?: string
  emailExportPref: boolean
  payoutWallet?: string
  role?: "user" | "admin"
}

export interface Campaign {
  id: string
  creatorId: string
  slug?: string
  type: "sponsored" | "unsponsored"
  budgetCap?: number
  requiredFollowIds: number[]
  suggestedFollows: Array<{ fid: number; handle: string; name: string }>
  channels: Array<{ id: string; name: string }>
  tutorialCasts: Array<{ url: string; title: string }>
  active: boolean
  createdAt: string
}

export interface Link {
  id: string
  campaignId: string
  shortPath: string
  active: boolean
  createdAt: string
}

export interface Onboard {
  id: string
  linkId: string
  userId: string
  type: "sponsored" | "unsponsored"
  status: "started" | "paid" | "created" | "finalized" | "retrocharged"
  fcUsername?: string
  universalChoice: "farcaster_only" | "universal"
  nameVector: Record<string, any>
  createdAt: string
}

export interface Metrics {
  creatorId: string
  date: string
  clicks: number
  starts: number
  conversions: number
  retention7d: number
  retention30d: number
  hqRate: number
}

export interface LeaderboardEntry {
  rank: number
  creatorId: string
  creator: Creator
  hqJoins: number
  score: number
  conversionRate: number
  avgCost?: number
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Auth types
export interface AuthState {
  user: Creator | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AdminStats {
  totalCreators: number
  totalOnboards: number
  totalRevenue: number
  activeLinks: number
  flaggedCreators: number
}

export interface CreatorProfile {
  creator: Creator
  metrics: {
    totalOnboards: number
    hqOnboards: number
    conversionRate: number
    totalEarnings: number
    avgCost: number
    retention7d: number
    retention30d: number
  }
  recentOnboards: Onboard[]
  campaigns: Campaign[]
  flags?: Array<{
    type: "suspicious_activity" | "low_quality" | "policy_violation"
    description: string
    createdAt: string
  }>
}
