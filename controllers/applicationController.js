const Application = require("../models/Application");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.applyJob = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { jobId } = req.body;

    const user = await User.findById(userId);
    if (!user.resumeUrl)
        throw { statusCode: 400, message: "Upload resume first" };

    const application = await Application.create({
        userId,
        jobId,
        resumeUrl: user.resumeUrl
    });

    res.json({ message: "Application submitted", application });
});

exports.myApplications = asyncHandler(async (req, res) => {
    const apps = await Application.find({ userId: req.user.id })
        .populate("jobId");
    res.json(apps);
});
