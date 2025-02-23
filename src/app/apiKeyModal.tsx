"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ApiKeyModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (apiKey: string) => void
}

export function ApiKeyModal({ isOpen, onClose, onSubmit }: ApiKeyModalProps) {
    const [apiKey, setApiKey] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(apiKey)
        setApiKey("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter your API Key</DialogTitle>
                    <DialogDescription>
                        Please enter your Gemini API key to start using humanize.ai. Your key is stored locally and never sent to
                        our servers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="api-key" className="text-right">
                                API Key
                            </Label>
                            <Input
                                id="api-key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="col-span-3"
                                type="password"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col items-center gap-2">
                        <Button type="submit" className="w-full">
                            Save API Key
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an API key? Get one{" "}
                            <a
                                href="https://ai.google.dev"
                                className="underline text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                here
                            </a>
                        </p>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

