"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import icon from "./logo.png"
import { Settings, Key, Trash2 } from "lucide-react"
import { ApiKeyStorageResults } from "./apiKeyStorageResultAlert"
import registerApiKey from "@/logic/registerApiKey"

export default function SettingsScreen() {
    const [apiKey, setApiKey] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccessfulStorage, setIsSuccessfulStorage] = useState(false)

    const handleSetApiKey = () => {

        try {
            registerApiKey(apiKey)
            setIsSuccessfulStorage(true)
        } catch (error) {
            setIsSuccessfulStorage(false)
            console.log(error)
        }
        setIsModalOpen(true)
        setApiKey("")
    }

    const handleClearApiKey = () => {

        try {
            document.cookie = "apiKey=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure"
            alert('Deleted ApiKey')
        } catch (error) {
            setIsSuccessfulStorage(false)
            console.log(error)
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image src={icon || "/placeholder.svg"} alt="icon" height={120} width={120} />
                        <span className="text-lg font-bold">humanize.ai</span>
                    </Link>
                    <nav className="flex items-center space-x-6">
                        <Link href="/humanize" className="text-sm font-medium hover:underline underline-offset-4">
                            Humanize
                        </Link>

                    </nav>
                </div>
            </header>

            <main className="container mx-auto p-6 space-y-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h1 className="text-4xl font-bold flex items-center gap-2">
                        <Settings className="h-8 w-8" />
                        Settings
                    </h1>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <Key className="h-6 w-6" />
                                API Key Management
                            </h2>
                            <div className="space-y-2">
                                <Label htmlFor="api-key">Set New API Key</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="api-key"
                                        type="password"
                                        placeholder="Enter your API key"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="flex-grow bg-gray-900 border-white/10 text-white"
                                    />
                                    <Button onClick={handleSetApiKey} className="bg-primary hover:bg-primary/90">
                                        Set Key
                                    </Button>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button onClick={handleClearApiKey} variant="destructive" className="flex items-center gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    Clear Stored API Key
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ApiKeyStorageResults isOpen={isModalOpen} isSuccessfulStorage={isSuccessfulStorage} onClose={closeModal} />
        </div>
    )
}

