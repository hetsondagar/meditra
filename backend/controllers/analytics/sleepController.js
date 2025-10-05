 const getSleepData = (req, res) => {
  const sleepData = [
    { date: "Mon", value: 7.2 },
    { date: "Tue", value: 7.8 },
    { date: "Wed", value: 6.9 },
    { date: "Thu", value: 8.1 },
    { date: "Fri", value: 7.5 },
    { date: "Sat", value: 8.3 },
    { date: "Sun", value: 7.5 },
  ];
  res.json({ success: true, data: sleepData });
};
module.exports = { getSleepData };