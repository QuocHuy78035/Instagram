const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString, {});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB");
});

db.on('error', () => {
    console.log("Error connecting to MongoDB");
});

db.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
});

module.exports = db;