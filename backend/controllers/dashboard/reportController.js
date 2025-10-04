// controllers/reportController.js

// GET /dashboard/reports/recent
exports.getRecentReports = async (req, res) => {
  try {
    const reports = [
      { id: 1, type: "Blood Test", date: "2025-09-30" },
      { id: 2, type: "X-Ray", date: "2025-09-25" },
    ];
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching recent reports" });
  }
};

// GET /dashboard/reports/:id
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      success: true,
      data: { id, type: "Blood Test", details: "Normal Range" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching report" });
  }
};

// GET /dashboard/reports/:id/download
exports.downloadReport = async (req, res) => {
  try {
    const { id } = req.params;
    // Replace with actual file download logic
    res.status(200).json({ success: true, message: `Report ${id} downloaded` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error downloading report" });
  }
};

// POST /dashboard/reports/upload
exports.uploadReport = async (req, res) => {
  try {
    // In real case: use multer or file upload middleware
    res.status(201).json({ success: true, message: "Report uploaded successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error uploading report" });
  }
};
