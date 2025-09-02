"use client"

import { useState, useEffect } from "react"
import { api } from "../api"

// Generic hook for API calls with loading and error states
export function useApi<T>(
  apiCall: () => Promise<{ data: T; success: boolean; error?: string }>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()

      if (response.success) {
        setData(response.data)
      } else {
        setError(response.error || "Unknown error")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true

    fetchData()

    return () => {
      mounted = false
    }
  }, dependencies)

  return { data, loading, error, refetch: () => fetchData() }
}

// Specific hooks for common API calls
export function useCreatorStats(creatorId: string, timeframe: "week" | "month" | "all" = "week") {
  return useApi(() => api.getCreatorStats(creatorId, timeframe), [creatorId, timeframe])
}

export function useLeaderboard(timeframe: "week" | "all" = "week") {
  return useApi(() => api.getLeaderboard(timeframe), [timeframe])
}

export function useOnboardedUsers(creatorId: string, limit = 50) {
  return useApi(() => api.getOnboardedUsers(creatorId, limit), [creatorId, limit])
}

export function useCampaigns(creatorId: string) {
  return useApi(() => api.getCampaigns(creatorId), [creatorId])
}
