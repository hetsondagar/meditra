import PageLayout from "@/components/PageLayout";
const WellnessPlans = () => {
  return (
    <PageLayout title="Wellness Plans & Nudges" subtitle="Daily tips and exercises">
      <div className="grid gap-6 md:grid-cols-3">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Custom Plans</h2>
          <p className="text-muted-foreground">Collapsible sections placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Reminders</h2>
          <p className="text-muted-foreground">Toast notifications placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Breathing Exercises</h2>
          <p className="text-muted-foreground">Animated guides placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default WellnessPlans;

