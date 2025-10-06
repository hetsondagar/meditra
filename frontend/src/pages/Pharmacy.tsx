import PageLayout from "@/components/PageLayout";
const Pharmacy = () => {
  return (
    <PageLayout title="Pharmacy & Smart Dispenser" subtitle="Orders and delivery tracking">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Order Flow</h2>
          <p className="text-muted-foreground">Step-based navigation placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Delivery Tracking</h2>
          <p className="text-muted-foreground">Live status animations placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default Pharmacy;

