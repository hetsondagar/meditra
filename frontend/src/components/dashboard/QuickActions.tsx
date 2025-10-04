import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Pill, MessageCircle, FileText, Camera, AlertTriangle, Plus } from "lucide-react";

const iconMap: Record<string, any> = {
  appointment: Calendar,
  medication: Pill,
  aiConsult: MessageCircle,
  uploadRecord: FileText,
  nutrition: Camera,
  emergency: AlertTriangle,
};

export const QuickActions = () => {
  const [reminders, setReminders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [remindersRes, appointmentsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/quick-actions/reminders/notifications`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/quick-actions/appointments`),
        ]);

        if (remindersRes.data.success) setReminders(remindersRes.data.data);
        if (appointmentsRes.data.success) setAppointments(appointmentsRes.data.data);
      } catch (err) {
        console.error("Error fetching quick actions data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-muted-foreground">Loading quick actions...</p>;

  // Build dynamic actions array from fetched data
  const actions = [
    ...reminders.map((r) => ({
      title: r.type === "medication" ? "Medication Reminder" : r.type,
      description: r.message,
      icon: iconMap[r.type] || Pill,
      color: r.type === "medication" ? "bg-gradient-wellness" : "bg-gradient-primary",
      urgent: r.type === "medication",
    })),
    ...appointments.map((a) => ({
      title: "Book Appointment",
      description: `${a.doctor} • ${a.date} at ${a.time}`,
      icon: Calendar,
      color: "bg-gradient-primary",
      urgent: false,
    })),
    {
      title: "Consult AI Doctor",
      description: "Get instant health advice",
      icon: MessageCircle,
      color: "bg-gradient-secondary",
      urgent: false,
    },
    {
      title: "Nutrition Scanner",
      description: "Scan food for nutrition info",
      icon: Camera,
      color: "bg-primary",
      urgent: false,
    },
    {
      title: "Emergency Alert",
      description: "Quick access to emergency contacts",
      icon: AlertTriangle,
      color: "bg-destructive",
      urgent: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-card-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Access your most used features instantly</p>
        </div>
        <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <div key={index} className="animate-fade-in-up w-full" style={{ animationDelay: `${index * 100}ms` }}>
            <Card
              className={`
                group relative p-6 cursor-pointer border border-border/50 rounded-xl 
                hover:shadow-elevated hover:-translate-y-1 transition-all duration-300
                bg-card/50 hover:bg-gradient-to-br hover:from-card/60 hover:to-card/40
                w-full h-full flex flex-col
                ${action.urgent ? "ring-2 ring-warning/20 shadow-warning/10" : ""}
              `}
            >
              {action.urgent && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-warning rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-xl shadow-soft group-hover:shadow-medium transition-all duration-300 flex-shrink-0 ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0 overflow-hidden">
                    <h3 className="font-semibold text-base text-card-foreground group-hover:text-primary transition-colors truncate">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2 break-words">
                      {action.description}
                    </p>
                  </div>
                </div>
                <div className="pt-2 mt-auto">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200">
                    <span className="text-sm font-medium">Take Action</span>
                    <span className="ml-auto text-xs opacity-60">→</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
