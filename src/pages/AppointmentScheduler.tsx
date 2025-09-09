import { useState, useEffect } from "react";
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
  User, 
  MapPin, 
  Bell, 
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Phone,
  Video,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Bone
} from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
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

interface TimeSlot {
  time: string;
  available: boolean;
}

const AppointmentScheduler = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2024-01-15",
      time: "11:30 AM",
      doctor: "Dr. Bhatt",
      specialty: "Cardiology",
      type: "in-person",
      status: "confirmed",
      location: "Room 205, Cardiology Wing",
      notes: "Annual heart checkup"
    },
    {
      id: "2",
      date: "2024-01-20",
      time: "2:00 PM",
      doctor: "Dr. Michael Johnson",
      specialty: "Dermatology",
      type: "virtual",
      status: "pending",
      notes: "Skin consultation"
    },
    {
      id: "3",
      date: "2024-01-25",
      time: "10:00 AM",
      doctor: "Dr. Emily Davis",
      specialty: "General Practice",
      type: "in-person",
      status: "confirmed",
      location: "Room 101, Main Building"
    }
  ];

  const initialNotifications: Notification[] = [
    {
      id: "1",
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Bhatt is tomorrow at 11:30 AM",
      type: "reminder",
      time: "2 hours ago",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      title: "Test Results Available",
      message: "Your blood test results from January 15th are now available",
      type: "result",
      time: "1 day ago",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      title: "Hydration Reminder",
      message: "Remember to drink water throughout the day",
      type: "alert",
      time: "3 hours ago",
      read: true,
      priority: "low"
    },
    {
      id: "4",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Johnson has been confirmed for Jan 20th",
      type: "appointment",
      time: "2 days ago",
      read: true,
      priority: "medium"
    }
  ];

  const doctors = [
    { id: "1", name: "Dr. Bhatt", specialty: "Cardiology", icon: Heart },
    { id: "2", name: "Dr. Michael Johnson", specialty: "Dermatology", icon: Eye },
    { id: "3", name: "Dr. Emily Davis", specialty: "General Practice", icon: Stethoscope },
    { id: "4", name: "Dr. Robert Wilson", specialty: "Neurology", icon: Brain },
    { id: "5", name: "Dr. Lisa Brown", specialty: "Orthopedics", icon: Bone }
  ];

  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", available: true },
    { time: "9:30 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "11:30 AM", available: true },
    { time: "2:00 PM", available: true },
    { time: "2:30 PM", available: true },
    { time: "3:00 PM", available: false },
    { time: "3:30 PM", available: true },
    { time: "4:00 PM", available: true }
  ];

  useEffect(() => {
    setNotifications(initialNotifications);
  }, []);

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment": return <Calendar className="w-4 h-4" />;
      case "reminder": return <Bell className="w-4 h-4" />;
      case "result": return <CheckCircle2 className="w-4 h-4" />;
      case "alert": return <AlertCircle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  const getSpecialtyIcon = (specialty: string) => {
    const doctor = doctors.find(d => d.specialty === specialty);
    return doctor ? <doctor.icon className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
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
    return appointments.some(apt => apt.date === dateStr);
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  return (
    <PageLayout 
      title="Appointment Scheduler" 
      subtitle="Manage your appointments and stay updated with notifications"
    >
      <div className="space-y-8">
        {/* Notifications Preview */}
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Recent Notifications</span>
              <Badge variant="secondary" className="ml-auto">
                {notifications.filter(n => !n.read).length} unread
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.slice(0, 4).map((notification, index) => (
                <div 
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-medium cursor-pointer animate-fade-in ${
                    getPriorityColor(notification.priority)
                  } ${notification.read ? 'bg-card/30' : 'bg-card/50 shadow-soft'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/20'}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'text-foreground/80'}`}>
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span>Appointment Calendar</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                      className="hover:bg-green-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="font-medium min-w-[120px] text-center">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                      className="hover:bg-green-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const hasAppointment = hasAppointmentOnDate(date);
                    
                    return (
                      <div
                        key={index}
                        className={`p-2 h-12 flex flex-col items-center justify-center text-sm cursor-pointer rounded-lg transition-all duration-200 hover:bg-green-50 animate-fade-in ${
                          isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                        } ${isToday ? 'bg-green-100 font-bold' : ''} ${hasAppointment ? 'bg-blue-50' : ''}`}
                        style={{ animationDelay: `${index * 10}ms` }}
                        onClick={() => setSelectedDate(date)}
                      >
                        <span>{date.getDate()}</span>
                        {hasAppointment && (
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Appointments */}
            {selectedDate && (
              <Card className="mt-6 animate-fade-in-up">
                <CardHeader>
                  <CardTitle>
                    Appointments for {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getAppointmentsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                      {getAppointmentsForDate(selectedDate).map((appointment, index) => (
                        <div 
                          key={appointment.id}
                          className="p-4 border rounded-lg hover:shadow-medium transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-full">
                                {getSpecialtyIcon(appointment.specialty)}
                              </div>
                              <div>
                                <h4 className="font-medium">{appointment.doctor}</h4>
                                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(appointment.status)}
                                <span>{appointment.status}</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {appointment.type === "virtual" ? (
                                <Video className="w-4 h-4 text-gray-500" />
                              ) : (
                                <MapPin className="w-4 h-4 text-gray-500" />
                              )}
                              <span>{appointment.type === "virtual" ? "Virtual" : appointment.location}</span>
                            </div>
                          </div>
                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{appointment.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No appointments scheduled for this date</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Actions & Booking */}
          <div className="space-y-6">
            {/* Book New Appointment */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-green-600" />
                  <span>Book Appointment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-primary hover:shadow-elevated transition-all duration-300 animate-pulse-glow">
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule New Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book New Appointment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="doctor">Select Doctor</Label>
                        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.map(doctor => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                <div className="flex items-center space-x-2">
                                  <doctor.icon className="w-4 h-4" />
                                  <span>{doctor.name} - {doctor.specialty}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date">Select Date</Label>
                        <Input type="date" id="date" />
                      </div>
                      <div>
                        <Label htmlFor="time">Select Time</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(slot => (
                              <SelectItem 
                                key={slot.time} 
                                value={slot.time}
                                disabled={!slot.available}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{slot.time}</span>
                                  {slot.available ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea id="notes" placeholder="Any specific concerns or notes..." />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsBookingOpen(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="flex-1 bg-gradient-primary"
                          onClick={() => setIsBookingOpen(false)}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Upcoming</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((appointment, index) => (
                    <div 
                      key={appointment.id}
                      className="p-3 border rounded-lg hover:shadow-medium transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{appointment.doctor}</h4>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {appointment.type === "virtual" ? (
                            <Video className="w-3 h-3" />
                          ) : (
                            <MapPin className="w-3 h-3" />
                          )}
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AppointmentScheduler;
