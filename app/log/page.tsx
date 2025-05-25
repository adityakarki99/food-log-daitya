"use client"

import type React from "react"

import { useState } from "react"
import { useFoodLogger } from "@/lib/food-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function LogFoodPage() {
  const { addEntry } = useFoodLogger()
  const router = useRouter()

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    food: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.food.trim()) {
      addEntry(formData)
      setFormData({
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().slice(0, 5),
        food: "",
        notes: "",
      })
      router.push("/")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Log Food</h1>
        <p className="text-gray-600 mt-2">Add a new food entry to your log</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">New Food Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-black">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-black focus:ring-black"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-black">
                  Time
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-black focus:ring-black"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="food" className="text-black">
                Food
              </Label>
              <Input
                id="food"
                name="food"
                type="text"
                placeholder="What did you eat?"
                value={formData.food}
                onChange={handleChange}
                className="border-gray-300 focus:border-black focus:ring-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-black">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any additional notes..."
                value={formData.notes}
                onChange={handleChange}
                className="border-gray-300 focus:border-black focus:ring-black min-h-[100px]"
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="bg-black text-white hover:bg-gray-800 flex-1">
                Log Food
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                className="border-gray-300 text-black hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
