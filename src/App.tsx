import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Medication from "./pages/Medication";
import Records from "./pages/Records";
import NutritionScanner from "./pages/NutritionScanner";
import Genomics from "./pages/Genomics";
import EmotionCognition from "./pages/EmotionCognition";
import WellnessPlans from "./pages/WellnessPlans";
import Emergency from "./pages/Emergency";
import EmergencyAlerts from "./pages/EmergencyAlerts";
import Pharmacy from "./pages/Pharmacy";
import MentorCommunity from "./pages/MentorCommunity";
import HealthVault from "./pages/HealthVault";
import Trials from "./pages/Trials";
import HomeKit from "./pages/HomeKit";
import Settings from "./pages/Settings";
import VirtualConsultation from "./pages/VirtualConsultation";
import AIRecommendations from "./pages/AIRecommendations";
import CalendarPlanner from "./pages/CalendarPlanner";
import Analytics from "./pages/Analytics";
import PatientProfile from "./pages/PatientProfile";
import AppointmentScheduler from "./pages/AppointmentScheduler";
import HealthAnalytics from "./pages/HealthAnalytics";
import MedicationTracker from "./pages/MedicationTracker";
import WellnessCoach from "./pages/WellnessCoach";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/records" element={<Records />} />
          <Route path="/nutrition-scanner" element={<NutritionScanner />} />
          <Route path="/genomics" element={<Genomics />} />
          <Route path="/emotion-cognition" element={<EmotionCognition />} />
          <Route path="/wellness-plans" element={<WellnessPlans />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/mentor-community" element={<MentorCommunity />} />
          <Route path="/health-vault" element={<HealthVault />} />
          <Route path="/trials" element={<Trials />} />
          <Route path="/home-kit" element={<HomeKit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/virtual-consultation" element={<VirtualConsultation />} />
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
          <Route path="/calendar-planner" element={<CalendarPlanner />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/appointment-scheduler" element={<AppointmentScheduler />} />
          <Route path="/health-analytics" element={<HealthAnalytics />} />
          <Route path="/medication-tracker" element={<MedicationTracker />} />
          <Route path="/wellness-coach" element={<WellnessCoach />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;