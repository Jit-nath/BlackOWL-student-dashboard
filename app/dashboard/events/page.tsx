"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, MapPin, Users, Tag, ThumbsUp } from "lucide-react"

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Annual Sports Day",
      date: "May 18, 2025",
      time: "09:00 - 17:00",
      location: "Campus Sports Ground",
      category: "sports",
      description: "Annual inter-department sports competition featuring various athletic events.",
      organizer: "Sports Committee",
      registrationRequired: true,
      registrationDeadline: "May 12, 2025",
      interested: 120,
    },
    {
      id: 2,
      title: "Tech Fest 2025",
      date: "May 25, 2025",
      time: "10:00 - 18:00",
      location: "Technology Center",
      category: "academic",
      description: "Showcase of student projects, tech talks, and coding competitions.",
      organizer: "Computer Science Department",
      registrationRequired: true,
      registrationDeadline: "May 20, 2025",
      interested: 85,
    },
    {
      id: 3,
      title: "Guest Lecture: AI in Education",
      date: "May 14, 2025",
      time: "14:00 - 16:00",
      location: "Auditorium A",
      category: "academic",
      description: "Dr. Jane Smith will deliver a lecture on the applications of AI in modern education.",
      organizer: "Computer Science Department",
      registrationRequired: false,
      interested: 65,
    },
    {
      id: 4,
      title: "Cultural Night",
      date: "May 30, 2025",
      time: "18:00 - 22:00",
      location: "Main Auditorium",
      category: "cultural",
      description: "Annual cultural event featuring music, dance, and theatrical performances by students.",
      organizer: "Cultural Committee",
      registrationRequired: true,
      registrationDeadline: "May 25, 2025",
      interested: 150,
    },
    {
      id: 5,
      title: "Career Fair",
      date: "June 5, 2025",
      time: "10:00 - 16:00",
      location: "Campus Convention Center",
      category: "career",
      description: "Meet representatives from top companies and explore internship and job opportunities.",
      organizer: "Career Development Center",
      registrationRequired: true,
      registrationDeadline: "June 1, 2025",
      interested: 200,
    },
    {
      id: 6,
      title: "Environmental Awareness Workshop",
      date: "May 22, 2025",
      time: "13:00 - 15:00",
      location: "Seminar Hall 2",
      category: "workshop",
      description: "Learn about sustainable practices and environmental conservation.",
      organizer: "Environmental Science Department",
      registrationRequired: true,
      registrationDeadline: "May 20, 2025",
      interested: 45,
    },
  ]

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  // Get upcoming events (events that haven't happened yet)
  const upcomingEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    return eventDate >= today
  })

  // Get this month's events
  const thisMonthEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear()
  })

  // Get event dates for calendar highlighting
  const eventDates = events.map((event) => new Date(event.date))

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sports":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "academic":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "cultural":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "career":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "workshop":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campus Events</h1>
        <p className="text-muted-foreground">Discover and participate in campus activities</p>
      </div>

      {/* Events Calendar and List */}
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select defaultValue="upcoming">
                <SelectTrigger>
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="next-month">Next Month</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Tabs */}
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            {/* List View Tab */}
            <TabsContent value="list" className="space-y-4">
              <div className="grid gap-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <Badge className={`ml-2 ${getCategoryColor(event.category)}`}>{event.category}</Badge>
                          </div>
                          <p className="text-sm">{event.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Organizer: {event.organizer}</span>
                            </div>
                          </div>
                          {event.registrationRequired && (
                            <div className="text-sm text-muted-foreground">
                              Registration required by: {event.registrationDeadline}
                            </div>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{event.interested} interested</span>
                          </div>
                          <div className="flex flex-col space-y-2 mt-4">
                            <Button variant="outline" size="sm">
                              Interested
                            </Button>
                            {event.registrationRequired && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">Register</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Register for {event.title}</DialogTitle>
                                    <DialogDescription>
                                      Fill out the form below to register for this event.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p className="text-sm text-muted-foreground mb-4">
                                      Registration deadline: {event.registrationDeadline}
                                    </p>
                                    <p className="text-sm mb-4">
                                      By registering, you confirm your attendance to this event.
                                    </p>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Confirm Registration</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Calendar View Tab */}
            <TabsContent value="calendar" className="space-y-4">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  // Highlight event dates
                  modifiers={{
                    highlighted: eventDates,
                  }}
                  modifiersStyles={{
                    highlighted: { backgroundColor: "rgba(59, 130, 246, 0.1)" },
                  }}
                />
              </div>

              {/* Events for selected date */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Events on{" "}
                  {date?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>

                {events.filter((event) => {
                  const eventDate = new Date(event.date)
                  return (
                    date &&
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  )
                }).length > 0 ? (
                  <div className="space-y-4">
                    {events
                      .filter((event) => {
                        const eventDate = new Date(event.date)
                        return (
                          date &&
                          eventDate.getDate() === date.getDate() &&
                          eventDate.getMonth() === date.getMonth() &&
                          eventDate.getFullYear() === date.getFullYear()
                        )
                      })
                      .map((event) => (
                        <Card key={event.id}>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{event.title}</h3>
                                <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                              </div>
                              <div className="text-sm">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No events scheduled for this date</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-md flex items-center justify-center bg-primary/10">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
