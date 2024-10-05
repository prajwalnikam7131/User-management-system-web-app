require('dotenv').config();

const mongoose = require('mongoose');

const mongodb_Url = process.env.MONGODB_URL;

let db = mongoose.connect(mongodb_Url)
    .then(() => console.log('database is Connected!'))
    .catch((err) => console.error("database", err));

module.exports = mongoose.connection;