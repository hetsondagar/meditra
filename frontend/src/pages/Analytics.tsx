import PageLayout from "@/components/PageLayout";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 73 },
  { day: "Sat", value: 78 },
  { day: "Sun", value: 74 },
];

const Analytics = () => {
  return (
    <PageLayout title="Analytics" subtitle="Trends and long-term insights">
      <section className="card p-6 glass">
        <h2 className="text-lg font-semibold mb-4">Weekly Health Score</h2>
        <ChartContainer
          className="w-full"
          config={{ score: { label: "Score", color: "hsl(var(--primary))" } }}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Line type="monotone" dataKey="value" stroke="var(--color-score)" strokeWidth={2} dot={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </section>
    </PageLayout>
  );
};

export default Analytics;

