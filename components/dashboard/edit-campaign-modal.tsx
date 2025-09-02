"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface EditCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign: any
}

export function EditCampaignModal({ open, onOpenChange, campaign }: EditCampaignModalProps) {
  const [name, setName] = useState(campaign?.name || "")
  const [active, setActive] = useState(campaign?.active || false)
  const [budget, setBudget] = useState(campaign?.budget || 0)

  if (!campaign) return null

  const handleSave = () => {
    console.log("[v0] Saving campaign:", { name, active, budget })
    // Here you would typically make an API call to update the campaign
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
          <DialogDescription>Update your campaign settings and configuration</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter campaign name"
            />
          </div>

          <div className="space-y-2">
            <Label>Campaign Type</Label>
            <Badge variant={campaign.type === "sponsored" ? "default" : "secondary"}>{campaign.type}</Badge>
          </div>

          <div className="space-y-2">
            <Label>Short Path</Label>
            <div className="font-mono text-sm p-2 bg-muted rounded">{campaign.shortPath}</div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active-toggle">Active Campaign</Label>
            <Switch id="active-toggle" checked={active} onCheckedChange={setActive} />
          </div>

          {campaign.type === "sponsored" && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USDC)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  placeholder="Enter budget amount"
                />
                <div className="text-sm text-muted-foreground">Spent: ${campaign.spent?.toFixed(2) || "0.00"}</div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
