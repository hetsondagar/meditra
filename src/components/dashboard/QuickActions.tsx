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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-card-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Access your most used features instantly</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <div
            key={action.title}
            className="animate-fade-in-up w-full"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card
              className={`
                group relative p-6 cursor-pointer border border-border/50 rounded-xl 
                hover:shadow-elevated hover:-translate-y-1 transition-all duration-300
                bg-card/50 hover:bg-gradient-to-br hover:from-card/60 hover:to-card/40
                w-full h-full flex flex-col
                ${action.urgent ? 'ring-2 ring-warning/20 shadow-warning/10' : ''}
              `}
            >
              {/* Urgent Indicator */}
              {action.urgent && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-warning rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
              
              {/* Content Layout */}
              <div className="space-y-4 flex-1 flex flex-col">
                {/* Icon and Title Row */}
                <div className="flex items-start gap-3">
                  <div className={`
                    p-3 rounded-xl shadow-soft group-hover:shadow-medium transition-all duration-300 flex-shrink-0
                    ${action.color}
                  `}>
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

                {/* Action Button */}
                <div className="pt-2 mt-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  >
                    <span className="text-sm font-medium">Take Action</span>
                    <span className="ml-auto text-xs opacity-60">→</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl border border-green-500/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">2 urgent actions pending</span>
          </div>
          <div className="text-green-300 font-medium">
            Last updated: Just now
          </div>
        </div>
      </div>
    </div>
  );
};