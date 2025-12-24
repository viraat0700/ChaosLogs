const Database = require('better-sqlite3');
const path = require('path');

class DatabaseConfig {
    constructor() {
        const dbPath = path.join(__dirname, '..', 'chaoslog.db');
        this.db = new Database(dbPath, { verbose: console.log });
        this.db.pragma('journal_mode = WAL');
        this.initializeTables();
    }

    initializeTables() {
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                raw_content TEXT NOT NULL,
                category TEXT,
                severity TEXT,
                tags TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.db.exec(createTableSQL);
    }

    getDatabase() {
        return this.db;
    }
}

module.exports = new DatabaseConfig();
