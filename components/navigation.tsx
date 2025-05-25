"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Plus, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/log", label: "Log Food", icon: Plus },
    { href: "/records", label: "View Records", icon: FileText },
  ]

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-black">
            Food Logger
          </Link>
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-black",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
