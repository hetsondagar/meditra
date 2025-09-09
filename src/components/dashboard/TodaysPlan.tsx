import { Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: "medication" | "appointment" | "exercise" | "checkup";
  completed: boolean;
  urgent?: boolean;
}

export const TodaysPlan = () => {
  const planItems: PlanItem[] = [
    {
      id: "1",
      time: "09:00 AM",
      title: "Morning Medication",
      description: "Metformin 500mg, Vitamin D",
      type: "medication",
      completed: true
    },
    {
      id: "2", 
      time: "10:30 AM",
      title: "Dr. Johnson Consultation",
      description: "Quarterly checkup - Video call",
      type: "appointment",
      completed: false,
      urgent: true
    },
    {
      id: "3",
      time: "02:00 PM",
      title: "Afternoon Walk",
      description: "30 minutes cardio exercise",
      type: "exercise",
      completed: false
    },
    {
      id: "4",
      time: "08:00 PM",
      title: "Evening Medication",
      description: "Blood pressure medication",
      type: "medication",
      completed: false
    }
  ];

  const getIcon = (type: string, completed: boolean) => {
    if (completed) return CheckCircle;
    
    switch (type) {
      case "medication": return AlertCircle;
      case "appointment": return Calendar;
      default: return Clock;
    }
  };

  const getTypeColor = (type: string, completed: boolean) => {
    if (completed) return "text-success";
    
    switch (type) {
      case "medication": return "text-warning";
      case "appointment": return "text-primary";
      case "exercise": return "text-secondary-dark";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Today's Wellness Plan</h2>
          <p className="text-muted-foreground">Stay on track with your health goals</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {planItems.filter(item => item.completed).length} of {planItems.length} completed
          </span>
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ 
                width: `${(planItems.filter(item => item.completed).length / planItems.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {planItems.map((item, index) => {
          const Icon = getIcon(item.type, item.completed);
          const colorClass = getTypeColor(item.type, item.completed);
          
          return (
            <Card 
              key={item.id}
              className={`
                p-4 border-border/30 hover-lift transition-all duration-300 animate-fade-in
                ${item.urgent && !item.completed ? 'ring-2 ring-warning/20 bg-warning/5' : ''}
                ${item.completed ? 'opacity-75' : ''}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${item.completed ? 'bg-success/20' : 'bg-muted/50'}
                `}>
                  <Icon className={`h-5 w-5 ${colorClass}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-primary">{item.time}</span>
                    {item.urgent && !item.completed && (
                      <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className={`
                    font-semibold text-card-foreground
                    ${item.completed ? 'line-through' : ''}
                  `}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>

                {!item.completed && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
                  >
                    Mark Done
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};