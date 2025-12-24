const mongoose = require('mongoose');

class DatabaseConfig {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            const mongoURI = process.env.MONGODB_URI;
            if (!mongoURI) {
                throw new Error('MONGODB_URI is not defined in .env file');
            }
            await mongoose.connect(mongoURI);
            console.log('✅ Connected to MongoDB');
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
            process.exit(1);
        }
    }

    getDatabase() {
        return mongoose.connection;
    }
}

module.exports = new DatabaseConfig();
