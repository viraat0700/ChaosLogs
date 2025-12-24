const mongoose = require('mongoose');

class DatabaseConfig {
    constructor() {
        // Connection handled lazily via middleware
    }

    async connect() {
        if (mongoose.connection.readyState === 1) return;

        try {
            const mongoURI = process.env.MONGODB_URI;
            if (!mongoURI) {
                console.error('❌ MONGODB_URI is not defined in environment variables');
                return;
            }
            await mongoose.connect(mongoURI);
            console.log('✅ Connected to MongoDB');
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
        }
    }

    getDatabase() {
        return mongoose.connection;
    }
}

module.exports = new DatabaseConfig();
