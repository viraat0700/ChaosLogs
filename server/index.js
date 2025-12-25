require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use(async (req, res, next) => {
    try {
        const dbConfig = require('./config/database');
        await dbConfig.connect();
        next();
    } catch (error) {
        console.error('Database connection middleware error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.use('/api', eventRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
    });
}


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 ChaosLog Core online on port ${PORT}`);
    });
}

module.exports = app;
