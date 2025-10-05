const getActivityData = (req, res) => {
  const activityData = {
    distribution: [
      { name: "Walking", value: 45, color: "#4ade80" },
      { name: "Running", value: 25, color: "#22c55e" },
      { name: "Cycling", value: 20, color: "#16a34a" },
      { name: "Other", value: 10, color: "#15803d" },
    ],
    weekly: [
      { day: "Mon", steps: 8500, calories: 320, activeMinutes: 45 },
      { day: "Tue", steps: 12000, calories: 450, activeMinutes: 60 },
      { day: "Wed", steps: 9800, calories: 380, activeMinutes: 50 },
      { day: "Thu", steps: 15000, calories: 520, activeMinutes: 75 },
      { day: "Fri", steps: 11000, calories: 420, activeMinutes: 55 },
      { day: "Sat", steps: 18000, calories: 650, activeMinutes: 90 },
      { day: "Sun", steps: 12450, calories: 480, activeMinutes: 65 },
    ],
  };
  res.json({ success: true, data: activityData });
};
module.exports = { getActivityData };