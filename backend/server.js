const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboard'); 
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); 
app.use('/api/dashboard', dashboardRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
