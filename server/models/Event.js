const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    raw_content: { type: String, required: true },
    category: { type: String },
    severity: { type: String },
    tags: [String],
    timestamp: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', EventSchema);

class EventModel {
    async create(rawContent, category, severity, tags) {
        const event = new Event({
            raw_content: rawContent,
            category,
            severity,
            tags
        });
        const savedEvent = await event.save();
        return savedEvent._id;
    }

    async getAll() {
        return await Event.find().sort({ timestamp: -1 }).limit(100);
    }

    async getStats() {
        const categories = await Event.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $project: { category: "$_id", count: 1, _id: 0 } }
        ]);

        const severities = await Event.aggregate([
            { $group: { _id: "$severity", count: { $sum: 1 } } },
            { $project: { severity: "$_id", count: 1, _id: 0 } }
        ]);

        return {
            categories,
            severities
        };
    }
}

module.exports = new EventModel();
