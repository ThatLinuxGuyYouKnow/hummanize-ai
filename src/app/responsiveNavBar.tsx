"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";
import icon from "./logo.png";

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
                        <Image src={icon} alt="icon" height={40} width={40} />
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
                            className="text-sm font-medium hover:underline ease-out duration-300 transition-all underline-offset-4"
                        >
                            Features
                        </Link>
                        <Link
                            href="https://github.com/ThatLinuxGuyYouKnow/humanize-ai"
                            className="text-sm font-medium hover:underline ease-out duration-300 transition-all underline-offset-4"
                        >
                            <Github className="mr-2 inline-block h-4 w-4" /> GitHub
                        </Link>
                        <Button onClick={toggleMenu}>Get Started</Button>
                    </nav>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden absolute top-14 left-0 right-0 bg-background border-b border-border shadow-lg">
                            <nav className="flex flex-col p-4 space-y-2">
                                <Link
                                    href="#features"
                                    className="text-lg font-medium hover:underline underline-offset-4"
                                    onClick={toggleMenu}
                                >
                                    Features
                                </Link>
                                <Link
                                    href="https://github.com/ThatLinuxGuyYouKnow/humanize-ai"
                                    className="text-lg font-medium hover:underline underline-offset-4"
                                    onClick={toggleMenu}
                                >
                                    <Github className="mr-2 inline-block h-4 w-4" /> GitHub
                                </Link>
                                <Button onClick={toggleMenu}>Get Started</Button>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </ThemeProvider>
    );
}