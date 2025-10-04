import PageLayout from "@/components/PageLayout";

const MentorCommunity = () => {
  return (
    <PageLayout title="Health Mentor & Community" subtitle="Connect and get support">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Mentor Suggestions</h2>
          <p className="text-muted-foreground">Swipeable profiles placeholder.</p>
        </section>
        <section className="card p-6 glass">
          <h2 className="text-lg font-semibold mb-2">Live Rooms</h2>
          <p className="text-muted-foreground">Chat bubbles and typing indicators placeholder.</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default MentorCommunity;

