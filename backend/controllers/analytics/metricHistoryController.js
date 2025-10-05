 const getMetricHistory = (req, res) => {
  const heartRateHistory = [
    { date: "Mon", value: 75 },
    { date: "Tue", value: 73 },
    { date: "Wed", value: 72 },
    { date: "Thu", value: 71 },
    { date: "Fri", value: 74 },
    { date: "Sat", value: 70 },
    { date: "Sun", value: 72 },
  ];
  res.json({ success: true, data: heartRateHistory });
};
module.exports = { getMetricHistory };