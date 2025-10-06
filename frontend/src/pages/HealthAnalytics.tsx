import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  Heart, Moon, Activity, TrendingUp, TrendingDown,
  Target, Zap, Thermometer, Brain, Calendar, Filter
} from "lucide-react";

const API_BASE = "http://localhost:3000/api/analytics";

export default function HealthAnalytics() {
  const [metrics, setMetrics] = useState([]);
  const [metricHistory, setMetricHistory] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [activityData, setActivityData] = useState<any>(null);
  const [vitals, setVitals] = useState([]);
  const [insights, setInsights] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [
          metricsRes,
          historyRes,
          sleepRes,
          activityRes,
          vitalsRes,
          insightsRes,
        ] = await Promise.all([
          axios.get(`${API_BASE}/metrics`),
          axios.get(`${API_BASE}/metric-history`),
          axios.get(`${API_BASE}/sleep`),
          axios.get(`${API_BASE}/activity`),
          axios.get(`${API_BASE}/vitals`),
          axios.get(`${API_BASE}/insights`),
        ]);

        setMetrics(metricsRes.data.data || []);
        setMetricHistory(historyRes.data.data || []);
        setSleepData(sleepRes.data.data || []);
        setActivityData(activityRes.data.data || {});
        setVitals(vitalsRes.data.data || []);
        setInsights(insightsRes.data.data || []);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <PageLayout title="Health Analytics Dashboard">
        <div className="flex justify-center items-center h-[80vh] text-lg">
          Loading analytics...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Health Analytics Dashboard">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Health Analytics</h1>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter Data
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* --- OVERVIEW TAB --- */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {metrics.map((m, idx) => (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{m.label}</CardTitle>
                  {m.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {m.value} {m.unit}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Target: {m.target} ({m.change > 0 ? "+" : ""}
                    {m.change})
                  </p>
                  <Progress value={(m.value / m.target) * 100} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Trend (Past Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metricHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#eb4908ff"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ACTIVITY TAB --- */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={activityData?.distribution}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {activityData?.distribution.map((entry: any, index: number) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activityData?.weekly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- SLEEP TAB --- */}
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Duration (hrs)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    fill="#bae6fd"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- VITALS TAB --- */}
        <TabsContent value="vitals">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitals.map((v, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{v.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {v.value} {v.unit}
                  </div>
                  <Badge
                    style={{ backgroundColor: v.color }}
                    className="mt-2 text-white"
                  >
                    {v.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* --- INSIGHTS TAB --- */}
        <TabsContent value="insights" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((i, idx) => (
            <Card
              key={idx}
              className="border-l-4"
              style={{ borderLeftColor: i.color }}
            >
              <CardHeader>
                <CardTitle>{i.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{i.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
