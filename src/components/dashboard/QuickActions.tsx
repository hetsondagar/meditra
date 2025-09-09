import { 
  Calendar, 
  Pill, 
  MessageCircle, 
  FileText, 
  Camera, 
  AlertTriangle,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const QuickActions = () => {
  const actions = [
    {
      title: "Book Appointment",
      description: "Schedule with your doctor",
      icon: Calendar,
      color: "bg-gradient-primary",
      urgent: false
    },
    {
      title: "Medication Reminder",
      description: "2 pills due in 30 minutes",
      icon: Pill,
      color: "bg-gradient-wellness",
      urgent: true
    },
    {
      title: "Consult AI Doctor",
      description: "Get instant health advice",
      icon: MessageCircle,
      color: "bg-gradient-secondary",
      urgent: false
    },
    {
      title: "Upload Health Record",
      description: "Add test results or reports",
      icon: FileText,
      color: "bg-gradient-calm",
      urgent: false
    },
    {
      title: "Nutrition Scanner",
      description: "Scan food for nutrition info",
      icon: Camera,
      color: "bg-primary",
      urgent: false
    },
    {
      title: "Emergency Alert",
      description: "Quick access to emergency contacts",
      icon: AlertTriangle,
      color: "bg-destructive",
      urgent: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-card-foreground">Quick Actions</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <div
            key={action.title}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <Card
              className={`
                group relative p-4 cursor-pointer border-border/30 rounded-2xl hover-lift 
                hover:shadow-xl transition-all duration-300
                ${action.urgent ? 'ring-2 ring-warning/20 animate-pulse-glow' : ''}
              `}
            >
            {action.urgent && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-warning rounded-full animate-pulse"></div>
            )}
            
            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-xl shadow-soft group-hover:shadow-glow transition-all duration-300
                ${action.color}
              `}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
              </div>
            </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};