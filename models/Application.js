const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    resumeUrl: String,
    status: { type: String, default: "submitted" },
    appliedAt: { type: Date, default: Date.now }
});

applicationSchema.index({ userId: 1, jobId: 1 });
applicationSchema.index({ appliedAt: -1 });

module.exports = mongoose.model("Application", applicationSchema);
