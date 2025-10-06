exports.getMetrics = async (req, res) => {
  try {
    const metrics = {
      heartRate: 76,              // bpm
      bloodPressure: "118/79",    // mmHg
      bloodSugar: 95,             // mg/dL (fasting)
      stressLevel: 42,            // scale 0–100
      sleepQuality: 84,           // score out of 100
      energyLevel: 78             // percentage
    };

    res.status(200).json({
      success: true,
      message: "Health metrics fetched successfully",
      data: metrics,
    });
  } catch (error) {
    console.error("Error in getMetrics:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching health metrics",
    });
  }
};

exports.getMetricsHistory = async (req, res) => {
  try {
    const { metric = "heartRate", range = "7days" } = req.query;
    const history = [
      { date: "2025-09-28", value: 76 },
      { date: "2025-09-29", value: 86 },
      { date: "2025-09-30", value: 76 },
      { date: "2025-10-01", value: 76 },
      { date: "2025-10-02", value: 86 },
      { date: "2025-10-03", value: 84 },
      { date: "2025-10-04", value: 74 },
    ];
    res.status(200).json({
      success: true,
      message: `History for ${metric} over ${range}`,
      data: history,
    });
  } catch (error) {
    console.error("Error in getMetricsHistory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
