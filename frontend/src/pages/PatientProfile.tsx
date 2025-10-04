import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Edit3, 
  Heart, 
  Activity, 
  Weight, 
  Calendar,
  FileText,
  AlertTriangle,
  Pill,
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";
import axios from "axios";

interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
}

interface LabReport {
  id: string;
  test: string;
  result: string;
  unit: string;
  status: "normal" | "high" | "low";
  date: string;
  reference: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface HealthEvent {
  id: string;
  date: string;
  type: "appointment" | "lab" | "medication" | "vaccination";
  title: string;
  description: string;
  status: "completed" | "pending" | "cancelled";
}

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState<HealthMetric[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthEvents, setHealthEvents] = useState<HealthEvent[]>([]);
  const [loading, setLoading] = useState(true);
    const  BACKEND_URL=import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
 const fetchPatientData = async () => {
  setLoading(true);

  try {
    // Fetch metrics
    try {
      const metricsRes = await axios.get(`${BACKEND_URL}/api/profile/metrics`);
      setHealthMetrics(metricsRes.data.data || []);
      setAnimatedMetrics(metricsRes.data.data || []);
    } catch (err) {
      console.error("Error fetching metrics:", err);
    }

    // Fetch lab reports
    try {
      const reportsRes = await axios.get(`${BACKEND_URL}/api/profile/lab-reports`);
      setLabReports(reportsRes.data.data || []);
    } catch (err) {
      console.error("Error fetching lab reports:", err);
    }

    // Fetch allergies
    try {
      const allergiesRes = await axios.get(`${BACKEND_URL}/api/profile/allergies`);
      setAllergies(allergiesRes.data.data || []);
    } catch (err) {
      console.error("Error fetching allergies:", err);
    }

    // Fetch medications
    try {
      const medsRes = await axios.get(`${BACKEND_URL}/api/profile/medication`);
      setMedications(medsRes.data.data || []);
    } catch (err) {
      console.error("Error fetching medications:", err);
    }

    // Fetch health events
    try {
      const eventsRes = await axios.get(`${BACKEND_URL}/api/profile/events`);
      setHealthEvents(eventsRes.data.data || []);
    } catch (err) {
      console.error("Error fetching health events:", err);
    }

  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPatientData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800";
      case "high": return "bg-red-100 text-red-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "appointment": return <Calendar className="w-4 h-4" />;
      case "lab": return <FileText className="w-4 h-4" />;
      case "medication": return <Pill className="w-4 h-4" />;
      case "vaccination": return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "appointment": return "bg-blue-100 text-blue-800";
      case "lab": return "bg-purple-100 text-purple-800";
      case "medication": return "bg-green-100 text-green-800";
      case "vaccination": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <PageLayout title="Patient Profile">Loading...</PageLayout>;

  return (
    <PageLayout 
      title="Patient Profile" 
      subtitle="Your complete health overview and medical records"
    >
      <div className="space-y-8">
        {/* Profile Header */}
        <Card className="overflow-hidden bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 shadow-soft">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-green-500/30 shadow-medium group-hover:scale-105 transition-transform duration-300">
                  <AvatarImage src="/api/placeholder/96/96" alt="Patient Avatar" />
                  <AvatarFallback className="text-2xl font-brand bg-gradient-primary text-white">
                    AS
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-green-500/30 shadow-medium hover:shadow-elevated transition-all duration-300"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-brand text-foreground mb-2">Arjun Sharma</h2>
                <p className="text-muted-foreground mb-4">Patient ID: #PS-2024-001</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active Patient
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Regular Checkups
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {animatedMetrics.map((metric, index) => (
            <Card 
              key={metric.label}
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in-up bg-card/50 border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.unit}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="text-foreground font-medium">{metric.progress}%</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lab Reports, Allergies & Medications, Health Timeline */}
        {/* ... keep your existing layout here, replacing arrays with state: labReports, allergies, medications, healthEvents */}
      </div>
    </PageLayout>
  );
};

export default PatientProfile;
