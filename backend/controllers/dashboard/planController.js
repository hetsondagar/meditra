exports.getTodaysPlan = async (req, res) => {
  try {
    const plan = [
      { id: 1, task: "Morning Walk", status: "pending" },
      { id: 2, task: "Take Vitamin D", status: "completed" },
    ];
    res.status(200).json({ success: true, data: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching today's plan" });
  }
};
exports.completePlanItem = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ success: true, message: `Plan item ${id} marked as complete` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error completing plan item" });
  }
};
exports.createPlanItem = async (req, res) => {
  try {
    const { task } = req.body;
    res.status(201).json({ success: true, message: "Plan item created", task });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating plan item" });
  }
};
exports.updatePlanItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, status } = req.body;
    res.status(200).json({ success: true, message: `Plan item ${id} updated`, task, status });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating plan item" });
  }
};
exports.getPlanItem = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      success: true,
      data: { id, task: "Sample Plan Item", status: "pending" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching plan item" });
  }
};
