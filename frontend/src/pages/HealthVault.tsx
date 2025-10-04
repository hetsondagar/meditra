import PageLayout from "@/components/PageLayout";

const HealthVault = () => {
  return (
    <PageLayout title="Blockchain Health Vault" subtitle="Secure records and privacy controls">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Secure Transfer</h2>
          <p className="text-muted-foreground">Encryption visuals placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Privacy Settings</h2>
          <p className="text-muted-foreground">Sliders and toggles placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default HealthVault;

