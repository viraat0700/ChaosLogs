const dbConfig = require('./config/database');
const db = dbConfig.getDatabase();

try {
    const stmt = db.prepare('DELETE FROM events');
    const info = stmt.run();
    console.log(`Deleted ${info.changes} events from the database.`);

    // Optional: Reset auto-increment counter
    db.prepare("DELETE FROM sqlite_sequence WHERE name='events'").run();
    console.log('Reset ID counter.');

} catch (error) {
    console.error('Error clearing database:', error);
}
