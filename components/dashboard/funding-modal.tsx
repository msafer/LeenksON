"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Plus, Minus, Wallet, CreditCard } from "lucide-react"

interface FundingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FundingModal({ open, onOpenChange }: FundingModalProps) {
  const [fundAmount, setFundAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  // Mock funding data
  const mockBalance = {
    available: 1247.5,
    pending: 89.25,
    totalEarnings: 2156.75,
  }

  const mockTransactions = [
    { id: "1", type: "earning", amount: 12.4, description: "31 unsponsored onboards", date: "2024-01-15" },
    { id: "2", type: "spend", amount: -25.5, description: "51 sponsored onboards", date: "2024-01-15" },
    { id: "3", type: "deposit", amount: 500, description: "USDC deposit", date: "2024-01-14" },
    { id: "4", type: "earning", amount: 8.8, description: "22 unsponsored onboards", date: "2024-01-14" },
  ]

  const handleFund = () => {
    if (!fundAmount) return
    // TODO: Implement funding logic
    console.log("Funding:", fundAmount)
    setFundAmount("")
  }

  const handleWithdraw = () => {
    if (!withdrawAmount) return
    // TODO: Implement withdrawal logic
    console.log("Withdrawing:", withdrawAmount)
    setWithdrawAmount("")
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earning":
        return <Plus className="w-4 h-4 text-green-500" />
      case "spend":
        return <Minus className="w-4 h-4 text-red-500" />
      case "deposit":
        return <Wallet className="w-4 h-4 text-blue-500" />
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Funding & Earnings</DialogTitle>
          <DialogDescription>Manage your sponsored campaign funding and track earnings.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="balance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="fund">Fund Campaigns</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Available Balance
                  </CardTitle>
                  <CardDescription>Funds available for sponsored campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">${mockBalance.available.toFixed(2)}</div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pending Earnings</CardTitle>
                    <CardDescription>Processing from recent onboards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${mockBalance.pending.toFixed(2)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Earnings</CardTitle>
                    <CardDescription>All-time earnings from onboards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${mockBalance.totalEarnings.toFixed(2)}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setWithdrawAmount(mockBalance.available.toString())}
                >
                  Withdraw All
                </Button>
                <Button onClick={() => onOpenChange(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fund" className="space-y-4">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Funds
                  </CardTitle>
                  <CardDescription>Deposit USDC to fund sponsored campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fund-amount">Amount (USDC)</Label>
                    <Input
                      id="fund-amount"
                      type="number"
                      placeholder="100.00"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleFund} disabled={!fundAmount} className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Fund with USDC
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Minus className="w-5 h-5" />
                    Withdraw Earnings
                  </CardTitle>
                  <CardDescription>Withdraw your earnings to your wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Amount (USDC)</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="50.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      max={mockBalance.available}
                    />
                  </div>
                  <Button
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Withdraw to Wallet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your funding and earning history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
