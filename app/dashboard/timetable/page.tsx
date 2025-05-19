"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, MapPin, User } from "lucide-react"

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState("monday")

  // Mock data for weekly timetable
  const weeklyTimetable = {
    monday: [
      {
        id: 1,
        subject: "Mathematics",
        code: "MATH101",
        time: "09:00 - 10:30",
        room: "Room 101",
        building: "Science Block",
        teacher: "Dr. Smith",
        type: "Lecture",
      },
      {
        id: 2,
        subject: "Computer Science",
        code: "CS102",
        time: "11:00 - 12:30",
        room: "Lab 3",
        building: "Technology Center",
        teacher: "Prof. Johnson",
        type: "Lab",
      },
      {
        id: 3,
        subject: "Physics",
        code: "PHY103",
        time: "14:00 - 15:30",
        room: "Room 205",
        building: "Science Block",
        teacher: "Dr. Williams",
        type: "Lecture",
      },
    ],
    tuesday: [
      {
        id: 1,
        subject: "English",
        code: "ENG104",
        time: "09:00 - 10:30",
        room: "Room 302",
        building: "Arts Block",
        teacher: "Prof. Davis",
        type: "Lecture",
      },
      {
        id: 2,
        subject: "Chemistry",
        code: "CHEM105",
        time: "11:00 - 12:30",
        room: "Lab 2",
        building: "Science Block",
        teacher: "Dr. Brown",
        type: "Lab",
      },
      {
        id: 3,
        subject: "Mathematics",
        code: "MATH101",
        time: "14:00 - 15:30",
        room: "Room 101",
        building: "Science Block",
        teacher: "Dr. Smith",
        type: "Tutorial",
      },
    ],
    wednesday: [
      {
        id: 1,
        subject: "Computer Science",
        code: "CS102",
        time: "09:00 - 10:30",
        room: "Room 203",
        building: "Technology Center",
        teacher: "Prof. Johnson",
        type: "Lecture",
      },
      {
        id: 2,
        subject: "Physics",
        code: "PHY103",
        time: "11:00 - 12:30",
        room: "Lab 4",
        building: "Science Block",
        teacher: "Dr. Williams",
        type: "Lab",
      },
      {
        id: 3,
        subject: "English",
        code: "ENG104",
        time: "14:00 - 15:30",
        room: "Room 302",
        building: "Arts Block",
        teacher: "Prof. Davis",
        type: "Tutorial",
      },
    ],
    thursday: [
      {
        id: 1,
        subject: "Chemistry",
        code: "CHEM105",
        time: "09:00 - 10:30",
        room: "Room 105",
        building: "Science Block",
        teacher: "Dr. Brown",
        type: "Lecture",
      },
      {
        id: 2,
        subject: "Mathematics",
        code: "MATH101",
        time: "11:00 - 12:30",
        room: "Room 101",
        building: "Science Block",
        teacher: "Dr. Smith",
        type: "Lecture",
      },
      {
        id: 3,
        subject: "Computer Science",
        code: "CS102",
        time: "14:00 - 15:30",
        room: "Lab 3",
        building: "Technology Center",
        teacher: "Prof. Johnson",
        type: "Tutorial",
      },
    ],
    friday: [
      {
        id: 1,
        subject: "Physics",
        code: "PHY103",
        time: "09:00 - 10:30",
        room: "Room 205",
        building: "Science Block",
        teacher: "Dr. Williams",
        type: "Lecture",
      },
      {
        id: 2,
        subject: "English",
        code: "ENG104",
        time: "11:00 - 12:30",
        room: "Room 302",
        building: "Arts Block",
        teacher: "Prof. Davis",
        type: "Lecture",
      },
      {
        id: 3,
        subject: "Chemistry",
        code: "CHEM105",
        time: "14:00 - 15:30",
        room: "Lab 2",
        building: "Science Block",
        teacher: "Dr. Brown",
        type: "Tutorial",
      },
    ],
    saturday: [],
    sunday: [],
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Class Timetable</h1>
        <p className="text-muted-foreground">Your weekly class schedule</p>
      </div>

      {/* Timetable View Selector */}
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
        </TabsList>

        {/* Weekly View Tab */}
        <TabsContent value="weekly" className="space-y-4">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <div key={day} className="text-center font-medium p-2 bg-muted rounded-t-md">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                ))}

                {days.map((day) => (
                  <div key={day} className="border rounded-b-md p-2 min-h-[300px]">
                    {weeklyTimetable[day as keyof typeof weeklyTimetable].length > 0 ? (
                      <div className="space-y-2">
                        {weeklyTimetable[day as keyof typeof weeklyTimetable].map((cls) => (
                          <div
                            key={cls.id}
                            className="bg-card border rounded-md p-2 text-xs cursor-pointer hover:bg-muted transition-colors"
                          >
                            <div className="font-medium">{cls.subject}</div>
                            <div className="text-muted-foreground">{cls.time}</div>
                            <div className="text-muted-foreground">{cls.room}</div>
                            <Badge variant="outline" className="mt-1">
                              {cls.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        No classes
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Daily View Tab */}
        <TabsContent value="daily" className="space-y-4">
          <div className="flex justify-end">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {weeklyTimetable[selectedDay as keyof typeof weeklyTimetable].length > 0 ? (
              weeklyTimetable[selectedDay as keyof typeof weeklyTimetable].map((cls) => (
                <Card key={cls.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">{cls.subject}</h3>
                          <Badge variant="outline" className="ml-2">
                            {cls.code}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{cls.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {cls.room}, {cls.building}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{cls.teacher}</span>
                          </div>
                          <div>
                            <Badge variant="outline">{cls.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-medium">No Classes Scheduled</h3>
                  <p className="text-muted-foreground mt-1">
                    You don't have any classes scheduled for{" "}
                    {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
