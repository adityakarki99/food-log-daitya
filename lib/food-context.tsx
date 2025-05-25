"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface FoodEntry {
  id: string
  date: string
  time: string
  food: string
  notes: string
}

interface FoodContextType {
  entries: FoodEntry[]
  addEntry: (entry: Omit<FoodEntry, "id">) => void
  getEntriesByDate: (date: string) => FoodEntry[]
  getEntriesByDateRange: (startDate: string, endDate: string) => FoodEntry[]
}

const FoodContext = createContext<FoodContextType | undefined>(undefined)

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<FoodEntry[]>([])

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("food-entries")
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("food-entries", JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry: Omit<FoodEntry, "id">) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: Date.now().toString(),
    }
    setEntries((prev) => [...prev, newEntry])
  }

  const getEntriesByDate = (date: string) => {
    return entries.filter((entry) => entry.date === date)
  }

  const getEntriesByDateRange = (startDate: string, endDate: string) => {
    return entries.filter((entry) => entry.date >= startDate && entry.date <= endDate)
  }

  return (
    <FoodContext.Provider
      value={{
        entries,
        addEntry,
        getEntriesByDate,
        getEntriesByDateRange,
      }}
    >
      {children}
    </FoodContext.Provider>
  )
}

export function useFoodLogger() {
  const context = useContext(FoodContext)
  if (context === undefined) {
    throw new Error("useFoodLogger must be used within a FoodProvider")
  }
  return context
}
