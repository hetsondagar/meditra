exports.getHealthEvents = async (req, res) => {
  try {
    const events = [
      { id: "1", date: "2024-01-20", type: "appointment", title: "Annual Physical Exam", description: "Complete health checkup with Dr. Bhatt", status: "completed" },
      { id: "2", date: "2024-01-15", type: "lab", title: "Blood Work Results", description: "Comprehensive metabolic panel completed", status: "completed" },
      { id: "3", date: "2024-01-10", type: "medication", title: "Medication Adjustment", description: "Metformin dosage increased to 500mg", status: "completed" },
      { id: "4", date: "2024-02-15", type: "appointment", title: "Follow-up Consultation", description: "Review lab results with Dr. Bhatt", status: "pending" }
    ];
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching health events" });
  }
};
