"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, TestTube } from "lucide-react"

interface WebhookConfigModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WebhookConfigModal({ open, onOpenChange }: WebhookConfigModalProps) {
  const [webhooks, setWebhooks] = useState([
    {
      id: "1",
      url: "https://api.example.com/webhooks/leenks",
      events: ["onboard.created", "onboard.finalized"],
      active: true,
    },
  ])
  const [newWebhookUrl, setNewWebhookUrl] = useState("")

  const availableEvents = [
    { id: "onboard.created", label: "User Onboarded", description: "When a new user completes onboarding" },
    { id: "onboard.finalized", label: "Onboard Finalized", description: "When onboarding is fully processed" },
    { id: "payment.received", label: "Payment Received", description: "When payment is successfully processed" },
    { id: "campaign.budget_low", label: "Budget Low", description: "When sponsored campaign budget is running low" },
  ]

  const addWebhook = () => {
    if (!newWebhookUrl) return

    const newWebhook = {
      id: Date.now().toString(),
      url: newWebhookUrl,
      events: ["onboard.created"],
      active: true,
    }

    setWebhooks([...webhooks, newWebhook])
    setNewWebhookUrl("")
  }

  const removeWebhook = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id))
  }

  const toggleWebhook = (id: string) => {
    setWebhooks(webhooks.map((w) => (w.id === id ? { ...w, active: !w.active } : w)))
  }

  const testWebhook = (webhook: any) => {
    // TODO: Implement webhook testing
    console.log("Testing webhook:", webhook.url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Webhook Configuration</DialogTitle>
          <DialogDescription>
            Configure webhooks to receive real-time notifications about onboarding events.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Webhook */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Add Webhook</h3>
            <div className="flex gap-2">
              <Input
                placeholder="https://your-api.com/webhooks/leenks"
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addWebhook} disabled={!newWebhookUrl}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Existing Webhooks */}
          {webhooks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Configured Webhooks</h3>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{webhook.url}</code>
                        <Badge variant={webhook.active ? "default" : "secondary"}>
                          {webhook.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => testWebhook(webhook)}>
                          <TestTube className="w-4 h-4" />
                        </Button>
                        <Switch checked={webhook.active} onCheckedChange={() => toggleWebhook(webhook.id)} />
                        <Button variant="ghost" size="sm" onClick={() => removeWebhook(webhook.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Events</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {webhook.events.map((event) => (
                          <Badge key={event} variant="outline">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Events */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Events</h3>
            <div className="grid gap-3">
              {availableEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">{event.label}</div>
                    <div className="text-sm text-muted-foreground">{event.description}</div>
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{event.id}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
