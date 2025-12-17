const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const validate = require("../utils/validate");

const { registerSchema, loginSchema } = require("../validators/authValidator");
const { applySchema } = require("../validators/applicationValidator");

const { register, login } = require("../controllers/authController");
const { uploadResume } = require("../controllers/userController");
const { getJobs, getJob } = require("../controllers/jobController");
const { applyJob, myApplications } = require("../controllers/applicationController");

// Auth
router.post("/auth/register", validate(registerSchema), register);
router.post("/auth/login", validate(loginSchema), login);

// Resume upload
router.post("/users/upload-resume", auth, upload.single("resume"), uploadResume);

// Jobs
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJob);

// Applications
router.post("/applications/apply", auth, validate(applySchema), applyJob);
router.get("/applications/my", auth, myApplications);

module.exports = router;
