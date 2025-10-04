exports.getHealthMetrics = async (req, res) => {
  try {
    const metrics = [
      { label: "Age", value: "34", unit: "years", progress: 100, icon: "User", color: "text-blue-600" },
      { label: "Weight", value: "72", unit: "kg", progress: 85, icon: "Weight", color: "text-green-600" },
      { label: "BMI", value: "24.2", unit: "kg/m²", progress: 75, icon: "Activity", color: "text-emerald-600" },
      { label: "Heart Rate", value: "72", unit: "BPM", progress: 90, icon: "Heart", color: "text-red-500" }
    ];
    res.status(200).json({ success: true, data: metrics });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching health metrics" });
  }
};
