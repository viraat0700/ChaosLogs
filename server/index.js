const express = require('express');
const cors = require('cors');
require('./config/database'); // Initialize database
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', eventRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'online', service: 'ChaosLog Core' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 ChaosLog Core online on port ${PORT}`);
});
