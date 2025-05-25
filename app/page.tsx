"use client"

import { useFoodLogger } from "@/lib/food-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { entries, getEntriesByDate, getEntriesByDateRange } = useFoodLogger()

  const today = new Date().toISOString().split("T")[0]
  const todayEntries = getEntriesByDate(today)

  // Get last 7 days for weekly trend
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split("T")[0]
  }).reverse()

  const weeklyData = last7Days.map((date) => ({
    date,
    count: getEntriesByDate(date).length,
  }))

  const totalEntries = entries.length
  const averagePerDay = totalEntries > 0 ? (totalEntries / 30).toFixed(1) : "0"

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your daily food intake</p>
        </div>
        <Link href="/log">
          <Button className="bg-black text-white hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Log Food
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Entries</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{todayEntries.length}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Entries</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{totalEntries}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Daily Average</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{averagePerDay}</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trend */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Weekly Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full"
                      style={{ width: `${Math.min((day.count / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-black w-8">{day.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {todayEntries.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Today's Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayEntries.slice(-3).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-black">{entry.food}</p>
                    <p className="text-sm text-gray-600">{entry.time}</p>
                  </div>
                  {entry.notes && <p className="text-sm text-gray-500 max-w-xs truncate">{entry.notes}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
