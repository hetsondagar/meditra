 const getMetrics = (req, res) => {
  const metrics = [
    { label: "Heart Rate", value: 72, unit: "BPM", change: -2, trend: "down", target: 70 },
    { label: "Sleep Duration", value: 7.5, unit: "hrs", change: 0.5, trend: "up", target: 8 },
    { label: "Activity Level", value: 85, unit: "%", change: 5, trend: "up", target: 80 },
    { label: "Steps", value: 12450, unit: "steps", change: 1200, trend: "up", target: 10000 },
  ];
  res.json({ success: true, data: metrics });
};
module.exports = { getMetrics };