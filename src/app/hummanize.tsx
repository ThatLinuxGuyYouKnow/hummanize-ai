"use client"; // Add this directive at the top of the file

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import Image from "next/image";
import icon from "./logo.png";
import { Settings, Sparkles } from "lucide-react";
import humanizeText from "@/logic/hummanize";

export default function HumanizeScreen() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [tone, setTone] = useState("");
    const [language, setLanguage] = useState("");
    const [creativityValue, setCreativityValue] = useState(50);

    const handleHumanize = async () => {
        if (inputText.trim() === "") return; // Prevent empty input
        const humanizedText = await humanizeText({
            text: inputText,
            tone: tone,
            creativityIndex: creativityValue,
            outputLanguage: language,
            preserveKeywords: true,
            enhanceClarity: true
        });
        setOutputText(humanizedText);
    };

    const tones = ["Casual", "Formal", "Friendly", "Professional"];
    const languages = ["English", "Spanish", "French", "German", "Italian"];

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image src={icon || "/placeholder.svg"} alt="icon" height={100} width={100} />
                        <span className="text-lg font-bold">humanize.ai</span>
                    </Link>
                    <Link href="/settings" className="flex items-center space-x-3">
                        <Settings />
                    </Link>
                </div>
            </header>
            <main className="container mx-auto p-6 space-y-8">
                <h1 className="text-4xl font-bold text-center mt-10 mb-20">Humanize Your Text</h1>
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Controls Section */}
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="tone" id="tone-label" className="mb-2 block">
                                Tone
                            </Label>
                            <div className="flex flex-wrap gap-2" aria-labelledby="tone-label">
                                {tones.map((t) => (
                                    <Button
                                        key={t}
                                        variant={tone === t ? "default" : "outline"}
                                        onClick={() => setTone(t)}
                                        className={`rounded-full bg-black text-white border ${tone === t ? "font-bold border-white" : "border-white/10"}`}
                                    >
                                        {t}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="language" id="language-label" className="mb-2 block">
                                Output Language
                            </Label>
                            <div className="flex flex-wrap gap-2" aria-labelledby="language-label">
                                {languages.map((lang) => (
                                    <Button
                                        key={lang}
                                        variant={language === lang ? "default" : "outline"}
                                        onClick={() => setLanguage(lang)}
                                        className={`rounded-full bg-black text-white border ${language === lang ? "font-bold border-white" : "border-white/10"}`}
                                    >
                                        {lang}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="creativity" className="mb-2 block">
                                Creativity Level
                            </Label>
                            <div className="flex items-center gap-2">
                                <span>{creativityValue}%</span>
                                <Slider
                                    id="creativity"
                                    min={0}
                                    max={100}
                                    step={1}
                                    defaultValue={[50]}
                                    onValueChange={(value) => setCreativityValue(value[0])}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Switch id="preserve-keywords" />
                            <Label htmlFor="preserve-keywords" title="Ensure important keywords remain unchanged">
                                Preserve Keywords
                            </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Switch id="enhance-clarity" />
                            <Label htmlFor="enhance-clarity" title="Improve the readability and clarity of the output">
                                Enhance Clarity
                            </Label>
                        </div>
                    </div>
                    {/* Text Input/Output Section */}
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="input-text" className="mb-2 block">
                                Text to Humanize
                            </Label>
                            <Textarea
                                id="input-text"
                                placeholder="Enter your text here..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="h-36 border border-white/10 text-white"
                            />
                        </div>
                        <Button
                            onClick={handleHumanize}
                            className={`w-full bg-white text-black hover:bg-white/90 ${inputText.trim().length > 5 ? "shimmer-border" : "border-gray-400"
                                }`}
                            disabled={inputText.trim() === ""}
                        >
                            Humanize
                        </Button>
                        <div>
                            <Label htmlFor="output-text" className="mb-2 block">
                                Humanized Text
                            </Label>
                            <div className="relative">
                                <Textarea
                                    id="output-text"
                                    value={outputText}
                                    readOnly
                                    placeholder="Humanized text will appear here..."
                                    className="h-36 border border-white/10 text-white"
                                />
                                <Sparkles className="absolute top-2 right-2 h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}