const mongoose = require('mongoose');

class DatabaseConfig {
    constructor() {
        // Connection handled lazily via middleware
    }

    async connect() {
        if (global.mongoose && global.mongoose.conn) {
            return global.mongoose.conn;
        }

        if (!global.mongoose) {
            global.mongoose = { conn: null, promise: null };
        }

        try {
            const mongoURI = process.env.MONGODB_URI;
            if (!mongoURI) {
                console.error('❌ MONGODB_URI is not defined in environment variables');
                return;
            }

            if (!global.mongoose.promise) {
                global.mongoose.promise = mongoose.connect(mongoURI).then(m => m);
            }

            global.mongoose.conn = await global.mongoose.promise;
            console.log('✅ Connected to MongoDB');
            return global.mongoose.conn;
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
            global.mongoose.promise = null;
        }
    }

    getDatabase() {
        return mongoose.connection;
    }
}

module.exports = new DatabaseConfig();
