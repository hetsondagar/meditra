import PageLayout from "@/components/PageLayout";
const NutritionScanner = () => {
  return (
    <PageLayout title="AI-Powered Nutrition Scanner" subtitle="Scan meals and get insights">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Photo Upload</h2>
          <p className="text-muted-foreground">Camera icon animation placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Analysis</h2>
          <p className="text-muted-foreground">Ingredient detection and calories overlay placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};
export default NutritionScanner;

