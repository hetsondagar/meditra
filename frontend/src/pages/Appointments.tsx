import PageLayout from "@/components/PageLayout";
const Appointments = () => {
  return (
    <PageLayout title="Appointments & Virtual Consultation" subtitle="Schedule and join virtual visits">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Interactive Calendar</h2>
          <p className="text-muted-foreground">Drag-and-drop scheduling placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Virtual Consultation</h2>
          <p className="text-muted-foreground">Video call UI and waiting room animations placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default Appointments;
/*import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  Video,
  MapPin,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Bone
} from "lucide-react";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  // Fetch all backend data
  useEffect(() => {
    fetchAppointments();
    fetchNotifications();
    fetchDoctors();
  }, []);

  useEffect(() => {
    const doctor = doctors.find(d => d.id === selectedDoctor);
    setTimeSlots(doctor?.availableSlots || []);
  }, [selectedDoctor, doctors]);

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
        icon: getSpecialtyIcon(doc.specialty)
      }));
      setDoctors(doctorsWithIcons);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      await axios.put(`${BACKEND_URL}/api/appointments-scheduler/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle2 className="w-4 h-4" />;
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSpecialtyIcon = (specialty: string) => {
    switch(specialty) {
      case "Cardiology": return Heart;
      case "Dermatology": return Eye;
      case "General Practice": return Stethoscope;
      case "Neurology": return Brain;
      case "Orthopedics": return Bone;
      default: return Stethoscope;
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

  const hasAppointmentOnDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.some(a => a.date === dateStr);
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(a => a.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  // Submit new appointment
  const bookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;
    try {
      const doctor = doctors.find(d => d.id === selectedDoctor);
      const newApt = {
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        doctorId: selectedDoctor,
        doctor: doctor?.name,
        specialty: doctor?.specialty,
        type: "in-person",
        status: "pending"
      };
      await axios.post(`${BACKEND_URL}/api/appointments-scheduler/appointments`, newApt);
      fetchAppointments();
      setIsBookingOpen(false);
    } catch (err) {
      console.error("Failed to book appointment", err);
    }
  };

  return (
  <PageLayout title="Appointment Scheduler" subtitle="Manage appointments & notifications">

  <h2>Appointments</h2>
  {appointments.length === 0 && <p>No appointments</p>}
  {appointments.map((apt) => (
    <Card key={apt.id} className="mb-2">
      <CardHeader>
        <CardTitle>{apt.doctor || "Unknown Doctor"}</CardTitle>
        <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
      </CardHeader>
      <CardContent>
        <p>Date: {apt.date}</p>
        <p>Time: {apt.time}</p>
        {apt.location && <p>Location: {apt.location}</p>}
        {apt.notes && <p>Notes: {apt.notes}</p>}
      </CardContent>
    </Card>
  ))}

</PageLayout>

  );
};

export default AppointmentScheduler;
*/