import PageLayout from "@/components/PageLayout";

const VirtualConsultation = () => {
  return (
    <PageLayout title="Virtual Consultation" subtitle="Join secure video sessions and chat">
      <div className="grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Video Interface</h2>
          <p className="text-muted-foreground">Animated controls placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Chat</h2>
          <p className="text-muted-foreground">Typing indicator and messages placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default VirtualConsultation;

