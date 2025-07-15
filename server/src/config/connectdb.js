const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connection Successful");
    } catch (error) {
        console.log(`Error Connecting to DB: ${error}`);
    }
}

module.exports = connectDB;