import type { Creator, Onboard, LeaderboardEntry, CreatorProfile, AdminStats } from "./types"

export const mockCreators: Creator[] = [
  {
    id: "1",
    fid: 12345,
    handle: "cryptobuilder",
    name: "Crypto Builder",
    avatar: "/crypto-builder.png",
    emailExportPref: true,
    role: "user",
  },
  {
    id: "2",
    fid: 67890,
    handle: "nftartist",
    name: "NFT Artist",
    avatar: "/nft-artist.png",
    emailExportPref: false,
    role: "user",
  },
  {
    id: "3",
    fid: 11111,
    handle: "defidev",
    name: "DeFi Developer",
    avatar: "/defi-developer.png",
    emailExportPref: true,
    role: "user",
  },
]

export const mockOnboards: Onboard[] = [
  {
    id: "1",
    linkId: "link1",
    userId: "user1",
    type: "sponsored",
    status: "finalized",
    fcUsername: "newuser1",
    universalChoice: "farcaster_only",
    nameVector: {},
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    linkId: "link1",
    userId: "user2",
    type: "unsponsored",
    status: "created",
    fcUsername: "newuser2",
    universalChoice: "universal",
    nameVector: {},
    createdAt: "2024-01-14T15:45:00Z",
  },
]

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    creatorId: "1",
    creator: mockCreators[0],
    hqJoins: 156,
    score: 98.5,
    conversionRate: 0.78,
    avgCost: 0.45,
  },
  {
    rank: 2,
    creatorId: "2",
    creator: mockCreators[1],
    hqJoins: 134,
    score: 92.1,
    conversionRate: 0.71,
    avgCost: 0.52,
  },
  {
    rank: 3,
    creatorId: "3",
    creator: mockCreators[2],
    hqJoins: 98,
    score: 87.3,
    conversionRate: 0.65,
    avgCost: 0.48,
  },
]

export const mockAdminStats: AdminStats = {
  totalCreators: 1247,
  totalOnboards: 8934,
  totalRevenue: 4467.5,
  activeLinks: 342,
  flaggedCreators: 12,
}

export const mockCreatorProfiles: CreatorProfile[] = mockCreators.map((creator) => ({
  creator,
  metrics: {
    totalOnboards: Math.floor(Math.random() * 200) + 50,
    hqOnboards: Math.floor(Math.random() * 150) + 30,
    conversionRate: Math.random() * 0.5 + 0.4,
    totalEarnings: Math.random() * 1000 + 100,
    avgCost: Math.random() * 0.3 + 0.3,
    retention7d: Math.random() * 0.4 + 0.6,
    retention30d: Math.random() * 0.3 + 0.4,
  },
  recentOnboards: mockOnboards.slice(0, 2),
  campaigns: [],
  flags:
    Math.random() > 0.7
      ? [
          {
            type: "suspicious_activity",
            description: "Unusual spike in low-quality onboards",
            createdAt: "2024-01-10T12:00:00Z",
          },
        ]
      : undefined,
}))
