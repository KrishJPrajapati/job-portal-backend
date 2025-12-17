const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String
});

jobSchema.index({ title: "text", company: "text", location: "text" });

module.exports = mongoose.model("Job", jobSchema);
