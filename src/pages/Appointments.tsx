import PageLayout from "@/components/PageLayout";

const Appointments = () => {
  return (
    <PageLayout title="Appointments & Virtual Consultation" subtitle="Schedule and join virtual visits">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Interactive Calendar</h2>
          <p className="text-muted-foreground">Drag-and-drop scheduling placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Virtual Consultation</h2>
          <p className="text-muted-foreground">Video call UI and waiting room animations placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default Appointments;

