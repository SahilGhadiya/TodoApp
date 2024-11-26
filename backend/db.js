const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.DATABASE_URL;

// MongoDB Atlas Connection
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {});
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectToMongo;