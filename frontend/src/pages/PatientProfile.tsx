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

  const healthMetrics: HealthMetric[] = [
    {
      label: "Age",
      value: "34",
      unit: "years",
      progress: 100,
      icon: <User className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      label: "Weight",
      value: "72",
      unit: "kg",
      progress: 85,
      icon: <Weight className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      label: "BMI",
      value: "24.2",
      unit: "kg/m²",
      progress: 75,
      icon: <Activity className="w-5 h-5" />,
      color: "text-emerald-600"
    },
    {
      label: "Heart Rate",
      value: "72",
      unit: "BPM",
      progress: 90,
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-500"
    }
  ];

  const labReports: LabReport[] = [
    {
      id: "1",
      test: "Cholesterol",
      result: "190",
      unit: "mg/dL",
      status: "normal",
      date: "2024-01-15",
      reference: "< 200 mg/dL"
    },
    {
      id: "2",
      test: "Vitamin D",
      result: "32",
      unit: "ng/mL",
      status: "low",
      date: "2024-01-15",
      reference: "30-100 ng/mL"
    },
    {
      id: "3",
      test: "Blood Glucose",
      result: "95",
      unit: "mg/dL",
      status: "normal",
      date: "2024-01-15",
      reference: "70-100 mg/dL"
    },
    {
      id: "4",
      test: "Hemoglobin A1C",
      result: "5.4",
      unit: "%",
      status: "normal",
      date: "2024-01-15",
      reference: "< 5.7%"
    }
  ];

  const allergies = ["Peanuts", "Pollen", "Shellfish"];
  const medications = [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily" },
    { name: "Omega-3", dosage: "1000mg", frequency: "Once daily" }
  ];

  const healthEvents: HealthEvent[] = [
    {
      id: "1",
      date: "2024-01-20",
      type: "appointment",
      title: "Annual Physical Exam",
      description: "Complete health checkup with Dr. Bhatt",
      status: "completed"
    },
    {
      id: "2",
      date: "2024-01-15",
      type: "lab",
      title: "Blood Work Results",
      description: "Comprehensive metabolic panel completed",
      status: "completed"
    },
    {
      id: "3",
      date: "2024-01-10",
      type: "medication",
      title: "Medication Adjustment",
      description: "Metformin dosage increased to 500mg",
      status: "completed"
    },
    {
      id: "4",
      date: "2024-02-15",
      type: "appointment",
      title: "Follow-up Consultation",
      description: "Review lab results with Dr. Bhatt",
      status: "pending"
    }
  ];

  useEffect(() => {
    // Animate metrics on load
    const timer = setTimeout(() => {
      setAnimatedMetrics(healthMetrics);
    }, 300);
    return () => clearTimeout(timer);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lab Reports */}
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Recent Lab Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {labReports.map((report, index) => (
                  <AccordionItem 
                    key={report.id} 
                    value={report.id}
                    className="border border-border/50 rounded-lg px-4 animate-fade-in bg-card/30"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="text-left">
                          <div className="font-medium text-foreground">{report.test}</div>
                          <div className="text-sm text-muted-foreground">{report.date}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold">{report.result} {report.unit}</span>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference Range:</span>
                          <span className="font-medium">{report.reference}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{report.date}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Allergies & Medications */}
          <div className="space-y-6">
            {/* Allergies */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>Allergies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allergies.map((allergy, index) => (
                    <div 
                      key={allergy}
                      className="flex items-center space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="font-medium text-red-300">{allergy}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="w-5 h-5 text-green-600" />
                  <span>Current Medications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {medications.map((med, index) => (
                    <div 
                      key={med.name}
                      className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-green-300">{med.name}</h4>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                          Active
                        </Badge>
                      </div>
                      <div className="text-sm text-green-200 space-y-1">
                        <div>Dosage: {med.dosage}</div>
                        <div>Frequency: {med.frequency}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Health Timeline */}
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Health Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {healthEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className="flex items-start space-x-4 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{event.date}</span>
                        <Badge 
                          variant={event.status === "completed" ? "default" : "secondary"}
                          className={event.status === "completed" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PatientProfile;
