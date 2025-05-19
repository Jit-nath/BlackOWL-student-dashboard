import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Calendar, BookOpen, Info } from "lucide-react"

export default function NoticesPage() {
  // Mock data for notices
  const notices = [
    {
      id: 1,
      title: "Campus Maintenance",
      date: "May 7, 2025",
      category: "general",
      content: "The campus will undergo maintenance on May 10-11. Some facilities may be temporarily unavailable.",
      from: "Facilities Department",
    },
    {
      id: 2,
      title: "Exam Schedule Updated",
      date: "May 6, 2025",
      category: "academic",
      content: "The final exam schedule has been updated. Please check the exam timetable for any changes.",
      from: "Examination Office",
    },
    {
      id: 3,
      title: "Sports Day Announcement",
      date: "May 5, 2025",
      category: "event",
      content: "Annual Sports Day will be held on May 18. Register for events by May 12.",
      from: "Sports Committee",
    },
    {
      id: 4,
      title: "Library Hours Extended",
      date: "May 4, 2025",
      category: "general",
      content: "The library will remain open until 10 PM during the exam period (May 15-30).",
      from: "Library",
    },
    {
      id: 5,
      title: "Scholarship Applications Open",
      date: "May 3, 2025",
      category: "academic",
      content: "Applications for the Merit Scholarship are now open. Deadline: May 25.",
      from: "Financial Aid Office",
    },
    {
      id: 6,
      title: "Guest Lecture: AI in Education",
      date: "May 2, 2025",
      category: "event",
      content: "Dr. Jane Smith will deliver a lecture on 'AI in Education' on May 14 at 2 PM in Auditorium A.",
      from: "Computer Science Department",
    },
    {
      id: 7,
      title: "Mid-term Exam Results",
      date: "May 1, 2025",
      category: "academic",
      content: "Mid-term exam results have been published. Check your student portal.",
      from: "Examination Office",
    },
  ]

  const generalNotices = notices.filter((n) => n.category === "general")
  const academicNotices = notices.filter((n) => n.category === "academic")
  const eventNotices = notices.filter((n) => n.category === "event")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <Info className="h-5 w-5 text-blue-500" />
      case "academic":
        return <BookOpen className="h-5 w-5 text-green-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-purple-500" />
      default:
        return <MessageSquare className="h-5 w-5" />
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "general":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            General
          </Badge>
        )
      case "academic":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Academic
          </Badge>
        )
      case "event":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Event
          </Badge>
        )
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notices</h1>
        <p className="text-muted-foreground">Stay updated with important announcements</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search notices..." />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notices Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
        </TabsList>

        {/* All Notices Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {notices.map((notice) => (
              <Card key={notice.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getCategoryIcon(notice.category)}
                        <div>
                          <h3 className="font-medium">{notice.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-muted-foreground">{notice.date}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">From: {notice.from}</p>
                          </div>
                        </div>
                      </div>
                      <div>{getCategoryBadge(notice.category)}</div>
                    </div>
                    <p className="text-sm">{notice.content}</p>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* General Notices Tab */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4">
            {generalNotices.map((notice) => (
              <Card key={notice.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getCategoryIcon(notice.category)}
                        <div>
                          <h3 className="font-medium">{notice.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-muted-foreground">{notice.date}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">From: {notice.from}</p>
                          </div>
                        </div>
                      </div>
                      <div>{getCategoryBadge(notice.category)}</div>
                    </div>
                    <p className="text-sm">{notice.content}</p>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Academic Notices Tab */}
        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-4">
            {academicNotices.map((notice) => (
              <Card key={notice.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getCategoryIcon(notice.category)}
                        <div>
                          <h3 className="font-medium">{notice.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-muted-foreground">{notice.date}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">From: {notice.from}</p>
                          </div>
                        </div>
                      </div>
                      <div>{getCategoryBadge(notice.category)}</div>
                    </div>
                    <p className="text-sm">{notice.content}</p>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Event Notices Tab */}
        <TabsContent value="event" className="space-y-4">
          <div className="grid gap-4">
            {eventNotices.map((notice) => (
              <Card key={notice.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getCategoryIcon(notice.category)}
                        <div>
                          <h3 className="font-medium">{notice.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-muted-foreground">{notice.date}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">From: {notice.from}</p>
                          </div>
                        </div>
                      </div>
                      <div>{getCategoryBadge(notice.category)}</div>
                    </div>
                    <p className="text-sm">{notice.content}</p>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">
                        Read More
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
  )
}
