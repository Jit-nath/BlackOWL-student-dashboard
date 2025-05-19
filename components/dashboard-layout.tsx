"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Bell,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Attendance", href: "/dashboard/attendance", icon: BarChart3 },
  { name: "Assignments", href: "/dashboard/assignments", icon: FileText },
  { name: "Notices", href: "/dashboard/notices", icon: MessageSquare },
  { name: "Today's Timetable", href: "/dashboard/today", icon: Clock },
  { name: "Class Timetable", href: "/dashboard/timetable", icon: BookOpen },
  { name: "Exam Timetable", href: "/dashboard/exams", icon: Calendar },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    // In a real app, you would handle the logout logic here
    window.location.href = "/"
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="px-3 py-4 border-b">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-lg">Your campus logo</span>
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
                {item.name === "Notices" && notifications > 0 && <Badge className="ml-auto">{notifications}</Badge>}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="px-3 py-4 border-t">
        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header className="sticky top-0 z-10 bg-background border-b h-16 flex items-center px-4 md:px-6">
          <div className="w-full flex items-center justify-between">
            <div className="md:hidden w-8">{/* Placeholder for mobile to keep header balanced */}</div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-muted-foreground">ID: STU12345</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
