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

            // Analyze the text
            const analysis = classifierService.analyze(text);

            // Store in database
            const eventId = EventModel.create(
                text,
                analysis.category,
                analysis.severity,
                analysis.tags
            );

            res.json({
                success: true,
                id: eventId,
                analysis
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
            const events = EventModel.getAll();
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
            const stats = EventModel.getStats();
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
