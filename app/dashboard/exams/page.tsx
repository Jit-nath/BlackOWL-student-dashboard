"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, MapPin, CalendarIcon, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function ExamTimetablePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for exams
  const exams = [
    {
      id: 1,
      subject: "Mathematics",
      code: "MATH101",
      date: "May 20, 2025",
      time: "09:00 - 11:00",
      room: "Exam Hall 1",
      building: "Main Building",
      type: "Mid-term",
      status: "upcoming", // upcoming, completed
      materials: ["Calculator", "Formula Sheet"],
      syllabus: ["Chapter 1-5", "All tutorials"],
    },
    {
      id: 2,
      subject: "Computer Science",
      code: "CS102",
      date: "May 22, 2025",
      time: "13:00 - 15:00",
      room: "Exam Hall 2",
      building: "Technology Center",
      type: "Mid-term",
      status: "upcoming",
      materials: ["No materials allowed"],
      syllabus: ["Algorithms", "Data Structures", "Programming Concepts"],
    },
    {
      id: 3,
      subject: "Physics",
      code: "PHY103",
      date: "May 24, 2025",
      time: "09:00 - 11:00",
      room: "Exam Hall 1",
      building: "Main Building",
      type: "Mid-term",
      status: "upcoming",
      materials: ["Calculator", "Formula Sheet"],
      syllabus: ["Mechanics", "Thermodynamics", "All lab work"],
    },
    {
      id: 4,
      subject: "English",
      code: "ENG104",
      date: "May 26, 2025",
      time: "13:00 - 15:00",
      room: "Exam Hall 3",
      building: "Arts Block",
      type: "Mid-term",
      status: "upcoming",
      materials: ["Dictionary (non-electronic)"],
      syllabus: ["Modern Literature", "Essay Writing", "Comprehension"],
    },
    {
      id: 5,
      subject: "Chemistry",
      code: "CHEM105",
      date: "May 28, 2025",
      time: "09:00 - 11:00",
      room: "Exam Hall 2",
      building: "Science Block",
      type: "Mid-term",
      status: "upcoming",
      materials: ["Periodic Table", "Calculator"],
      syllabus: ["Organic Chemistry", "Inorganic Chemistry", "All lab experiments"],
    },
    {
      id: 6,
      subject: "History",
      code: "HIST106",
      date: "April 15, 2025",
      time: "13:00 - 15:00",
      room: "Exam Hall 3",
      building: "Arts Block",
      type: "Quiz",
      status: "completed",
      grade: "A-",
      materials: ["No materials allowed"],
      syllabus: ["Ancient Civilizations", "Medieval History"],
    },
  ]

  const upcomingExams = exams.filter((exam) => exam.status === "upcoming")
  const completedExams = exams.filter((exam) => exam.status === "completed")

  // Get the next exam
  const nextExam = upcomingExams.length > 0 ? upcomingExams[0] : null

  // Calculate days until next exam
  const daysUntilNextExam = () => {
    if (!nextExam) return 0

    const examDate = new Date(nextExam.date)
    const today = new Date()
    const diffTime = examDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Exam Timetable</h1>
        <p className="text-muted-foreground">Your upcoming and past examinations</p>
      </div>

      {/* Next Exam Alert */}
      {nextExam && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{nextExam.subject}</h2>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline">{nextExam.code}</Badge>
                    <Badge variant="outline" className="ml-2">
                      {nextExam.type}
                    </Badge>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    {daysUntilNextExam()} days remaining
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{nextExam.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{nextExam.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {nextExam.room}, {nextExam.building}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Required Materials:</h3>
                  <ul className="list-disc list-inside text-sm pl-2">
                    {nextExam.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Syllabus:</h3>
                  <ul className="list-disc list-inside text-sm pl-2">
                    {nextExam.syllabus.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  View Study Materials
                </Button>
                <Button>Prepare for Exam</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exam Calendar and List */}
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
              <TabsTrigger value="completed">Completed Exams</TabsTrigger>
            </TabsList>

            {/* Upcoming Exams Tab */}
            <TabsContent value="upcoming" className="space-y-4">
              <div className="flex justify-end">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {upcomingExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-medium">{exam.subject}</h3>
                            <Badge variant="outline" className="ml-2">
                              {exam.code}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{exam.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {exam.room}, {exam.building}
                              </span>
                            </div>
                            <div>
                              <Badge variant="outline">{exam.type}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">
                              {(() => {
                                const examDate = new Date(exam.date)
                                const today = new Date()
                                const diffTime = examDate.getTime() - today.getTime()
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                                return `${diffDays} days remaining`
                              })()}
                            </span>
                          </div>
                          <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Completed Exams Tab */}
            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4">
                {completedExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-medium">{exam.subject}</h3>
                            <Badge variant="outline" className="ml-2">
                              {exam.code}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{exam.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {exam.room}, {exam.building}
                              </span>
                            </div>
                            <div>
                              <Badge variant="outline">{exam.type}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm">Grade: {exam.grade}</span>
                          </div>
                          <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                            View Results
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              // Highlight exam dates
              modifiers={{
                highlighted: upcomingExams.map((exam) => new Date(exam.date)),
              }}
              modifiersStyles={{
                highlighted: { backgroundColor: "rgba(220, 38, 38, 0.1)" },
              }}
            />
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Legend:</h3>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 rounded-sm mr-2"></div>
                <span className="text-sm">Exam Day</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
