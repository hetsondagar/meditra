import PageLayout from "@/components/PageLayout";
const HealthVault = () => {
  return (
    <PageLayout title="Blockchain Health Vault" subtitle="Secure records and privacy controls">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Secure Transfer</h2>
          <p className="text-muted-foreground">Encryption visuals placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Privacy Settings</h2>
          <p className="text-muted-foreground">Sliders and toggles placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default HealthVault;
/*import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Heart, 
  Moon, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Target,
  Zap,
  Thermometer,
  Droplets,
  Brain,
  Eye,
  Calendar,
  Filter
} from "lucide-react";

interface HealthMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
  color: string;
  target?: number;
}

interface ChartData {
  date: string;
  value: number;
  target?: number;
}

const HealthAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState<"day" | "week" | "month">("week");
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  const healthMetrics: HealthMetric[] = [
    {
      label: "Heart Rate",
      value: 72,
      unit: "BPM",
      change: -2,
      trend: "down",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-500",
      target: 70
    },
    {
      label: "Sleep Duration",
      value: 7.5,
      unit: "hrs",
      change: 0.5,
      trend: "up",
      icon: <Moon className="w-5 h-5" />,
      color: "text-blue-500",
      target: 8
    },
    {
      label: "Activity Level",
      value: 85,
      unit: "%",
      change: 5,
      trend: "up",
      icon: <Activity className="w-5 h-5" />,
      color: "text-green-500",
      target: 80
    },
    {
      label: "Steps",
      value: 12450,
      unit: "steps",
      change: 1200,
      trend: "up",
      icon: <Zap className="w-5 h-5" />,
      color: "text-purple-500",
      target: 10000
    }
  ];

  const heartRateData: ChartData[] = [
    { date: "Mon", value: 75, target: 70 },
    { date: "Tue", value: 73, target: 70 },
    { date: "Wed", value: 72, target: 70 },
    { date: "Thu", value: 71, target: 70 },
    { date: "Fri", value: 74, target: 70 },
    { date: "Sat", value: 70, target: 70 },
    { date: "Sun", value: 72, target: 70 }
  ];

  const sleepData: ChartData[] = [
    { date: "Mon", value: 7.2 },
    { date: "Tue", value: 7.8 },
    { date: "Wed", value: 6.9 },
    { date: "Thu", value: 8.1 },
    { date: "Fri", value: 7.5 },
    { date: "Sat", value: 8.3 },
    { date: "Sun", value: 7.5 }
  ];

  const activityData = [
    { name: "Walking", value: 45, color: "#4ade80" },
    { name: "Running", value: 25, color: "#22c55e" },
    { name: "Cycling", value: 20, color: "#16a34a" },
    { name: "Other", value: 10, color: "#15803d" }
  ];

  const weeklyActivityData = [
    { day: "Mon", steps: 8500, calories: 320, activeMinutes: 45 },
    { day: "Tue", steps: 12000, calories: 450, activeMinutes: 60 },
    { day: "Wed", steps: 9800, calories: 380, activeMinutes: 50 },
    { day: "Thu", steps: 15000, calories: 520, activeMinutes: 75 },
    { day: "Fri", steps: 11000, calories: 420, activeMinutes: 55 },
    { day: "Sat", steps: 18000, calories: 650, activeMinutes: 90 },
    { day: "Sun", steps: 12450, calories: 480, activeMinutes: 65 }
  ];

  const vitalsData = [
    { metric: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", color: "#22c55e" },
    { metric: "Body Temperature", value: "98.6", unit: "°F", status: "normal", color: "#22c55e" },
    { metric: "Oxygen Saturation", value: "98", unit: "%", status: "normal", color: "#22c55e" },
    { metric: "Blood Glucose", value: "95", unit: "mg/dL", status: "normal", color: "#22c55e" }
  ];

  useEffect(() => {
    // Animate counters on load
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      healthMetrics.forEach(metric => {
        newValues[metric.label] = metric.value;
      });
      setAnimatedValues(newValues);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-medium">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.payload.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PageLayout 
      title="Health Analytics" 
      subtitle="Comprehensive insights into your health metrics and trends"
    >
      <div className="space-y-8">
        <Card className="animate-fade-in-up bg-card/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Time Period:</span>
              </div>
              <Tabs value={timeFilter} onValueChange={(value) => setTimeFilter(value as "day" | "week" | "month")}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => (
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
                    <div className="text-2xl font-bold text-foreground">
                      {animatedValues[metric.label] || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">{metric.unit}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}
                      </span>
                    </div>
                  </div>
                  {metric.target && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: {metric.target}</span>
                        <span className="text-muted-foreground">
                          {Math.round((metric.value / metric.target) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(metric.value / metric.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-foreground">Heart Rate Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    name="Target"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    name="Heart Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-blue-500" />
                <span className="text-foreground">Sleep Duration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fill="url(#sleepGradient)"
                    strokeWidth={2}
                    name="Sleep Hours"
                  />
                  <defs>
                    <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span>Activity Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {activityData.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: activity.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{activity.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span>Weekly Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis yAxisId="left" stroke="#666" />
                  <YAxis yAxisId="right" orientation="right" stroke="#666" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="steps" fill="#4ade80" name="Steps" />
                  <Bar yAxisId="right" dataKey="activeMinutes" fill="#3b82f6" name="Active Minutes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <span>Vitals Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vitalsData.map((vital, index) => (
                <div 
                  key={vital.metric}
                  className="p-4 border rounded-lg hover:shadow-medium transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{vital.metric}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      {vital.status}
                    </Badge>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold" style={{ color: vital.color }}>
                      {vital.value}
                    </span>
                    <span className="text-sm text-gray-500">{vital.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-foreground">Health Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-card/50 border border-green-500/20 rounded-lg shadow-soft">
                  <h4 className="font-medium text-green-400 mb-2">🎉 Great Progress!</h4>
                  <p className="text-sm text-foreground/80">
                    Your activity level has increased by 5% this week. Keep up the excellent work!
                  </p>
                </div>
                <div className="p-4 bg-card/50 border border-blue-500/20 rounded-lg shadow-soft">
                  <h4 className="font-medium text-blue-400 mb-2">💤 Sleep Quality</h4>
                  <p className="text-sm text-foreground/80">
                    Your sleep duration is improving. Aim for 8 hours consistently for optimal health.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-card/50 border border-orange-500/20 rounded-lg shadow-soft">
                  <h4 className="font-medium text-orange-400 mb-2">❤️ Heart Health</h4>
                  <p className="text-sm text-foreground/80">
                    Your heart rate is within normal range. Continue your current exercise routine.
                  </p>
                </div>
                <div className="p-4 bg-card/50 border border-purple-500/20 rounded-lg shadow-soft">
                  <h4 className="font-medium text-purple-400 mb-2">🎯 Goals</h4>
                  <p className="text-sm text-foreground/80">
                    You're on track to meet your weekly step goal. Just 2,000 more steps to go!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default HealthAnalytics;
*/