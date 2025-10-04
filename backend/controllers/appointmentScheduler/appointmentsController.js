let appointments = [
  {
    id: "1",
    date: "2024-01-15",
    time: "11:30 AM",
    doctorId: "1",
    type: "in-person",
    status: "confirmed",
    location: "Room 205, Cardiology Wing",
    notes: "Annual heart checkup"
  },
  {
    id: "2",
    date: "2024-01-20",
    time: "2:00 PM",
    doctorId: "2",
    type: "virtual",
    status: "pending",
    notes: "Skin consultation"
  },
  {
    id: "3",
    date: "2024-01-25",
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
