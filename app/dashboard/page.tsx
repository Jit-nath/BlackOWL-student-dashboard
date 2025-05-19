import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, BookOpen, Calendar, Clock, FileText } from "lucide-react"

export default function Dashboard() {
  // Mock data for the dashboard
  const todayClasses = [
    { id: 1, subject: "Mathematics", time: "09:00 - 10:30", room: "Room 101", teacher: "Dr. Smith" },
    { id: 2, subject: "Computer Science", time: "11:00 - 12:30", room: "Lab 3", teacher: "Prof. Johnson" },
    { id: 3, subject: "Physics", time: "14:00 - 15:30", room: "Room 205", teacher: "Dr. Williams" },
  ]

  const upcomingAssignments = [
    { id: 1, subject: "Mathematics", title: "Calculus Problem Set", dueDate: "May 15, 2025", status: "pending" },
    { id: 2, subject: "Computer Science", title: "Algorithm Analysis", dueDate: "May 12, 2025", status: "pending" },
    { id: 3, subject: "Physics", title: "Lab Report", dueDate: "May 10, 2025", status: "overdue" },
  ]

  const recentNotices = [
    { id: 1, title: "Campus Maintenance", date: "May 7, 2025", category: "general" },
    { id: 2, title: "Exam Schedule Updated", date: "May 6, 2025", category: "academic" },
    { id: 3, title: "Sports Day Announcement", date: "May 5, 2025", category: "event" },
  ]

  const attendanceSummary = {
    overall: 85,
    subjects: [
      { name: "Mathematics", percentage: 90 },
      { name: "Computer Science", percentage: 85 },
      { name: "Physics", percentage: 75 },
      { name: "English", percentage: 95 },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's your academic overview.</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground mr-2">Current Semester:</p>
          <Badge variant="outline" className="font-semibold">
            Spring 2025
          </Badge>
        </div>
      </div>

      {/* Important Alerts */}
      <Alert variant="destructive" className="border-red-300">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>Mid-term exams will begin on May 20, 2025. Please check the exam timetable.</AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.overall}%</div>
            <p className="text-xs text-muted-foreground">
              {attendanceSummary.overall >= 75 ? "Good standing" : "Needs improvement"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAssignments.filter((a) => a.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingAssignments.filter((a) => a.status === "overdue").length} overdue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayClasses.length}</div>
            <p className="text-xs text-muted-foreground">Next: {todayClasses[0].subject}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next: Sports Day (May 18)</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>

        {/* Today's Schedule Tab */}
        <TabsContent value="today" className="space-y-4">
          <h2 className="text-xl font-semibold">Today's Classes</h2>
          <div className="grid gap-4">
            {todayClasses.map((cls) => (
              <Card key={cls.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{cls.subject}</h3>
                      <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                    </div>
                    <div className="flex flex-col items-end mt-2 md:mt-0">
                      <Badge variant="outline" className="mb-1">
                        {cls.time}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{cls.room}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href="/dashboard/timetable">View Full Timetable</Link>
            </Button>
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
          <div className="grid gap-4">
            {upcomingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{assignment.title}</h3>
                        {assignment.status === "overdue" && (
                          <Badge variant="destructive" className="ml-2">
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <p className="text-sm mr-4">Due: {assignment.dueDate}</p>
                      <Button size="sm">Submit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href="/dashboard/assignments">View All Assignments</Link>
            </Button>
          </div>
        </TabsContent>

        {/* Notices Tab */}
        <TabsContent value="notices" className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Notices</h2>
          <div className="grid gap-4">
            {recentNotices.map((notice) => (
              <Card key={notice.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{notice.title}</h3>
                        <Badge
                          variant={
                            notice.category === "academic"
                              ? "default"
                              : notice.category === "event"
                                ? "secondary"
                                : "outline"
                          }
                          className="ml-2"
                        >
                          {notice.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Posted: {notice.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2 md:mt-0">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href="/dashboard/notices">View All Notices</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
