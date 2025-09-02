import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Users, DollarSign, Shield, TrendingUp, Zap, Star } from "lucide-react"

export default function HomePage() {
  // Mock leaderboard data
  const topCreators = [
    { rank: 1, name: "Alex Chen", handle: "alexchen", onboarded: 1247, avatar: "/abstract-profile.png" },
    { rank: 2, name: "Sarah Kim", handle: "sarahk", onboarded: 892, avatar: "/abstract-profile.png" },
    { rank: 3, name: "Mike Torres", handle: "miket", onboarded: 756, avatar: "/abstract-profile.png" },
    { rank: 4, name: "Emma Davis", handle: "emmad", onboarded: 634, avatar: "/abstract-profile.png" },
    { rank: 5, name: "James Wilson", handle: "jameswilson", onboarded: 521, avatar: "/abstract-profile.png" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Powered by Farcaster
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
              Onboard your friends to <span className="text-primary">Farcaster</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Create sponsor links that make it easy for new users to join Farcaster. Earn rewards while growing the
              network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/create">
                  Create Your Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/leaderboard">View Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Two Ways to Onboard</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose between unsponsored links where users pay, or sponsored campaigns where you cover the cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Unsponsored Card */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Unsponsored Links
                  </CardTitle>
                  <Badge variant="outline">$1.00</Badge>
                </div>
                <CardDescription>New users pay $1.00 to join Farcaster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-primary">$1.00</div>
                  <div className="text-sm text-muted-foreground">per new user</div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Users pay directly for their Farcaster account
                </div>
              </CardContent>
            </Card>

            {/* Sponsored Card */}
            <Card className="relative overflow-hidden border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Sponsored Links
                  </CardTitle>
                  <Badge className="bg-primary text-primary-foreground">$0.50</Badge>
                </div>
                <CardDescription>You sponsor new users for $0.50 each</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-primary">$0.50</div>
                  <div className="text-sm text-muted-foreground">per sponsored user</div>
                </div>
                <div className="text-xs text-muted-foreground text-center">30-day follow requirement applies</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to successfully onboard new users to Farcaster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Track clicks, conversions, retention, and earnings with detailed analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Custom Onboarding</CardTitle>
                <CardDescription>Set suggested follows, channels, and tutorial casts for new users.</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Flexible Payments</CardTitle>
                <CardDescription>Support for USDC on Base, Coinbase Pay, Apple Pay, and Stripe.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Top Onboarders</h2>
            <p className="text-lg text-muted-foreground">
              See who's leading the way in bringing new users to Farcaster.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                This Week's Leaders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map((creator) => (
                  <div key={creator.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                        {creator.rank}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{creator.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">@{creator.handle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{creator.onboarded.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">onboarded</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="/leaderboard">View Full Leaderboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to start onboarding?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Create your first link and start earning rewards for growing the Farcaster network.
          </p>
          <Button size="lg" asChild>
            <Link href="/create">
              Create Your Link
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
