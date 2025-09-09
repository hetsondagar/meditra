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
        {/* Welcome Section */}
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

        {/* Health Metrics */}
        <section className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <HealthMetrics />
        </section>

        {/* Today's Plan and Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <section className="xl:col-span-2 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <TodaysPlan />
          </section>
          
          <section className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <QuickActions />
          </section>
        </div>

        {/* Recent Reports */}
        <section className="animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <RecentReports />
        </section>

        {/* Explore other features */}
        <section className="animate-fade-in-up" style={{ animationDelay: "900ms" }}>
          <h2 className="text-xl font-semibold mb-4">Explore features</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Appointments", "/appointments"],
              ["Medication Tracker", "/medication"],
              ["Health Records", "/records"],
              ["Nutrition Scanner", "/nutrition"],
              ["Genomics", "/genomics"],
              ["Emotion & Cognition", "/emotion"],
              ["Wellness Plans", "/wellness"],
              ["Emergency", "/emergency"],
              ["Pharmacy", "/pharmacy"],
              ["Community", "/community"],
              ["Health Vault", "/vault"],
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

        {/* Footer CTA */}
        <section className="text-center py-12 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
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
