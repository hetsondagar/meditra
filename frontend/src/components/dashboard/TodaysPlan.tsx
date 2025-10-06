import { useEffect, useState } from "react";
import axios from "axios";
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
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const getIcon = (type: string, completed: boolean) => {
    if (completed) return CheckCircle;
    switch (type) {
      case "medication":
        return AlertCircle;
      case "appointment":
        return Calendar;
      default:
        return Clock;
    }
  };
  const getTypeColor = (type: string, completed: boolean) => {
    if (completed) return "text-success";
    switch (type) {
      case "medication":
        return "text-warning";
      case "appointment":
        return "text-primary";
      case "exercise":
        return "text-secondary-dark";
      default:
        return "text-muted-foreground";
    }
  };
  useEffect(() => {
    const fetchTodaysPlan = async () => {
       try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/plan/today`);
      console.log("API Response:", res.data);
      const rawData = res.data.data || [];
       const formattedData: PlanItem[] = rawData.map((item: any) => ({
 id: String(item.id), 
 time: "TBD",         
 title: item.task,      
 description: `Type: ${item.task.includes('Vitamin') ? 'medication' : 'exercise'}`, 
 type: item.task.includes('Vitamin') ? "medication" : "exercise", 
completed: item.status === "completed", 
 urgent: item.status === "pending" && item.task.includes('Vitamin') 
 }));
 setPlanItems(formattedData);
 } catch (err) {
 console.error("Error fetching today's plan:", err);
} finally {
 setLoading(false);
 }
 };
    fetchTodaysPlan();
  }, []);

  if (loading)
    return <p className="text-center text-muted-foreground">Loading today's plan...</p>;
  if (!planItems.length)
    return <p className="text-center text-destructive">No plan items for today.</p>;

  const completedCount = planItems.filter((item) => item.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Today's Wellness Plan</h2>
          <p className="text-muted-foreground">Stay on track with your health goals</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {completedCount} of {planItems.length} completed
          </span>
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${(completedCount / planItems.length) * 100}%` }}
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
    p-4 border border-border/30 rounded-lg transition-all duration-300
    ${item.completed ? "opacity-75" : "hover:shadow-lg hover:shadow-green-400/40 hover:-translate-y-1"}
    ${item.urgent && !item.completed ? "ring-2 ring-warning/20 bg-warning/5" : ""}
  `}
  style={{ animationDelay: `${index * 100}ms` }}
>

              <div className="flex items-center gap-4">
                <div
                  className={`
                    p-2 rounded-lg transition-colors
                    ${item.completed ? "bg-success/20" : "bg-muted/50"}
                  `}
                >
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
                  <h3
                    className={`font-semibold text-card-foreground ${
                      item.completed ? "line-through" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                {!item.completed && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
                    onClick={async () => {
                      try {
                        await axios.post(
                          `${import.meta.env.VITE_BACKEND_URL}/dashboard/plan/${item.id}/complete`
                        );
                        setPlanItems((prev) =>
                          prev.map((p) =>
                            p.id === item.id ? { ...p, completed: true } : p
                          )
                        );
                      } catch (err) {
                        console.error("Error marking item complete:", err);
                      }
                    }}
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
