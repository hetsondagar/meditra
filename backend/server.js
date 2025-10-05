const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboard'); 
const patientProfileRoutes = require('./routes/patientProfile');
const appointmentRoutes = require('./routes/appointmentsScheduler');
const analyticsRoutes = require('./routes/analytics');
const medicationRoutes = require('./routes/medication');
const wellnessRoutes = require('./routes/wellness');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); 
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/profile', patientProfileRoutes);
app.use('/api/appointments-scheduler', appointmentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/medication', medicationRoutes);
app.use('/api/wellness', wellnessRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
