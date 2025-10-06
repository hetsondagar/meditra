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
  Edit3,
  Calendar,
  FileText,
  Pill,
  CheckCircle2,
  Clock
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
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthEvents, setHealthEvents] = useState<HealthEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const fetchPatientData = async () => {
    setLoading(true);
    try {
      const [metricsRes, reportsRes, allergiesRes, medsRes, eventsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/profile/metrics`),
        axios.get(`${BACKEND_URL}/api/profile/lab-reports`),
        axios.get(`${BACKEND_URL}/api/profile/allergies`),
        axios.get(`${BACKEND_URL}/api/profile/medication`),
        axios.get(`${BACKEND_URL}/api/profile/events`),
      ]);
      setHealthMetrics(metricsRes.data.data || []);
      setLabReports(reportsRes.data.data || []);
      setAllergies(allergiesRes.data.data || []);
      setMedications(medsRes.data.data || []);
      setHealthEvents(eventsRes.data.data || []);
    } catch (err) {
      console.error("Error fetching patient data:", err);
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
  if (loading)
    return (
      <PageLayout title="Patient Profile">
        <div className="flex justify-center items-center min-h-[60vh] text-lg text-muted-foreground animate-pulse">
          Loading health data...
        </div>
      </PageLayout>
    );
  return (
    <PageLayout title="Patient Profile" subtitle="Your complete health overview and medical records">
      <div className="space-y-8 animate-fadeIn">
        <Card className="overflow-hidden bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 shadow-lg transition-all duration-300 hover:shadow-emerald-500/30 hover:-translate-y-1">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-green-500/30 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <AvatarImage src="/api/placeholder/96/96" alt="Patient Avatar" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-green-600 to-blue-600 text-white">
                  AS
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-green-500/30 hover:bg-green-500/10 hover:scale-110 shadow-md transition-all duration-300"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 className="w-4 h-4 text-green-600" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-foreground mb-2 tracking-tight">
                Arjun Sharma
              </h2>
              <p className="text-muted-foreground mb-4">Patient ID: #PS-2024-001</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 transition-colors">
                  Active Patient
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-green-500/30 transition-colors">
                  Regular Checkups
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {healthMetrics.map((metric, idx) => (
    <Card
      key={idx}
      className="group border border-green-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 hover:border-green-400/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-full border ${metric.color} group-hover:scale-110 transition-transform duration-300`}
          >
            {metric.icon}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-300">{metric.value}</div>
            <div className="text-sm text-gray-400">{metric.unit}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{metric.label}</span>
            <span className="text-green-400 font-medium">{metric.progress}%</span>
          </div>
          <Progress
            value={metric.progress}
            className="h-2 bg-gray-700 [&>div]:bg-green-400"
          />
        </div>
      </CardContent>
    </Card>
  ))}
</div>
        <Separator />
        <h3 className="text-xl font-semibold mb-2">Lab Reports</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {labReports.map(report => (
    <Card
      key={report.id}
      className="group border border-green-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 hover:border-green-400/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-green-300 group-hover:text-green-400 transition-colors">
          {report.test}
        </CardTitle>
        <Badge className={`${getStatusColor(report.status)} capitalize`}>
          {report.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1 text-gray-300">
        <p>
          <span className="text-gray-400">Result:</span> {report.result} {report.unit}
        </p>
        <p>
          <span className="text-gray-400">Reference:</span> {report.reference}
        </p>
        <p>
          <span className="text-gray-400">Date:</span> {report.date}
        </p>
      </CardContent>
    </Card>
  ))}
</div>
        <Separator />
        <h3 className="text-xl font-semibold mb-2">Allergies</h3>
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy, idx) => (
            <Badge
              key={idx}
              className="bg-red-100 text-red-800 hover:bg-green-300 transition-all cursor-pointer"
            >
              {allergy}
            </Badge>
          ))}
        </div>
        <Separator />
                <h3 className="text-xl font-semibold mb-2">Medications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medications.map((med, idx) => (
            <Card
              key={idx}
              className="hover:shadow-xl hover:shadow-green-300/30 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent>
                <p className="font-medium">{med.name}</p>
                <p>Dosage: {med.dosage}</p>
                <p>Frequency: {med.frequency}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator />
        <h3 className="text-xl font-semibold mb-2">Health Timeline</h3>
        <Accordion type="single" collapsible className="rounded-lg border border-green-500/20">
          {healthEvents.map(event => (
            <AccordionItem
              key={event.id}
              value={event.id}
              className="hover:bg-green-50/50 transition-colors duration-200"
            >
              <AccordionTrigger className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getEventIcon(event.type)}
                  <span>{event.title}</span>
                </div>
                <Badge className={`${getEventColor(event.type)} hover:scale-105 transition-transform`}>
                  {event.status}
                </Badge>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                <p>{event.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Date: {event.date}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageLayout>
  );
};
export default PatientProfile;
