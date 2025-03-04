"use client"

import { useState } from "react"
import { ThemeProvider } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import icon from './logo.png'

export default function ResponsiveNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={icon} alt="icon" height={120} width={120} />
                        <span className="font-bold">humanize.ai</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        <Link
                            href="#features"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-medium hover:underline ease-out duration-300 transition-all underline-offset-4"
                        >
                            How it works
                        </Link>
                        <Link href="/hummanize">
                            <Button>Get Started</Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Overlay */}
                    {isMenuOpen && (
                        <div className="md:hidden fixed inset-0 top-14 bg-background/95 backdrop-blur">
                            <nav className="flex flex-col p-4 space-y-4">
                                <Link
                                    href="#features"
                                    className="text-lg font-medium hover:underline underline-offset-4"
                                    onClick={toggleMenu}
                                >
                                    Features
                                </Link>
                                <Link
                                    href="#how-it-works"
                                    className="text-lg font-medium hover:underline underline-offset-4"
                                    onClick={toggleMenu}
                                >
                                    How it works
                                </Link>
                                <Link href="/hummanize" onClick={toggleMenu}>
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </ThemeProvider>
    )
}