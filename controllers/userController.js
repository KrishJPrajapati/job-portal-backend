const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.uploadResume = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
        userId,
        { resumeUrl: req.file.path },
        { new: true }
    );

    res.json({
        message: "Resume uploaded successfully",
        resumeUrl: user.resumeUrl
    });
});
