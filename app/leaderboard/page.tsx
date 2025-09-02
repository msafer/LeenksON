"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { mockLeaderboard } from "@/lib/dev-data"
import { Trophy, TrendingUp, Users, Target, DollarSign, ExternalLink, Crown, Medal, Award } from "lucide-react"

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("week")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground bg-muted rounded-full">
            {rank}
          </span>
        )
    }
  }

  const weeklyData = mockLeaderboard
  const allTimeData = mockLeaderboard.map((entry) => ({
    ...entry,
    hqJoins: entry.hqJoins * 5,
    score: entry.score * 1.2,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Top creators bringing high-quality users to Farcaster
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Creators</span>
              </div>
              <div className="text-xl font-bold mt-1">2,847</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">HQ Onboards</span>
              </div>
              <div className="text-xl font-bold mt-1">45.2K</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Avg Conv</span>
              </div>
              <div className="text-xl font-bold mt-1">68.4%</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Earnings</span>
              </div>
              <div className="text-xl font-bold mt-1">$18K</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="p-4 pb-0">
                <TabsList className="grid w-full grid-cols-2 rounded-xl">
                  <TabsTrigger value="week" className="rounded-lg">
                    This Week
                  </TabsTrigger>
                  <TabsTrigger value="alltime" className="rounded-lg">
                    All Time
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="week" className="mt-0">
                <div className="space-y-0">
                  {weeklyData.map((entry, index) => (
                    <div
                      key={entry.creator.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">{getRankIcon(entry.rank)}</div>
                        <Avatar
                          className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                          onClick={() => window.open(`https://warpcast.com/${entry.creator.handle}`, "_blank")}
                        >
                          <AvatarImage src={entry.creator.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{entry.creator.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p
                            className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors truncate"
                            onClick={() => window.open(`https://warpcast.com/${entry.creator.handle}`, "_blank")}
                          >
                            @{entry.creator.handle}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <span>{entry.hqJoins} HQ</span>
                            <span>{(entry.conversionRate * 100).toFixed(0)}% conv</span>
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              ${entry.avgCost?.toFixed(2)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">${(entry.hqJoins * 0.5).toFixed(0)}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full bg-muted/50"
                          onClick={() => window.open(`https://warpcast.com/${entry.creator.handle}`, "_blank")}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alltime" className="mt-0">
                <div className="space-y-0">
                  {allTimeData.map((entry, index) => (
                    <div
                      key={entry.creator.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">{getRankIcon(entry.rank)}</div>
                        <Avatar
                          className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                          onClick={() => window.open(`https://warpcast.com/${entry.creator.handle}`, "_blank")}
                        >
                          <AvatarImage src={entry.creator.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{entry.creator.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p
                            className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors truncate"
                            onClick={() => window.open(`https://warpcast.com/${entry.creator.handle}`, "_blank")}
                          >
                            @{entry.creator.handle}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <span>{entry.hqJoins} HQ</span>
                            <span>{(entry.conversionRate * 100).toFixed(0)}% conv</span>
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              All-time
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">${(entry.hqJoins * 0.5).toFixed(0)}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full bg-muted/50"
                          onClick={() => window.open(`https://warpcast.com/${entry.creator.handle}`, "_blank")}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* How Rankings Work */}
        <Card className="mt-6 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">How Rankings Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-sm">High-Quality (HQ) Criteria</h4>
                <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Posted at least 1 cast within 14 days</li>
                  <li>• Follows 3+ accounts within 14 days</li>
                  <li>• Received or gave 1+ reaction within 14 days</li>
                  <li>• Still follows sponsoring creator at day 14 (sponsored only)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-sm">Ranking Factors</h4>
                <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Total high-quality onboards (primary)</li>
                  <li>• HQ rate (quality vs quantity balance)</li>
                  <li>• Conversion rate (clicks to completions)</li>
                  <li>• Retention metrics (7-day and 30-day)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <h3 className="text-lg font-semibold mb-2">Want to join the leaderboard?</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Start creating onboarding links and earn rewards for quality referrals.
          </p>
          <Button size="lg" className="rounded-xl" asChild>
            <a href="/create">Create Your First Link</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
