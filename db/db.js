const mongoose = require("mongoose");

const connection = async (DB_USERNAME, DB_PASSWORD) => {
    const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@job-portal-cluster.gykd4wp.mongodb.net/?appName=job-portal-cluster`;

    try {
        await mongoose.connect(URL);
        console.log("Main DB connected successfully");
    } catch (error) {
        console.log("Error while connecting to DB", error);
    }
};

module.exports = connection;