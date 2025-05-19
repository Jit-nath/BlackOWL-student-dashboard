import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AttendancePage() {
  // Mock data for attendance
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      attendance: 90,
      classes: 30,
      present: 27,
      absent: 3,
    },
    {
      id: 2,
      name: "Computer Science",
      code: "CS102",
      attendance: 85,
      classes: 28,
      present: 24,
      absent: 4,
    },
    {
      id: 3,
      name: "Physics",
      code: "PHY103",
      attendance: 75,
      classes: 24,
      present: 18,
      absent: 6,
    },
    {
      id: 4,
      name: "English",
      code: "ENG104",
      attendance: 95,
      classes: 20,
      present: 19,
      absent: 1,
    },
    {
      id: 5,
      name: "Chemistry",
      code: "CHEM105",
      attendance: 80,
      classes: 25,
      present: 20,
      absent: 5,
    },
  ];

  const months = ["January", "February", "March", "April", "May"];

  const attendanceRecords = [
    {
      date: "May 8, 2025",
      day: "Monday",
      status: [
        { subject: "Mathematics", status: "present" },
        { subject: "Computer Science", status: "present" },
        { subject: "Physics", status: "absent" },
      ],
    },
    {
      date: "May 7, 2025",
      day: "Tuesday",
      status: [
        { subject: "English", status: "present" },
        { subject: "Chemistry", status: "present" },
        { subject: "Mathematics", status: "present" },
      ],
    },
    {
      date: "May 6, 2025",
      day: "Wednesday",
      status: [
        { subject: "Physics", status: "present" },
        { subject: "Computer Science", status: "present" },
        { subject: "English", status: "present" },
      ],
    },
    {
      date: "May 5, 2025",
      day: "Thursday",
      status: [
        { subject: "Chemistry", status: "absent" },
        { subject: "Mathematics", status: "present" },
        { subject: "Computer Science", status: "present" },
      ],
    },
    {
      date: "May 4, 2025",
      day: "Friday",
      status: [
        { subject: "Physics", status: "present" },
        { subject: "English", status: "present" },
        { subject: "Chemistry", status: "present" },
      ],
    },
  ];

  const overallAttendance =
    subjects.reduce((acc, subject) => acc + subject.attendance, 0) /
    subjects.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">
          Track your attendance across all subjects
        </p>
      </div>

      {/* Overall Attendance Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Overall Attendance</CardTitle>
          <CardDescription>Your attendance across all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl font-bold">
              {Math.round(overallAttendance)}%
            </div>
            <div
              className={`w-full h-2 rounded ${
                overallAttendance > 75 ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <Progress value={overallAttendance} />
            </div>
            <p className="text-sm text-muted-foreground">
              {overallAttendance >= 75
                ? "Good standing. Keep it up!"
                : "Below required attendance (75%). Improvement needed."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Tabs */}
      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
          <TabsTrigger value="daily">Daily Records</TabsTrigger>
        </TabsList>

        {/* Subject-wise Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <div className="flex justify-end">
            <Select defaultValue="may">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem
                    key={month.toLowerCase()}
                    value={month.toLowerCase()}
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {subjects.map((subject) => (
              <Card key={subject.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{subject.name}</h3>
                        <Badge className="ml-2">{subject.code}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                          <span>{subject.present} Present</span>
                        </div>
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1" />
                          <span>{subject.absent} Absent</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <div className="text-2xl font-bold">
                        {subject.attendance}%
                      </div>
                      <Progress
                        value={subject.attendance}
                        className="w-24 h-2 mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {subject.attendance >= 75
                          ? "Good"
                          : "Below requirement"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Daily Records Tab */}
        <TabsContent value="daily" className="space-y-4">
          <div className="flex justify-end">
            <Select defaultValue="may">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem
                    key={month.toLowerCase()}
                    value={month.toLowerCase()}
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {attendanceRecords.map((record, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{record.date}</h3>
                        <p className="text-sm text-muted-foreground">
                          {record.day}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {record.status.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          {item.status === "present" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">{item.subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
