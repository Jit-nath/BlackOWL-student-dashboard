"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Camera, Mail, Phone, MapPin, Calendar, BookOpen, GraduationCap, User, Lock, Bell } from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock student data
  const [studentData, setStudentData] = useState({
    id: "STU12345",
    name: "John Smith",
    email: "john.smith@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Campus Drive, University City, CA 90210",
    dateOfBirth: "January 15, 2000",
    department: "Computer Science",
    batch: "2023-2027",
    semester: "4th Semester",
    bio: "Computer Science student with interests in artificial intelligence and web development. Active member of the coding club and robotics team.",
    profilePicture: "/placeholder.svg?height=200&width=200",
    emergencyContact: {
      name: "Mary Smith",
      relation: "Mother",
      phone: "+1 (555) 987-6543",
    },
  })

  // Mock academic data
  const academicData = {
    gpa: 3.8,
    credits: 65,
    standing: "Good Standing",
    advisor: "Dr. Robert Johnson",
    courses: [
      { code: "CS102", name: "Data Structures and Algorithms", grade: "A" },
      { code: "MATH101", name: "Calculus II", grade: "A-" },
      { code: "PHY103", name: "Physics I", grade: "B+" },
      { code: "ENG104", name: "Technical Writing", grade: "A" },
      { code: "CHEM105", name: "Chemistry I", grade: "B" },
    ],
  }

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    assignments: true,
    grades: true,
    events: true,
    announcements: true,
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send the updated data to the server
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })

    setIsEditing(false)
  }

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    })

    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate and update the password
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and contact information</CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 md:mt-0"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={studentData.profilePicture || "/placeholder.svg"} alt={studentData.name} />
                    <AvatarFallback>
                      {studentData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="flex items-center">
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                    </div>
                  )}
                  <div className="text-center">
                    <Badge variant="outline">Student ID: {studentData.id}</Badge>
                  </div>
                </div>

                <div className="flex-1">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={studentData.name}
                            onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={studentData.email} disabled />
                          <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={studentData.phone}
                            onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" value={studentData.dateOfBirth} disabled />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={studentData.address}
                          onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={studentData.bio}
                          onChange={(e) => setStudentData({ ...studentData, bio: e.target.value })}
                          disabled={!isEditing}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="emergency-name">Name</Label>
                            <Input
                              id="emergency-name"
                              value={studentData.emergencyContact.name}
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  emergencyContact: {
                                    ...studentData.emergencyContact,
                                    name: e.target.value,
                                  },
                                })
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergency-relation">Relation</Label>
                            <Input
                              id="emergency-relation"
                              value={studentData.emergencyContact.relation}
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  emergencyContact: {
                                    ...studentData.emergencyContact,
                                    relation: e.target.value,
                                  },
                                })
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergency-phone">Phone</Label>
                            <Input
                              id="emergency-phone"
                              value={studentData.emergencyContact.phone}
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  emergencyContact: {
                                    ...studentData.emergencyContact,
                                    phone: e.target.value,
                                  },
                                })
                              }
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{studentData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{studentData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{studentData.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">{studentData.dateOfBirth}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>View your academic records and course information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{academicData.gpa}</div>
                      <p className="text-sm text-muted-foreground">Current GPA</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{academicData.credits}</div>
                      <p className="text-sm text-muted-foreground">Credits Earned</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-600">{academicData.standing}</div>
                      <p className="text-sm text-muted-foreground">Academic Standing</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{studentData.department}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Batch</p>
                    <p className="text-sm text-muted-foreground">{studentData.batch}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Current Semester</p>
                    <p className="text-sm text-muted-foreground">{studentData.semester}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Academic Advisor</p>
                    <p className="text-sm text-muted-foreground">{academicData.advisor}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Current Courses</h3>
                <div className="border rounded-md">
                  <div className="grid grid-cols-3 font-medium p-3 border-b bg-muted">
                    <div>Course Code</div>
                    <div>Course Name</div>
                    <div>Grade</div>
                  </div>
                  {academicData.courses.map((course, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-3 p-3 ${index !== academicData.courses.length - 1 ? "border-b" : ""}`}
                    >
                      <div>{course.code}</div>
                      <div>{course.name}</div>
                      <div>{course.grade}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download Transcript
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </form>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Login History</h3>
                <div className="border rounded-md">
                  <div className="grid grid-cols-3 font-medium p-3 border-b bg-muted">
                    <div>Date & Time</div>
                    <div>IP Address</div>
                    <div>Device</div>
                  </div>
                  <div className="grid grid-cols-3 p-3 border-b">
                    <div>May 8, 2025, 09:15 AM</div>
                    <div>192.168.1.1</div>
                    <div>Windows PC</div>
                  </div>
                  <div className="grid grid-cols-3 p-3 border-b">
                    <div>May 7, 2025, 02:30 PM</div>
                    <div>192.168.1.1</div>
                    <div>iPhone</div>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <div>May 6, 2025, 10:45 AM</div>
                    <div>192.168.1.1</div>
                    <div>Windows PC</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-notifications" className="flex-1">
                        Email Notifications
                      </Label>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email}
                      onCheckedChange={() => handleNotificationChange("email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-notifications" className="flex-1">
                        SMS Notifications
                      </Label>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notificationSettings.sms}
                      onCheckedChange={() => handleNotificationChange("sms")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="assignment-notifications" className="flex-1">
                      Assignment Updates
                    </Label>
                    <Switch
                      id="assignment-notifications"
                      checked={notificationSettings.assignments}
                      onCheckedChange={() => handleNotificationChange("assignments")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="grade-notifications" className="flex-1">
                      Grade Updates
                    </Label>
                    <Switch
                      id="grade-notifications"
                      checked={notificationSettings.grades}
                      onCheckedChange={() => handleNotificationChange("grades")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="event-notifications" className="flex-1">
                      Campus Events
                    </Label>
                    <Switch
                      id="event-notifications"
                      checked={notificationSettings.events}
                      onCheckedChange={() => handleNotificationChange("events")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="announcement-notifications" className="flex-1">
                      General Announcements
                    </Label>
                    <Switch
                      id="announcement-notifications"
                      checked={notificationSettings.announcements}
                      onCheckedChange={() => handleNotificationChange("announcements")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Test Notifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
