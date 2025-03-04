"use client"

import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Bot, Sparkles, MessageSquare, Zap, Brain, Settings2 } from "lucide-react"
import Link from "next/link"
import { ApiKeyModal } from "./apiKeyModal"
import { useState } from "react"
import registerApiKey from "@/logic/registerApiKey"
import { ApiKeyStorageResults } from "./apiKeyStorageResultAlert"
import ResponsiveNavBar from "./responsiveNavBar"
export default function LandingPage() {

  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the API Key Modal
  const [isStorageResultOpen, setIsStorageResultOpen] = useState(false); // Controls the Storage Results Modal
  const [isSuccessfulStorage, setIsSuccessfulStorage] = useState(false); // Tracks if the API key was stored successfully

  // Function to open the API Key Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the API Key Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle API key submission
  const handleApiKeySubmit = async (apiKey: string) => {
    try {
      const success = await registerApiKey(apiKey); // Call the API key registration function
      setIsSuccessfulStorage(success); // Set the success status
      setIsStorageResultOpen(true); // Open the Storage Results Modal
    } catch (error) {
      console.error("Error storing API key:", error);
      setIsSuccessfulStorage(false); // Set as failure
      setIsStorageResultOpen(true); // Open the Storage Results Modal
    } finally {
      closeModal(); // Close the API Key Modal
    }
  };

  // Function to close the Storage Results Modal
  const closeStorageResultModal = () => {
    setIsStorageResultOpen(false);
    setIsSuccessfulStorage(false); // Reset the success status
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="dark">
        <div className="min-h-screen container mx-auto bg-background text-foreground">
          <ResponsiveNavBar />
          <ApiKeyModal
            isOpen={isModalOpen} // Pass the modal state
            onClose={closeModal} // Pass the close function
            onSubmit={handleApiKeySubmit} // Pass the submit function
          />
          <ApiKeyStorageResults
            isOpen={isStorageResultOpen}
            isSuccessfulStorage={isSuccessfulStorage}
            onClose={closeStorageResultModal}
          />

          <main className="">
            <section className="container mx-auto py-20 space-y-8 text-center my-20">
              <div className="space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Open-source AI{" "}
                  <h2 className="shimmer-text inline">text humanization</h2>
                  <span className="text-primary"> for everyone</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                  Transform robotic AI responses into natural, engaging conversations with our open-source humanization
                  engine. Bring your own API key and start humanizing!
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={openModal} size="lg">Get started</Button>
                <Button size="lg" variant="outline">
                  View demo
                </Button>
              </div>
              <div className="relative mx-auto max-w-4xl pt-16">
                <div className="rounded-lg border bg-background shadow-xl">
                  <div className="flex flex-col space-y-4 p-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Original AI Text:</p>
                      <div className="rounded-md bg-muted p-4 text-sm">
                        The weather conditions today indicate a high probability of precipitation with temperatures
                        ranging between 15-20 degrees Celsius.
                      </div>
                    </div>
                    <Sparkles className="h-6 w-6 mx-auto text-primary" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Humanized Version:</p>
                      <div className="rounded-md bg-primary/10 p-4 text-sm">
                        Looks like we&apos;re in for some rain today! Expect it to be pretty mild, with temps hovering around
                        the mid-60s Fahrenheit.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="features" className="container py-24 space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features that make the difference
                </h2>
                <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                  Transform your AI communications with our powerful humanization tools
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="relative p-6 rounded-lg border border-border bg-card hover:cursor-pointer hover:scale-105 transition-transform ease-in-out "
                  >
                    <div className="space-y-2">
                      <feature.icon className="h-12 w-12 text-primary" />
                      <h3 className="font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-border bg-muted/50">
              <div className="container py-24 space-y-8 shimmer-border">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                  <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                    Everything you need to know about humanize.ai
                  </p>
                </div>
                <Accordion type="single" collapsible className="max-w-2xl mx-auto">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            <section className="border-t">
              <div className="container py-24 space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to get started?</h2>
                  <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                    Join our open-source community and start humanizing your AI communications today
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button size="lg">Start for free</Button>
                  <Button size="lg" variant="outline">
                    Contact sales
                  </Button>
                </div>
              </div>
            </section>
          </main>

          <footer className="border-t border-border py-12">
            <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <span className="font-bold">humanize.ai</span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Open-source AI humanization, empowering developers to create more natural conversations.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      API
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/thatlinuxguyyouknow/humanize-ai"
                      className="text-muted-foreground hover:underline"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:underline">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}

const features = [
  {
    title: "Natural Language Processing",
    description: "AI algorithms that understand context and tone to create more natural-sounding text",
    icon: Brain,
  },
  {
    title: "Real-time Conversion",
    description: "Transform AI-generated text into human-like content instantly",
    icon: Zap,
  },
  {
    title: "Tone Adjustment",
    description: "Customize the tone and style of the output to match your brand voice",
    icon: Settings2,
  },
  {
    title: "Multi-language Support",
    description: "Humanize AI text across multiple languages while maintaining natural flow",
    icon: MessageSquare,
  },

]

const faqs = [
  {
    question: "How does humanize.ai work?",
    answer:
      "Our platform uses natural language processing to analyze AI-generated text and transform it into more natural, human-like content while preserving the original meaning.",
  },
  {
    question: "What languages do you support?",
    answer:
      "We currently support English, Spanish, French, German, and Italian, with more languages being added regularly.",
  },
  {
    question: "How do I use my own API key?",
    answer:
      "After signing up, you can enter your OpenAI API key in the settings page. Our open-source solution uses this key to interact with the AI models securely.",
  },
]

