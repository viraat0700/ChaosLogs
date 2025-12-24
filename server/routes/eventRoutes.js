const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.post('/ingest', (req, res) => eventController.ingestEvent(req, res));


router.get('/events', (req, res) => eventController.getAllEvents(req, res));


router.get('/stats', (req, res) => eventController.getStats(req, res));

module.exports = router;
