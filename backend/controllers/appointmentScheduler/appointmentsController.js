let appointments = [
  {
    id: "1",
    date: "2025-10-15",
    time: "11:30 AM",
    doctorId: "1",
    type: "in-person",
    status: "confirmed",
    location: "Room 205, Cardiology Wing",
    notes: "Annual heart checkup"
  },
  {
    id: "2",
    date: "2025-10-20",
    time: "2:00 PM",
    doctorId: "2",
    type: "virtual",
    status: "pending",
    notes: "Skin consultation"
  },
  {
    id: "3",
    date: "2025-10-10",
    time: "10:00 AM",
    doctorId: "3",
    type: "in-person",
    status: "confirmed",
    location: "Room 101, Main Building"
  }
];

exports.getAppointments = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
};

exports.addAppointment = async (req, res) => {
  try {
    const newAppointment = { id: `${appointments.length + 1}`, ...req.body };
    appointments.push(newAppointment);
    res.status(201).json({ success: true, data: newAppointment });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding appointment" });
  }
};

// Delete appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const index = appointments.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointments.splice(index, 1);
    res.status(200).json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting appointment" });
  }
};
