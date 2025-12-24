require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/database'); // Initialize database
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app (deployed in 'public' folder)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', eventRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 ChaosLog Core online on port ${PORT}`);
});
