import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calendar,
  TrendingUp,
  Award,
  Bell,
  Plus,
  Sun,
  Moon,
  Coffee,
  Utensils,
  Zap,
  Target,
  Star,
  Heart,
  Shield
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
  category: "morning" | "afternoon" | "evening" | "night";
  icon?: React.ReactNode;
  color?: string;
  instructions?: string;
}

interface AdherenceData {
  date: string;
  taken: number;
  total: number;
  percentage: number;
}

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  progress?: number;
  icon?: React.ReactNode;
  color?: string;
}

const MedicationTracker = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [adherenceData, setAdherenceData] = useState<AdherenceData[]>([]);
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [showMissedAlert, setShowMissedAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  // map med name/category -> icon & color for UI (keeps UI identical)
  const getMedicationIcon = (name: string, category?: string) => {
    if (/vitamin/i.test(name)) return <Sun className="w-5 h-5" />;
    if (/omega/i.test(name) || /fish/i.test(name)) return <Heart className="w-5 h-5" />;
    if (/magnesium/i.test(name)) return <Moon className="w-5 h-5" />;
    // fallback: show pill for medicines
    return <Pill className="w-5 h-5" />;
  };

  const getMedicationColor = (name: string) => {
    if (/metformin/i.test(name)) return "text-blue-600";
    if (/vitamin/i.test(name)) return "text-yellow-600";
    if (/omega/i.test(name)) return "text-red-500";
    if (/magnesium/i.test(name)) return "text-purple-600";
    return "text-blue-600";
  };

  // map categories to the same icons used in your UI
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "morning":
        return <Sun className="w-4 h-4" />;
      case "afternoon":
        return <Coffee className="w-4 h-4" />;
      case "evening":
        return <Utensils className="w-4 h-4" />;
      case "night":
        return <Moon className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "morning":
        return "bg-yellow-100 text-yellow-800";
      case "afternoon":
        return "bg-orange-100 text-orange-800";
      case "evening":
        return "bg-red-100 text-red-800";
      case "night":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAdherenceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getAdherenceBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100";
    if (percentage >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  // map badge -> icons/colors consistent with UI
  const mapBadgeIconAndColor = (badge: BadgeItem) => {
    switch (badge.id) {
      case "1":
        return { icon: <Award className="w-6 h-6" />, color: "text-yellow-600" };
      case "2":
        return { icon: <Star className="w-6 h-6" />, color: "text-blue-600" };
      case "3":
        return { icon: <Target className="w-6 h-6" />, color: "text-green-600" };
      case "4":
        return { icon: <Shield className="w-6 h-6" />, color: "text-purple-600" };
      default:
        return { icon: <Award className="w-6 h-6" />, color: "text-yellow-600" };
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const [medRes, adherenceRes, badgesRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/medication/`),
        axios.get(`${BACKEND_URL}/api/medication/adherence`),
        axios.get(`${BACKEND_URL}/api/medication/badges`)
      ]);

      const meds: Medication[] = (medRes.data?.data || []).map((m: any) => ({
        id: String(m.id),
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        time: m.time,
        taken: m.taken,
        category: m.category,
        instructions: m.instructions,
        icon: getMedicationIcon(m.name, m.category),
        color: getMedicationColor(m.name)
      }));

      const adherence: AdherenceData[] = adherenceRes.data?.data || [];
      const badges: BadgeItem[] = (badgesRes.data?.data || []).map((b: any) => {
        const { icon, color } = mapBadgeIconAndColor(b);
        return { ...b, icon, color };
      });

      setMedications(meds);
      setAdherenceData(adherence);
      setBadges(badges);

      const missedCount = meds.filter(m => !m.taken).length;
      setShowMissedAlert(missedCount > 0);
    } catch (err) {
      console.error("Failed to fetch medication data:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  // Toggle medication taken/un-taken (optimistic UI update with backend call)
  const toggleMedication = async (id: string) => {
    const med = medications.find(m => m.id === id);
    if (!med) return;

    const newTaken = !med.taken;
    // optimistic update
    setMedications(prev => prev.map(m => (m.id === id ? { ...m, taken: newTaken } : m)));
    setShowMissedAlert(prev => {
      const missed = medications.filter(m => m.id !== id && !m.taken).length + (newTaken ? 0 : 1);
      return missed > 0;
    });

    try {
      // send update to backend (PATCH preferred for partial update)
      // backend should accept this path or adjust accordingly
      await axios.patch(`${BACKEND_URL}/api/medication/${id}`, { taken: newTaken });
      // optional: re-fetch adherence or keep optimistic local state
    } catch (err) {
      // revert on failure
      console.error("Failed to update medication on backend:", err);
      setMedications(prev => prev.map(m => (m.id === id ? { ...m, taken: med.taken } : m)));
      // recompute missed alert
      const missedCount = medications.filter(m => m.id !== id && !m.taken).length + (med.taken ? 0 : 1);
      setShowMissedAlert(missedCount > 0);
    }
  };

  if (loading) {
    return (
      <PageLayout
        title="Medication Tracker"
        subtitle="Stay on top of your medication schedule and track your adherence"
      >
        <div className="text-center py-12">Loading medication data…</div>
      </PageLayout>
    );
  }

  const overallAdherence = adherenceData.length
    ? Math.round(adherenceData.reduce((sum, day) => sum + day.percentage, 0) / adherenceData.length)
    : 0;
  const todayMedications = medications.filter(med => !med.taken);
  const takenToday = medications.filter(med => med.taken).length;
  const totalToday = medications.length;

  return (
    <PageLayout
      title="Medication Tracker"
      subtitle="Stay on top of your medication schedule and track your adherence"
    >
      <div className="space-y-8">
        {/* Missed Medication Alert */}
        {showMissedAlert && todayMedications.length > 0 && (
          <Card className="border-red-500/30 bg-red-500/10 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <div className="flex-1">
                  <h3 className="font-medium text-red-300">Missed Medications</h3>
                  <p className="text-sm text-red-200">
                    You have {todayMedications.length} medication{todayMedications.length > 1 ? "s" : ""} pending for today.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMissedAlert(false)}
                  className="text-red-400 border-red-500/30 hover:bg-red-500/20"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Progress</p>
                  <p className="text-2xl font-bold text-foreground">{takenToday}/{totalToday}</p>
                </div>
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <Progress value={(totalToday ? (takenToday / totalToday) * 100 : 0)} className="mt-4" />
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Adherence</p>
                  <p className="text-2xl font-bold text-foreground">{overallAdherence}%</p>
                </div>
                <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${getAdherenceColor(overallAdherence)}`}>
                  {overallAdherence >= 90 ? "Excellent" : overallAdherence >= 70 ? "Good" : "Needs Improvement"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold text-foreground">5 days</p>
                </div>
                <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-full">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-purple-400">Keep it up!</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Medication Schedule */}
          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-400" />
                <span className="text-foreground">Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication, index) => (
                  <div
                    key={medication.id}
                    className={`p-4 border rounded-lg transition-all duration-300 hover:shadow-medium animate-fade-in ${
                      medication.taken ? "bg-green-500/10 border-green-500/30" : "bg-card/30 border-border/50"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={medication.taken}
                        onCheckedChange={() => toggleMedication(medication.id)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className={`p-2 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30`}>
                        {medication.icon ?? <Pill className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground">{medication.name}</h4>
                          <Badge className={getCategoryColor(medication.category)}>
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(medication.category)}
                              <span>{medication.time}</span>
                            </div>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        {medication.instructions && (
                          <p className="text-xs text-muted-foreground">{medication.instructions}</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        {medication.taken ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Adherence Timeline */}
          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-foreground">Weekly Adherence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adherenceData.map((day, index) => (
                  <div
                    key={day.date}
                    className="flex items-center space-x-4 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 text-sm font-medium text-muted-foreground">{day.date}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          {day.taken}/{day.total} taken
                        </span>
                        <span className={`text-sm font-medium ${getAdherenceColor(day.percentage)}`}>{day.percentage}%</span>
                      </div>
                      <Progress value={day.percentage} className="h-2" />
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getAdherenceBgColor(day.percentage)}`}>
                      {day.percentage === 100 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : day.percentage >= 70 ? (
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badges */}
        <Card className="animate-fade-in-up bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-foreground">Achievement Badges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge, index) => (
                <div
                  key={badge.id}
                  className={`p-6 border rounded-lg text-center transition-all duration-300 hover:shadow-medium animate-fade-in ${
                    badge.earned ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30" : "bg-card/30 border-border/50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mx-auto mb-4 p-4 rounded-full ${badge.earned ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "bg-muted border border-border/50"}`}>
                    <div className={badge.earned ? (badge.color || "text-muted-foreground") : "text-muted-foreground"}>
                      {badge.icon ?? <Award className="w-6 h-6" />}
                    </div>
                  </div>
                  <h4 className={`font-medium mb-2 ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>{badge.name}</h4>
                  <p className={`text-sm mb-4 ${badge.earned ? "text-foreground/80" : "text-muted-foreground"}`}>{badge.description}</p>
                  {badge.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-muted-foreground">{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                  )}
                  {badge.earned && <Badge className="mt-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Earned!</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-fade-in-up bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <span className="text-foreground">Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 bg-card/50 hover:bg-card/70 border border-border/50">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Plus className="w-4 h-4 text-green-400" />
                    <span className="font-medium text-foreground">Add Medication</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Add a new medication to your schedule</p>
                </div>
              </Button>
              <Button className="h-auto p-4 bg-card/50 hover:bg-card/70 border border-border/50">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-foreground">Set Reminder</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Configure medication reminders</p>
                </div>
              </Button>
              <Button className="h-auto p-4 bg-card/50 hover:bg-card/70 border border-border/50">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="font-medium text-foreground">View History</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Check your medication history</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MedicationTracker;




