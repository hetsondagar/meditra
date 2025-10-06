import PageLayout from "@/components/PageLayout";
const Settings = () => {
  return (
    <PageLayout title="Settings & Profile" subtitle="Personalize your experience">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p className="text-muted-foreground">Collapsible sections placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Preferences</h2>
          <p className="text-muted-foreground">Toggles and sliders placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default Settings;

