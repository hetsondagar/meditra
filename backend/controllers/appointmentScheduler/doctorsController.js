const doctors = [
  { id: "1", name: "Dr. Bhatt", specialty: "Cardiology", availableSlots: ["9:00 AM","10:00 AM","11:30 AM"], icon: "Heart" },
  { id: "2", name: "Dr. riya", specialty: "Dermatology", availableSlots: ["2:00 PM","2:30 PM"], icon: "Eye" },
  { id: "3", name: "Dr. Nilesh", specialty: "General Practice", availableSlots: ["10:00 AM","10:30 AM"], icon: "Stethoscope" },
  { id: "4", name: "Dr. ketan", specialty: "Neurology", availableSlots: ["1:00 PM","3:00 PM"], icon: "Brain" },
  { id: "5", name: "Dr. Sharma", specialty: "Orthopedics", availableSlots: ["4:00 PM","4:30 PM"], icon: "Bone" }
];

exports.getDoctors = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching doctors" });
  }
};
