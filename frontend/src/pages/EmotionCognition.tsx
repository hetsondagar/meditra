import PageLayout from "@/components/PageLayout";

const EmotionCognition = () => {
  return (
    <PageLayout title="Emotion & Cognitive Monitoring" subtitle="Trends and stress indicators">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Facial Recognition Simulation</h2>
          <p className="text-muted-foreground">Privacy-respecting demo placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Emotional Status</h2>
          <p className="text-muted-foreground">Live-updating graphs placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default EmotionCognition;

