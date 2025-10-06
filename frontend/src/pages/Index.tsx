import PageLayout from "@/components/PageLayout";
import { HealthMetrics } from "@/components/dashboard/HealthMetrics";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TodaysPlan } from "@/components/dashboard/TodaysPlan";
import { RecentReports } from "@/components/dashboard/RecentReports";
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <PageLayout title="">
      <div className="space-y-12">
        <section className="text-center space-y-4 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-card-foreground">
              Welcome back to{" "}
              <span className="font-brand tracking-[0.03em]" style={{ color: "hsl(var(--primary))" }}>
                meditra
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive health management platform powered by AI and designed for your well-being
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">All devices connected</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Health data synced</span>
            </div>
          </div>
        </section>
        <section className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <HealthMetrics />
        </section>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <section className="xl:col-span-2 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <TodaysPlan />
          </section>
          <section className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <QuickActions />
          </section>
        </div>
        <section className="animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <RecentReports />
        </section>
        <section className="animate-fade-in-up" style={{ animationDelay: "900ms" }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">🌟 New Interactive Features</h2>
            <p className="text-muted-foreground">Experience our latest health management tools with advanced animations and interactions</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              ["Patient Profile", "/patient-profile", "Complete health overview with animated metrics"],
              ["Appointment Scheduler", "/appointment-scheduler", "Interactive calendar with booking system"],
              ["Health Analytics", "/health-analytics", "Data visualization with animated charts"],
              ["Medication Tracker", "/medication-tracker", "Smart reminders with adherence tracking"],
              ["Wellness Coach", "/wellness-coach", "Mindfulness tools with breathing exercises"],
            ].map(([label, href, description]) => (
              <Link key={href as string} to={href as string} className="group glass rounded-xl p-6 hover-lift border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{label as string}</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{description as string}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Interactive</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">New</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
          <h2 className="text-xl font-semibold mb-4">All Features</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Appointments", "/appointments"],
              ["Medication", "/medication"],
              ["Health Records", "/records"],
              ["Nutrition Scanner", "/nutrition-scanner"],
              ["Genomics", "/genomics"],
              ["Emotion & Cognition", "/emotion-cognition"],
              ["Wellness Plans", "/wellness-plans"],
              ["Emergency", "/emergency"],
              ["Pharmacy", "/pharmacy"],
              ["Community", "/mentor-community"],
              ["Health Vault", "/health-vault"],
              ["Clinical Trials", "/trials"],
              ["Home Health Kit", "/home-kit"],
              ["Settings", "/settings"],
            ].map(([label, href]) => (
              <Link key={href as string} to={href as string} className="glass rounded-xl p-4 hover-lift">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{label as string}</span>
                  <span className="text-primary">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="text-center py-12 animate-fade-in-up" style={{ animationDelay: "1100ms" }}>
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto border border-border/30">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Take control of your health journey
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience the future of healthcare with AI-powered insights, seamless device integration, 
              and personalized wellness plans designed just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="fab px-8 py-3 text-primary-foreground font-medium hover:scale-105 transition-transform">
                Explore AI Health Assistant
              </button>
              <button className="px-8 py-3 border border-border/50 rounded-full font-medium hover:bg-primary/10 hover:border-primary/50 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};
export default Index;
