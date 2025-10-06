import PageLayout from "@/components/PageLayout";
import { HealthMetrics } from "@/components/dashboard/HealthMetrics";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TodaysPlan } from "@/components/dashboard/TodaysPlan";
import { RecentReports } from "@/components/dashboard/RecentReports";
const Dashboard = () => {
  return (
    <PageLayout title="Home / Dashboard" subtitle="Personalized health insights">
      <div className="space-y-6">
        <HealthMetrics />
        <div className="grid gap-6 md:grid-cols-2">
          <TodaysPlan />
          <QuickActions />
        </div>
        <RecentReports />
      </div>
    </PageLayout>
  );
};
export default Dashboard;

