const Job = require("../models/Job");
const asyncHandler = require("../utils/asyncHandler");

exports.getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

exports.getJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.json(job);
});
