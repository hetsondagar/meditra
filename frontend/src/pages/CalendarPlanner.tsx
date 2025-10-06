import PageLayout from "@/components/PageLayout";
const CalendarPlanner = () => {
  return (
    <PageLayout title="Calendar Planner" subtitle="Plan your week with smart insights">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Weekly Planner</h2>
          <p className="text-muted-foreground">Drag-and-drop events placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Weather & Alerts</h2>
          <p className="text-muted-foreground">Disruption alerts with tooltips placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default CalendarPlanner;

