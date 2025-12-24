const dbConfig = require('../config/database');
const db = dbConfig.getDatabase();

class EventModel {
    constructor() {
        this.insertStmt = db.prepare(
            'INSERT INTO events (raw_content, category, severity, tags) VALUES (?, ?, ?, ?)'
        );
        this.getAllStmt = db.prepare(
            'SELECT * FROM events ORDER BY timestamp DESC LIMIT 100'
        );
        this.getCategoryStatsStmt = db.prepare(
            'SELECT category, COUNT(*) as count FROM events GROUP BY category'
        );
        this.getSeverityStatsStmt = db.prepare(
            'SELECT severity, COUNT(*) as count FROM events GROUP BY severity'
        );
    }

    create(rawContent, category, severity, tags) {
        const info = this.insertStmt.run(
            rawContent,
            category,
            severity,
            JSON.stringify(tags)
        );
        return info.lastInsertRowid;
    }

    getAll() {
        const events = this.getAllStmt.all();
        return events.map(event => ({
            ...event,
            tags: JSON.parse(event.tags)
        }));
    }

    getStats() {
        return {
            categories: this.getCategoryStatsStmt.all(),
            severities: this.getSeverityStatsStmt.all()
        };
    }
}

module.exports = new EventModel();
