// controllers/medication/medicationController.js

const medications = [
  { id: "1", name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "8:00 AM", taken: true, category: "morning", instructions: "Take with breakfast" },
  { id: "2", name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "8:00 PM", taken: false, category: "evening", instructions: "Take with dinner" },
  { id: "3", name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", time: "9:00 AM", taken: true, category: "morning", instructions: "Take with food" },
  { id: "4", name: "Omega-3", dosage: "1000mg", frequency: "Once daily", time: "2:00 PM", taken: false, category: "afternoon", instructions: "Take with lunch" },
  { id: "5", name: "Magnesium", dosage: "200mg", frequency: "Once daily", time: "10:00 PM", taken: false, category: "night", instructions: "Take before bed" }
];

const adherence = [
  { date: "Mon", taken: 4, total: 5, percentage: 80 },
  { date: "Tue", taken: 5, total: 5, percentage: 100 },
  { date: "Wed", taken: 3, total: 5, percentage: 60 },
  { date: "Thu", taken: 5, total: 5, percentage: 100 },
  { date: "Fri", taken: 4, total: 5, percentage: 80 },
  { date: "Sat", taken: 5, total: 5, percentage: 100 },
  { date: "Sun", taken: 2, total: 5, percentage: 40 }
];

const badges = [
  { id: "1", name: "Consistency Hero", description: "Take medications for 7 days straight", earned: false, progress: 5 },
  { id: "2", name: "Wellness Achiever", description: "Maintain 90% adherence for a month", earned: false, progress: 75 },
  { id: "3", name: "Perfect Week", description: "100% adherence for a week", earned: true, progress: 100 },
  { id: "4", name: "Health Guardian", description: "Never miss a critical medication", earned: false, progress: 85 }
];

const getMedications = (req, res) => {
  res.json({ success: true, data: medications });
};

const getAdherence = (req, res) => {
  res.json({ success: true, data: adherence });
};

const getBadges = (req, res) => {
  res.json({ success: true, data: badges });
};

const addMedication = (req, res) => {
  const newMed = req.body;
  medications.push(newMed);
  res.json({ success: true, message: "Medication added successfully", data: newMed });
};

const updateMedication = (req, res) => {
  const { id } = req.params;
  const { taken } = req.body;
  const med = medications.find(m => m.id === id);
  if (med) med.taken = taken;
  res.json({ success: true, message: `Medication ${id} updated`, taken });
};

module.exports = { getMedications, getAdherence, getBadges, addMedication, updateMedication };
