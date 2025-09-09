import { Heart, Activity, Droplet, Zap, Brain, Moon } from "lucide-react";
import { WellnessCard } from "./WellnessCard";

export const HealthMetrics = () => {
  const metrics = [
    {
      title: "Heart Rate",
      value: "72 BPM",
      subtitle: "Resting • Normal range",
      icon: Heart,
      variant: "success" as const,
      trend: "stable" as const
    },
    {
      title: "Blood Pressure",
      value: "118/78",
      subtitle: "mmHg • Optimal",
      icon: Activity,
      variant: "success" as const,
      trend: "up" as const
    },
    {
      title: "Blood Sugar",
      value: "95 mg/dL",
      subtitle: "Fasting • Normal",
      icon: Droplet,
      variant: "info" as const,
      trend: "stable" as const
    },
    {
      title: "Energy Level",
      value: "85%",
      subtitle: "Based on activity",
      icon: Zap,
      variant: "default" as const,
      trend: "up" as const
    },
    {
      title: "Stress Level",
      value: "Low",
      subtitle: "Mindfulness: 8 min",
      icon: Brain,
      variant: "success" as const,
      trend: "up" as const
    },
    {
      title: "Sleep Quality",
      value: "8.2h",
      subtitle: "Deep sleep: 2.1h",
      icon: Moon,
      variant: "info" as const,
      trend: "stable" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Health Overview</h2>
          <p className="text-muted-foreground">Real-time insights from your connected devices</p>
        </div>
        <div className="flex items-center gap-2 text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">All systems normal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <WellnessCard {...metric} />
          </div>
        ))}
      </div>
    </div>
  );
};