exports.getLabReports = async (req, res) => {
  try {
    const reports = [
      { id: "1", test: "Cholesterol", result: "190", unit: "mg/dL", status: "normal", date: "2024-01-15", reference: "< 200 mg/dL" },
      { id: "2", test: "Vitamin D", result: "32", unit: "ng/mL", status: "low", date: "2024-01-15", reference: "30-100 ng/mL" },
      { id: "3", test: "Blood Glucose", result: "95", unit: "mg/dL", status: "normal", date: "2024-01-15", reference: "70-100 mg/dL" },
      { id: "4", test: "Hemoglobin A1C", result: "5.4", unit: "%", status: "normal", date: "2024-01-15", reference: "< 5.7%" }
    ];
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching lab reports" });
  }
};
