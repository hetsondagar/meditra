// controllers/quickActionController.js

// Reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = [
      { id: 1, type: "medication", message: "Take BP tablet at 9 AM" },
    ];
    res.status(200).json({ success: true, data: reminders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching reminders" });
  }
};

exports.addMedicationReminder = async (req, res) => {
  try {
    const { medication, time } = req.body;
    res.status(201).json({ success: true, message: "Medication reminder added", medication, time });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding medication reminder" });
  }
};

// AI Consultation
exports.consultAI = async (req, res) => {
  try {
    const { query } = req.body;
    res.status(200).json({
      success: true,
      response: `AI response to query: ${query}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "AI consultation failed" });
  }
};

// Nutrition Scanner
exports.scanNutrition = async (req, res) => {
  try {
    const { foodItem } = req.body;
    res.status(200).json({
      success: true,
      foodItem,
      nutrition: { calories: 250, protein: "10g", fat: "8g" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error scanning nutrition" });
  }
};

// Emergency
exports.triggerEmergencyAlert = async (req, res) => {
  try {
    const { location } = req.body;
    res.status(200).json({ success: true, message: "Emergency alert triggered", location });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error triggering alert" });
  }
};

// Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = [
      { id: 1, doctor: "Dr. Smith", date: "2025-10-10", time: "10:30 AM" },
    ];
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { doctor, date, time } = req.body;
    res.status(201).json({ success: true, message: "Appointment booked", doctor, date, time });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error booking appointment" });
  }
};
