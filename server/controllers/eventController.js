const classifierService = require('../services/classifierService');
const EventModel = require('../models/Event');

class EventController {
    async ingestEvent(req, res) {
        try {
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({
                    error: 'Text input required'
                });
            }

            const analysis = classifierService.analyze(text);

            const eventId = await EventModel.create(
                text,
                analysis.category,
                analysis.severity,
                analysis.tags
            );

            res.json({
                success: true,
                id: eventId,
                analysis: analysis
            });
        } catch (error) {
            console.error('Error in ingestEvent:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    async getAllEvents(req, res) {
        try {
            const { category, severity } = req.query;
            const events = await EventModel.getAll({ category, severity });
            res.json(events);
        } catch (error) {
            console.error('Error in getAllEvents:', error);
            res.status(500).json({
                error: 'Database error'
            });
        }
    }

    async getStats(req, res) {
        try {
            const stats = await EventModel.getStats();
            res.json(stats);
        } catch (error) {
            console.error('Error in getStats:', error);
            res.status(500).json({
                error: 'Stats error'
            });
        }
    }
}

module.exports = new EventController();
