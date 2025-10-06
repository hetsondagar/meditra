import PageLayout from "@/components/PageLayout";
const Records = () => {
  return (
    <PageLayout title="Digital Health Records" subtitle="Reports, scans and prescriptions">
      <div className="space-y-4">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Timeline</h2>
          <p className="text-muted-foreground">Expandable cards and filters placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default Records;

