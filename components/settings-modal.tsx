"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { user } = useAuth()
  const [emailExportPref, setEmailExportPref] = useState(user?.emailExportPref || false)
  const [webhookUrl, setWebhookUrl] = useState("")

  const handleSave = () => {
    console.log("[v0] Saving settings:", { emailExportPref, webhookUrl })
    // Here you would typically make an API call to update user settings
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account preferences and configuration</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Account Information</h3>
            <div className="space-y-2">
              <Label>Handle</Label>
              <div className="font-mono text-sm p-2 bg-muted rounded">@{user?.handle}</div>
            </div>
            <div className="space-y-2">
              <Label>FID</Label>
              <div className="font-mono text-sm p-2 bg-muted rounded">{user?.fid}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Preferences</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-export">Email Export Preference</Label>
              <Switch id="email-export" checked={emailExportPref} onCheckedChange={setEmailExportPref} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Integrations</h3>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-url.com"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
