import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Bone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorId: string;
  doctor: string;
  specialty: string;
  type: "in-person" | "virtual";
  status: "confirmed" | "pending" | "cancelled";
  location?: string;
  notes?: string;
}
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "reminder" | "result" | "alert";
  time: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  icon: any;
  availableSlots: string[];
}
const AppointmentScheduler = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  useEffect(() => {
    fetchAppointments();
    fetchNotifications();
    fetchDoctors();
  }, []);
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/appointments-scheduler/appointments`);
      setAppointments(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/appointments-scheduler/notifications`);
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/appointments-scheduler/doctors`);
      const doctorsWithIcons = res.data.data.map((doc: any) => ({
        ...doc,
        icon: getSpecialtyIcon(doc.specialty),
      }));
      setDoctors(doctorsWithIcons);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case "Cardiology":
        return Heart;
      case "Dermatology":
        return Eye;
      case "General Practice":
        return Stethoscope;
      case "Neurology":
        return Brain;
      case "Orthopedics":
        return Bone;
      default:
        return Stethoscope;
    }
  };
  const deleteAppointment = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/appointments-scheduler/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error("Failed to delete appointment", err);
    }
  };
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    const currentDate = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };
  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newMonth;
    });
  };
  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;
    try {
      await axios.post(`${BACKEND_URL}/api/appointments-scheduler/appointments`, {
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        type: "in-person",
        status: "pending",
      });
      setIsBookingOpen(false);
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTime("");
      fetchAppointments();
    } catch (err) {
      console.error("Failed to book appointment", err);
    }
  };
  return (
    <PageLayout title="Appointment Scheduler" subtitle="Manage appointments & notifications">
    <div className="mb-6">
  {notifications.map((n) => (
    <Card
      key={n.id}
      className="mb-2 transition-shadow duration-200 hover:shadow-lg hover:shadow-green-500/30"
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{n.title}</CardTitle>
        <Badge className={getStatusColor(n.priority)}>{n.type}</Badge>
      </CardHeader>
      <CardContent>
        <p>{n.message}</p>
        <small>{n.time}</small>
      </CardContent>
    </Card>
  ))}
</div>
      <Separator className="my-4" />
      <div className="mb-6 flex justify-end">
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 hover:bg-green-500 hover:text-green-800 transition-all duration-200">
              <Plus className="w-4 h-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Book Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Doctor</label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.name} ({doc.specialty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Date</label>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Time</label>
                <Input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
              </div>
              <Button className="w-full mt-2" onClick={handleBookAppointment}>
                Book Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar */}
      <Card className="mb-6">
        <CardHeader className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="text-lg font-medium text-green-900">
            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
          </h3>
          <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="h-10 flex items-center justify-center text-sm font-medium text-green-700 border-b border-green-200">
                {d}
              </div>
            ))}
            {generateCalendarDays().map((day, idx) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const dateStr = getLocalDateString(day);
              const hasApt = appointments.some((a) => a.date === dateStr);
              return (
                <div
                  key={idx}
                  className={`
                    flex items-center justify-center 
                    h-12 border border-green-200 text-sm
                    ${isCurrentMonth ? "bg-green-50 text-green-900" : "bg-green-100 text-green-300"}
                    ${hasApt ? "bg-green-500 text-white font-semibold" : ""}
                    cursor-pointer
                  `}
                >
                  {day.getDate()}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((a) => {
          const doctor = doctors.find((d) => d.id === a.doctorId);
          const Icon = doctor?.icon || Stethoscope;
          return (
            <Card key={a.id} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <CardTitle>{doctor?.name || "Unknown Doctor"}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(a.status)}>{a.status}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteAppointment(a.id)}
                    className="flex items-center gap-1 border-green-600 text-green-600 hover:bg-green-700"
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>Date: {a.date}</p>
                <p>Time: {a.time}</p>
                {a.location && <p>Location: {a.location}</p>}
                {a.notes && <p>Notes: {a.notes}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageLayout>
  );
};

export default AppointmentScheduler;
