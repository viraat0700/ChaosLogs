const classifierService = require('../services/classifierService');
const localAIService = require('../services/localAIService');
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


            const heuristicResult = classifierService.analyze(text);


            const aiResult = await localAIService.analyze(text);


            let finalCategory = heuristicResult.category;
            let finalSeverity = heuristicResult.severity;
            let method = 'heuristic';

            if (aiResult) {

                if (aiResult.categoryConfidence > 0.4) {
                    finalCategory = aiResult.category;
                    method = 'local-ai';
                }


                if (aiResult.severityConfidence > 0.5) {
                    finalSeverity = aiResult.severity;
                    if (method === 'heuristic') method = 'hybrid';
                }
            }


            const finalTags = heuristicResult.tags;


            const eventId = EventModel.create(
                text,
                finalCategory,
                finalSeverity,
                finalTags
            );

            res.json({
                success: true,
                id: eventId,
                analysis: {
                    category: finalCategory,
                    severity: finalSeverity,
                    tags: finalTags
                },
                method: method
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
