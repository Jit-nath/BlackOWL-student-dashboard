"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Upload, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function AssignmentsPage() {
  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: "Calculus Problem Set",
      subject: "Mathematics",
      dueDate: "May 15, 2025",
      status: "pending",
      description: "Complete problems 1-20 from Chapter 5 of the textbook.",
      submissionType: "PDF document",
    },
    {
      id: 2,
      title: "Algorithm Analysis",
      subject: "Computer Science",
      dueDate: "May 12, 2025",
      status: "pending",
      description: "Analyze the time and space complexity of the provided algorithms.",
      submissionType: "Code files and report",
    },
    {
      id: 3,
      title: "Lab Report",
      subject: "Physics",
      dueDate: "May 10, 2025",
      status: "overdue",
      description: "Write a detailed report on the pendulum experiment conducted in lab.",
      submissionType: "PDF document",
    },
    {
      id: 4,
      title: "Essay on Modern Literature",
      subject: "English",
      dueDate: "May 20, 2025",
      status: "pending",
      description: "Write a 1500-word essay on the themes in modern literature.",
      submissionType: "Word document",
    },
    {
      id: 5,
      title: "Chemical Reactions Report",
      subject: "Chemistry",
      dueDate: "May 18, 2025",
      status: "pending",
      description: "Document the reactions observed in the lab and explain the principles.",
      submissionType: "PDF document",
    },
    {
      id: 6,
      title: "Data Structures Implementation",
      subject: "Computer Science",
      dueDate: "April 30, 2025",
      status: "completed",
      grade: "A",
      feedback: "Excellent implementation with good documentation.",
      description: "Implement a binary search tree and analyze its performance.",
      submissionType: "Code files",
    },
    {
      id: 7,
      title: "Statistical Analysis",
      subject: "Mathematics",
      dueDate: "April 25, 2025",
      status: "completed",
      grade: "B+",
      feedback: "Good analysis but some errors in the calculations.",
      description: "Perform statistical analysis on the provided dataset.",
      submissionType: "Excel spreadsheet and report",
    },
  ]

  const pendingAssignments = assignments.filter((a) => a.status === "pending")
  const overdueAssignments = assignments.filter((a) => a.status === "overdue")
  const completedAssignments = assignments.filter((a) => a.status === "completed")

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50">
            Pending
          </Badge>
        )
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Completed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">Manage your assignments and submissions</p>
      </div>

      {/* Assignment Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{overdueAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAssignments.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* Pending Assignments Tab */}
        <TabsContent value="pending" className="space-y-4">
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
            {pendingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">{assignment.title}</h3>
                      </div>
                      <div>
                        <Badge variant="outline">{assignment.subject}</Badge>
                        <p className="text-sm mt-1">{assignment.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Due: {assignment.dueDate}</p>
                        <p>Submission: {assignment.submissionType}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(assignment.status)}
                        <span className="ml-2">{getStatusBadge(assignment.status)}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4 md:mt-0">Submit</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Assignment</DialogTitle>
                            <DialogDescription>
                              Upload your completed assignment for {assignment.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="file">Upload File</Label>
                              <div className="flex items-center gap-2">
                                <Input id="file" type="file" onChange={handleFileChange} />
                              </div>
                              {selectedFile && (
                                <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="comments">Comments (Optional)</Label>
                              <textarea
                                id="comments"
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Add any comments for your instructor"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">
                              <Upload className="mr-2 h-4 w-4" />
                              Submit Assignment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Overdue Assignments Tab */}
        <TabsContent value="overdue" className="space-y-4">
          <div className="grid gap-4">
            {overdueAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">{assignment.title}</h3>
                      </div>
                      <div>
                        <Badge variant="outline">{assignment.subject}</Badge>
                        <p className="text-sm mt-1">{assignment.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="text-red-500 font-medium">Due: {assignment.dueDate} (Overdue)</p>
                        <p>Submission: {assignment.submissionType}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(assignment.status)}
                        <span className="ml-2">{getStatusBadge(assignment.status)}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" className="mt-4 md:mt-0">
                            Submit Late
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Late Assignment</DialogTitle>
                            <DialogDescription>This assignment is overdue. Late penalties may apply.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="file-overdue">Upload File</Label>
                              <div className="flex items-center gap-2">
                                <Input id="file-overdue" type="file" onChange={handleFileChange} />
                              </div>
                              {selectedFile && (
                                <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reason">Reason for Late Submission</Label>
                              <textarea
                                id="reason"
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Explain why your submission is late"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" variant="destructive">
                              <Upload className="mr-2 h-4 w-4" />
                              Submit Late Assignment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Assignments Tab */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">{assignment.title}</h3>
                      </div>
                      <div>
                        <Badge variant="outline">{assignment.subject}</Badge>
                        <p className="text-sm mt-1">{assignment.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Submitted: {assignment.dueDate}</p>
                        <p>Grade: {assignment.grade}</p>
                        <p>Feedback: {assignment.feedback}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(assignment.status)}
                        <span className="ml-2">{getStatusBadge(assignment.status)}</span>
                      </div>
                      <Button variant="outline" className="mt-4 md:mt-0">
                        View Submission
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
