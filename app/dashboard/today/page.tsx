import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, User, BookOpen, Calendar } from "lucide-react"

export default function TodayTimetablePage() {
  // Get current date
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  const formattedDate = today.toLocaleDateString("en-US", options)

  // Mock data for today's classes
  const todayClasses = [
    {
      id: 1,
      subject: "Mathematics",
      code: "MATH101",
      time: "09:00 - 10:30",
      room: "Room 101",
      building: "Science Block",
      teacher: "Dr. Smith",
      type: "Lecture",
      materials: ["Textbook Chapter 5", "Lecture Notes"],
      status: "upcoming", // upcoming, current, completed
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
      materials: ["Lab Manual", "Assignment Guidelines"],
      status: "current",
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
      materials: ["Textbook Chapter 7", "Problem Set"],
      status: "upcoming",
    },
  ]

  const getCurrentClass = () => {
    return todayClasses.find((cls) => cls.status === "current")
  }

  const currentClass = getCurrentClass()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Today's Timetable</h1>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      {/* Current/Next Class Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{currentClass ? "Currently Ongoing" : "Next Class"}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentClass ? (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{currentClass.subject}</h2>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline">{currentClass.code}</Badge>
                    <Badge variant="outline" className="ml-2">
                      {currentClass.type}
                    </Badge>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Progress</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{currentClass.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {currentClass.room}, {currentClass.building}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{currentClass.teacher}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Materials:</h3>
                <ul className="list-disc list-inside text-sm pl-2">
                  {currentClass.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  View Materials
                </Button>
                <Button>Join Virtual Class</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No classes currently in progress</h3>
              <p className="text-muted-foreground mt-1">Your next class starts at {todayClasses[0].time}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Day Schedule */}
      <h2 className="text-xl font-semibold mt-6">Full Day Schedule</h2>
      <div className="space-y-4">
        {todayClasses.map((cls) => (
          <Card key={cls.id} className={cls.status === "current" ? "border-primary" : ""}>
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
                <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                  <Badge
                    className={
                      cls.status === "current"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : cls.status === "completed"
                          ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    }
                  >
                    {cls.status === "current" ? "In Progress" : cls.status === "completed" ? "Completed" : "Upcoming"}
                  </Badge>
                  <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
