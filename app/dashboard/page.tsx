"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { WebhookConfigModal } from "@/components/dashboard/webhook-config-modal"
import { FundingModal } from "@/components/dashboard/funding-modal"
import { EditCampaignModal } from "@/components/dashboard/edit-campaign-modal"
import {
  TrendingUp,
  DollarSign,
  MousePointer,
  UserCheck,
  Target,
  Calendar,
  Download,
  Settings,
  Plus,
  ExternalLink,
  Copy,
} from "lucide-react"

// Mock data for dashboard
const mockMetrics = {
  clicks: 12847,
  starts: 3421,
  completions: 2156,
  hqRate: 0.78,
  retention7d: 0.85,
  retention30d: 0.72,
  earnings: 862.4,
  sponsoredSpend: 245.5,
  conversionRate: 0.63,
}

const mockOnboardedUsers = [
  {
    id: "1",
    email: "a***@gmail.com",
    username: "alexchen",
    linkSource: "fx.ob/@creator",
    status: "finalized",
    createdAt: "2024-01-15T10:30:00Z",
    type: "unsponsored",
  },
  {
    id: "2",
    email: "s***@yahoo.com",
    username: "sarahkim",
    linkSource: "fx.ob/@creator/winter",
    status: "created",
    createdAt: "2024-01-15T09:15:00Z",
    type: "sponsored",
  },
  {
    id: "3",
    email: "m***@outlook.com",
    username: "miketorres",
    linkSource: "fx.ob/@creator",
    status: "finalized",
    createdAt: "2024-01-14T16:45:00Z",
    type: "unsponsored",
  },
  {
    id: "4",
    email: "e***@gmail.com",
    username: "emmadavis",
    linkSource: "fx.ob/@creator/promo",
    status: "retrocharged",
    createdAt: "2024-01-14T14:20:00Z",
    type: "sponsored",
  },
  {
    id: "5",
    email: "j***@proton.me",
    username: "jameswilson",
    linkSource: "fx.ob/@creator",
    status: "finalized",
    createdAt: "2024-01-14T11:10:00Z",
    type: "unsponsored",
  },
]

const mockCampaigns = [
  {
    id: "1",
    name: "Main Link",
    type: "unsponsored",
    shortPath: "fx.ob/@creator",
    clicks: 8234,
    conversions: 1456,
    active: true,
  },
  {
    id: "2",
    name: "Winter Campaign",
    type: "sponsored",
    shortPath: "fx.ob/@creator/winter",
    clicks: 2341,
    conversions: 423,
    active: true,
    budget: 500,
    spent: 156.5,
  },
  {
    id: "3",
    name: "Promo Link",
    type: "sponsored",
    shortPath: "fx.ob/@creator/promo",
    clicks: 2272,
    conversions: 277,
    active: false,
    budget: 200,
    spent: 89,
  },
]

export default function DashboardPage() {
  const [showWebhookModal, setShowWebhookModal] = useState(false)
  const [showFundingModal, setShowFundingModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      finalized: "default",
      created: "secondary",
      paid: "outline",
      started: "outline",
      retrocharged: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log("[v0] Copied to clipboard:", text)
  }

  const openCampaignLink = (shortPath: string) => {
    const fullUrl = `https://${shortPath}`
    window.open(fullUrl, "_blank")
  }

  const editCampaign = (campaign: any) => {
    setEditingCampaign(campaign)
    setShowEditModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your onboarding performance and manage campaigns</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button onClick={() => setShowWebhookModal(true)} variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Webhooks
            </Button>
            <Button onClick={() => setShowFundingModal(true)} variant="outline">
              <DollarSign className="w-4 h-4 mr-2" />
              Funding
            </Button>
            <Button asChild>
              <a href="/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Link
              </a>
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.clicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.completions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {(mockMetrics.conversionRate * 100).toFixed(1)}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">HQ Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockMetrics.hqRate * 100).toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">High-quality onboards</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockMetrics.earnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From unsponsored links</p>
            </CardContent>
          </Card>
        </div>

        {/* Retention & Spend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">7-Day Retention</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockMetrics.retention7d * 100).toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Users still active after 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">30-Day Retention</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockMetrics.retention30d * 100).toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Users still active after 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sponsored Spend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockMetrics.sponsoredSpend.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total campaign investment</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="onboarded" className="space-y-6">
          <TabsList>
            <TabsTrigger value="onboarded">Recent Onboards</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="onboarded" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Onboards</CardTitle>
                    <CardDescription>Last 50 users who joined through your links</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Link Source</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOnboardedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">@{user.username}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{user.linkSource}</TableCell>
                        <TableCell>
                          <Badge variant={user.type === "sponsored" ? "default" : "secondary"}>{user.type}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Campaigns</CardTitle>
                    <CardDescription>Manage your onboarding links and campaigns</CardDescription>
                  </div>
                  <Button asChild>
                    <a href="/create">
                      <Plus className="w-4 h-4 mr-2" />
                      New Campaign
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{campaign.name}</h3>
                            <Badge variant={campaign.type === "sponsored" ? "default" : "secondary"}>
                              {campaign.type}
                            </Badge>
                            {!campaign.active && <Badge variant="outline">Inactive</Badge>}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="font-mono">{campaign.shortPath}</span>
                            <span>{campaign.clicks.toLocaleString()} clicks</span>
                            <span>{campaign.conversions.toLocaleString()} conversions</span>
                            {campaign.type === "sponsored" && (
                              <span>
                                ${campaign.spent?.toFixed(2)} / ${campaign.budget?.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(`https://${campaign.shortPath}`)}
                          title="Copy link"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openCampaignLink(campaign.shortPath)}
                          title="Open link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => editCampaign(campaign)} title="Edit campaign">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <WebhookConfigModal open={showWebhookModal} onOpenChange={setShowWebhookModal} />
      <FundingModal open={showFundingModal} onOpenChange={setShowFundingModal} />
      <EditCampaignModal open={showEditModal} onOpenChange={setShowEditModal} campaign={editingCampaign} />
    </div>
  )
}
