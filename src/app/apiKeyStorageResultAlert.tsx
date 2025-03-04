"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ApiKeyStorageResultsProps {
    isOpen: boolean
    isSuccessfulStorage: boolean
    onClose: () => void
}

export function ApiKeyStorageResults({ isOpen, onClose, isSuccessfulStorage }: ApiKeyStorageResultsProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isSuccessfulStorage ? "API Key Stored Successfully" : "API Key Storage Failed"}</DialogTitle>
                    <DialogDescription>
                        {isSuccessfulStorage
                            ? "We've successfully stored your API key."
                            : "Oh no, we couldn't store your API key. Please try again."}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col items-center gap-2">
                    <Button onClick={() => {
                        onClose();
                        if (isSuccessfulStorage) {
                            window.location.reload();
                        }
                    }} className="w-full">
                        Okay
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

