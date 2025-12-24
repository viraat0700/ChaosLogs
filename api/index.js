require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/database');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', eventRoutes);


app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// if (process.env.NODE_ENV !== 'production') {
app.listen(PORT, () => {
    console.log(`🚀 ChaosLog Core online on port ${PORT}`);
});
// }

module.exports = app;
