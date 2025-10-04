let notifications = [
  {
    id: "1",
    title: "Appointment Reminder",
    message: "Your appointment with Dr. Bhatt is tomorrow at 11:30 AM",
    type: "reminder",
    time: "2 hours ago",
    read: false,
    priority: "high"
  },
  {
    id: "2",
    title: "Test Results Available",
    message: "Your blood test results from January 15th are now available",
    type: "result",
    time: "1 day ago",
    read: false,
    priority: "medium"
  },
  {
    id: "3",
    title: "Hydration Reminder",
    message: "Remember to drink water throughout the day",
    type: "alert",
    time: "3 hours ago",
    read: true,
    priority: "low"
  },
  {
    id: "4",
    title: "Appointment Confirmed",
    message: "Your appointment with Dr. Johnson has been confirmed for Jan 20th",
    type: "appointment",
    time: "2 days ago",
    read: true,
    priority: "medium"
  }
];

exports.getNotifications = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching notifications" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    notifications = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error marking notification as read" });
  }
};
