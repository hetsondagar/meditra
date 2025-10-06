import PageLayout from "@/components/PageLayout";
const HomeKit = () => {
  return (
    <PageLayout title="IoT Home Health Kit" subtitle="Sync your devices and view metrics">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Sync Status</h2>
          <p className="text-muted-foreground">Device connection animations placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Wearable Metrics</h2>
          <p className="text-muted-foreground">Interactive dashboard placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default HomeKit;

