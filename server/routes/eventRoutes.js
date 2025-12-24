const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// POST /api/ingest - Ingest new chaos event
router.post('/ingest', (req, res) => eventController.ingestEvent(req, res));

// GET /api/events - Retrieve all events
router.get('/events', (req, res) => eventController.getAllEvents(req, res));

// GET /api/stats - Get statistics
router.get('/stats', (req, res) => eventController.getStats(req, res));

module.exports = router;
