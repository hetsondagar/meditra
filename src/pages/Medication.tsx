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

