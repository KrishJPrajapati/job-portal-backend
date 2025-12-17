const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const sanitize = require("mongo-sanitize");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./db/db");
require("dotenv").config();


const app = express();

// Security
app.use(helmet());
app.use(hpp());
app.use((req, res, next) => {
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);
    next();
});

// Rate limit
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, try again later"
}));

app.use(express.json({ limit: "20kb" }));
app.use(compression());
app.use(morgan("dev"));

app.use(cors());

app.use("/uploads", express.static("uploads"));

// Unified Routes
app.use("/", require("./router/routes"));

// Error Handler
app.use(errorHandler);

// Crash safety
process.on("unhandledRejection", err => {
    console.log("UNHANDLED REJECTION:", err);
    process.exit(1);
});

connectDB(process.env.DB_USERNAME, process.env.DB_PASSWORD);

app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});
