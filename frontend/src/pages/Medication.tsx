import PageLayout from "@/components/PageLayout";

const Medication = () => {
  return (
    <PageLayout title="Medication Tracker" subtitle="Reminders, refills and dispenser status">
      <div className="grid gap-6 md:grid-cols-3">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Pill Reminders</h2>
          <p className="text-muted-foreground">Animated notifications placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Refill Tracking</h2>
          <p className="text-muted-foreground">Progress circles placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Smart Dispenser</h2>
          <p className="text-muted-foreground">Device status placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default Medication;
/*import { useState, useEffect } from "react";
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

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
  category: "morning" | "afternoon" | "evening" | "night";
  icon: React.ReactNode;
  color: string;
  instructions?: string;
}

interface AdherenceData {
  date: string;
  taken: number;
  total: number;
  percentage: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
  progress?: number;
}

const MedicationTracker = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [adherenceData, setAdherenceData] = useState<AdherenceData[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [showMissedAlert, setShowMissedAlert] = useState(false);

  const initialMedications: Medication[] = [
    {
      id: "1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "8:00 AM",
      taken: true,
      category: "morning",
      icon: <Pill className="w-5 h-5" />,
      color: "text-blue-600",
      instructions: "Take with breakfast"
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "8:00 PM",
      taken: false,
      category: "evening",
      icon: <Pill className="w-5 h-5" />,
      color: "text-blue-600",
      instructions: "Take with dinner"
    },
    {
      id: "3",
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once daily",
      time: "9:00 AM",
      taken: true,
      category: "morning",
      icon: <Sun className="w-5 h-5" />,
      color: "text-yellow-600",
      instructions: "Take with food"
    },
    {
      id: "4",
      name: "Omega-3",
      dosage: "1000mg",
      frequency: "Once daily",
      time: "2:00 PM",
      taken: false,
      category: "afternoon",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-500",
      instructions: "Take with lunch"
    },
    {
      id: "5",
      name: "Magnesium",
      dosage: "200mg",
      frequency: "Once daily",
      time: "10:00 PM",
      taken: false,
      category: "night",
      icon: <Moon className="w-5 h-5" />,
      color: "text-purple-600",
      instructions: "Take before bed"
    }
  ];

  const initialAdherenceData: AdherenceData[] = [
    { date: "Mon", taken: 4, total: 5, percentage: 80 },
    { date: "Tue", taken: 5, total: 5, percentage: 100 },
    { date: "Wed", taken: 3, total: 5, percentage: 60 },
    { date: "Thu", taken: 5, total: 5, percentage: 100 },
    { date: "Fri", taken: 4, total: 5, percentage: 80 },
    { date: "Sat", taken: 5, total: 5, percentage: 100 },
    { date: "Sun", taken: 2, total: 5, percentage: 40 }
  ];

  const initialBadges: Badge[] = [
    {
      id: "1",
      name: "Consistency Hero",
      description: "Take medications for 7 days straight",
      icon: <Award className="w-6 h-6" />,
      color: "text-yellow-600",
      earned: false,
      progress: 5
    },
    {
      id: "2",
      name: "Wellness Achiever",
      description: "Maintain 90% adherence for a month",
      icon: <Star className="w-6 h-6" />,
      color: "text-blue-600",
      earned: false,
      progress: 75
    },
    {
      id: "3",
      name: "Perfect Week",
      description: "100% adherence for a week",
      icon: <Target className="w-6 h-6" />,
      color: "text-green-600",
      earned: true,
      progress: 100
    },
    {
      id: "4",
      name: "Health Guardian",
      description: "Never miss a critical medication",
      icon: <Shield className="w-6 h-6" />,
      color: "text-purple-600",
      earned: false,
      progress: 85
    }
  ];

  useEffect(() => {
    setMedications(initialMedications);
    setAdherenceData(initialAdherenceData);
    setBadges(initialBadges);
    
    // Check for missed medications
    const missedCount = initialMedications.filter(med => !med.taken).length;
    if (missedCount > 0) {
      setShowMissedAlert(true);
    }
  }, []);

  const toggleMedication = (id: string) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id 
          ? { ...med, taken: !med.taken }
          : med
      )
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "morning": return <Sun className="w-4 h-4" />;
      case "afternoon": return <Coffee className="w-4 h-4" />;
      case "evening": return <Utensils className="w-4 h-4" />;
      case "night": return <Moon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "morning": return "bg-yellow-100 text-yellow-800";
      case "afternoon": return "bg-orange-100 text-orange-800";
      case "evening": return "bg-red-100 text-red-800";
      case "night": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
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

  const overallAdherence = Math.round(
    adherenceData.reduce((sum, day) => sum + day.percentage, 0) / adherenceData.length
  );

  const todayMedications = medications.filter(med => !med.taken);
  const takenToday = medications.filter(med => med.taken).length;
  const totalToday = medications.length;

  return (
    <PageLayout 
      title="Medication Tracker" 
      subtitle="Stay on top of your medication schedule and track your adherence"
    >
      <div className="space-y-8">
        {showMissedAlert && todayMedications.length > 0 && (
          <Card className="border-red-500/30 bg-red-500/10 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <div className="flex-1">
                  <h3 className="font-medium text-red-300">Missed Medications</h3>
                  <p className="text-sm text-red-200">
                    You have {todayMedications.length} medication{todayMedications.length > 1 ? 's' : ''} pending for today.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Progress</p>
                  <p className="text-2xl font-bold text-foreground">
                    {takenToday}/{totalToday}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <Progress value={(takenToday / totalToday) * 100} className="mt-4" />
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Adherence</p>
                  <p className="text-2xl font-bold text-foreground">
                    {overallAdherence}%
                  </p>
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
                <span className="text-sm font-medium text-purple-400">
                  Keep it up!
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      medication.taken ? 'bg-green-500/10 border-green-500/30' : 'bg-card/30 border-border/50'
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
                        {medication.icon}
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
                    <div className="w-12 text-sm font-medium text-muted-foreground">
                      {day.date}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          {day.taken}/{day.total} taken
                        </span>
                        <span className={`text-sm font-medium ${getAdherenceColor(day.percentage)}`}>
                          {day.percentage}%
                        </span>
                      </div>
                      <Progress 
                        value={day.percentage} 
                        className="h-2"
                      />
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
                    badge.earned 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                      : 'bg-card/30 border-border/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mx-auto mb-4 p-4 rounded-full ${
                    badge.earned 
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' 
                      : 'bg-muted border border-border/50'
                  }`}>
                    <div className={badge.earned ? badge.color : 'text-muted-foreground'}>
                      {badge.icon}
                    </div>
                  </div>
                  <h4 className={`font-medium mb-2 ${
                    badge.earned ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {badge.name}
                  </h4>
                  <p className={`text-sm mb-4 ${
                    badge.earned ? 'text-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {badge.description}
                  </p>
                  {badge.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-muted-foreground">{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                  )}
                  {badge.earned && (
                    <Badge className="mt-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Earned!
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
*/

