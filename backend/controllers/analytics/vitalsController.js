 const getVitals = (req, res) => {
  const vitalsData = [
    { metric: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", color: "#22c55e" },
    { metric: "Body Temperature", value: "98.6", unit: "°F", status: "normal", color: "#22c55e" },
    { metric: "Oxygen Saturation", value: "98", unit: "%", status: "normal", color: "#22c55e" },
    { metric: "Blood Glucose", value: "95", unit: "mg/dL", status: "normal", color: "#22c55e" },
  ];
  res.json({ success: true, data: vitalsData });
};
module.exports = { getVitals };