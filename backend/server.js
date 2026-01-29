const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/assets', require('./routes/assets'));
app.use('/api/asset-transfers', require('./routes/assetTransfers'));
app.use('/api/inspection-criteria', require('./routes/inspectionCriteria'));
app.use('/api/asset-inspections', require('./routes/assetInspections'));
app.use('/api/asset-depreciations', require('./routes/assetDepreciations'));
app.use('/api/asset-recommendations', require('./routes/assetRecommendations'));
app.use('/api/audit-logs', require('./routes/auditLogs'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/inspection', require('./routes/inspection'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
