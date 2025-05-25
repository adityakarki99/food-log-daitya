"use client"

import { useState } from "react"
import { useFoodLogger } from "@/lib/food-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, FileText } from "lucide-react"

type ViewType = "daily" | "weekly" | "monthly"

export default function RecordsPage() {
  const { entries, getEntriesByDate, getEntriesByDateRange } = useFoodLogger()
  const [viewType, setViewType] = useState<ViewType>("daily")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const getDisplayEntries = () => {
    const date = new Date(selectedDate)

    switch (viewType) {
      case "daily":
        return getEntriesByDate(selectedDate)

      case "weekly":
        const startOfWeek = new Date(date)
        startOfWeek.setDate(date.getDate() - date.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        return getEntriesByDateRange(startOfWeek.toISOString().split("T")[0], endOfWeek.toISOString().split("T")[0])

      case "monthly":
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        return getEntriesByDateRange(startOfMonth.toISOString().split("T")[0], endOfMonth.toISOString().split("T")[0])

      default:
        return []
    }
  }

  const displayEntries = getDisplayEntries()

  const getDateRangeText = () => {
    const date = new Date(selectedDate)

    switch (viewType) {
      case "daily":
        return date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })

      case "weekly":
        const startOfWeek = new Date(date)
        startOfWeek.setDate(date.getDate() - date.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`

      case "monthly":
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })

      default:
        return ""
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black">Food Records</h1>
        <p className="text-gray-600 mt-2">View your food logging history</p>
      </div>

      {/* View Type Selector */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex space-x-2">
              {(["daily", "weekly", "monthly"] as ViewType[]).map((type) => (
                <Button
                  key={type}
                  variant={viewType === type ? "default" : "outline"}
                  onClick={() => setViewType(type)}
                  className={
                    viewType === type
                      ? "bg-black text-white hover:bg-gray-800"
                      : "border-gray-300 text-black hover:bg-gray-50"
                  }
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records Display */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>{getDateRangeText()}</span>
          </CardTitle>
          <p className="text-gray-600">{displayEntries.length} entries found</p>
        </CardHeader>
        <CardContent>
          {displayEntries.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No food entries found for this period</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayEntries
                .sort((a, b) => new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime())
                .map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-black">{entry.food}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(entry.date).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{entry.time}</span>
                          </span>
                        </div>
                        {entry.notes && <p className="mt-2 text-gray-700">{entry.notes}</p>}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
