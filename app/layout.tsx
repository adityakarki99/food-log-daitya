import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { FoodProvider } from "@/lib/food-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Food Logger",
  description: "Simple food logging application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FoodProvider>
          <div className="min-h-screen bg-white">
            <Navigation />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </FoodProvider>
      </body>
    </html>
  )
}
