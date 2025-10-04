import { useEffect, useState } from "react";
import axios from "axios";
import { WellnessCard } from "./WellnessCard";
import { Heart, Activity, Droplet, Zap } from "lucide-react";

const iconMap: Record<string, any> = {
  heartRate: Heart,
  bloodPressure: Activity,
  steps: Zap,
  caloriesBurned: Droplet,
};

export const HealthMetrics = () => {
  const [metrics, setMetrics] = useState<Record<string, any> | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [metricsRes, historyRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/health/metrics`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/health/metrics/history`, {
            params: { metric: "heartRate", range: "7days" },
          }),
        ]);

        if (metricsRes.data.success) setMetrics(metricsRes.data.data);
        if (historyRes.data.success) setHistory(historyRes.data.data);
      } catch (error) {
        console.error("Error fetching health data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <p className="text-center text-muted-foreground">Loading health data...</p>;
  if (!metrics) return <p className="text-center text-destructive">No data available.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Health Overview</h2>
          <p className="text-muted-foreground">Fetched live from your backend</p>
        </div>
        <div className="flex items-center gap-2 text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live connection</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {Object.entries(metrics).map(([key, value], index) => {
          const Icon = iconMap[key] || Droplet;
          return (
            <div
              key={key}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <WellnessCard
                title={key.replace(/([A-Z])/g, " $1")}
                value={String(value)}
                subtitle="Fetched from backend"
                icon={Icon}
                variant="success"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Heart Rate History (Last 7 Days)</h3>
        <div className="bg-card p-4 rounded-lg shadow">
          {history.map((item) => (
            <div
              key={item.date}
              className="flex justify-between border-b border-muted-foreground/20 py-2"
            >
              <span className="text-muted-foreground">{item.date}</span>
              <span className="font-medium">{item.value} BPM</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
