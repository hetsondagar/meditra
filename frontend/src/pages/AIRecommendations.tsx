import PageLayout from "@/components/PageLayout";
const AIRecommendations = () => {
  const items = [
    { title: "Hydration Reminder", desc: "Drink a glass of water now." },
    { title: "Go for a Walk", desc: "10 min brisk walk recommended." },
    { title: "Mindfulness", desc: "Try a 3 min breathing session." },
  ];
  return (
    <PageLayout title="AI Recommendations" subtitle="Personalized tips for you">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div key={item.title} className="glass rounded-xl p-5 hover-lift animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};
export default AIRecommendations;

