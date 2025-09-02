"use client"

import { useAuth } from "@/lib/auth-context"
import { mockAdminStats, mockCreatorProfiles } from "@/lib/dev-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, DollarSign, Link, AlertTriangle, TrendingUp, Eye } from "lucide-react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"

export default function AdminPage() {
  const { user, isAdmin } = useAuth()
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">You don't have admin privileges.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedProfile = selectedCreator ? mockCreatorProfiles.find((p) => p.creator.id === selectedCreator) : null

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform activity and creator performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminStats.totalCreators.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Onboards</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminStats.totalOnboards.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockAdminStats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Links</CardTitle>
              <Link className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminStats.activeLinks}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockAdminStats.flaggedCreators}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Creator List */}
          <Card>
            <CardHeader>
              <CardTitle>Creator Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCreatorProfiles.map((profile) => (
                  <div
                    key={profile.creator.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCreator(profile.creator.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{profile.creator.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p
                            className="font-medium hover:text-primary cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`https://warpcast.com/${profile.creator.handle}`, "_blank")
                            }}
                          >
                            {profile.creator.name}
                          </p>
                          {profile.flags && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">@{profile.creator.handle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{profile.metrics.hqOnboards} HQ</p>
                      <p className="text-sm text-muted-foreground">
                        {(profile.metrics.conversionRate * 100).toFixed(1)}% conv
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Creator Detail */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedProfile ? "Creator Details" : "Select a Creator"}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProfile ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedProfile.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedProfile.creator.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedProfile.creator.name}</h3>
                      <p className="text-muted-foreground">@{selectedProfile.creator.handle}</p>
                      <p className="text-sm text-muted-foreground">FID: {selectedProfile.creator.fid}</p>
                    </div>
                  </div>

                  {selectedProfile.flags && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-800">Flagged Activity</span>
                      </div>
                      {selectedProfile.flags.map((flag, index) => (
                        <p key={index} className="text-sm text-red-700">
                          {flag.description}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">{selectedProfile.metrics.totalOnboards}</p>
                      <p className="text-sm text-muted-foreground">Total Onboards</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">{selectedProfile.metrics.hqOnboards}</p>
                      <p className="text-sm text-muted-foreground">HQ Onboards</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">${selectedProfile.metrics.totalEarnings.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground">Earnings</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">{(selectedProfile.metrics.conversionRate * 100).toFixed(1)}%</p>
                      <p className="text-sm text-muted-foreground">Conversion</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://warpcast.com/${selectedProfile.creator.handle}`, "_blank")}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Click on a creator to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
