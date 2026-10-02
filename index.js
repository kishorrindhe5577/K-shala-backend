const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const app = express();
app.set("trust proxy", true);

const frontendUrl = process.env.FRONTEND_URL;

app.use(cors({
  origin: frontendUrl || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: Boolean(frontendUrl),
}));

app.use(express.json());
app.use(helmet());
app.use(compression());

let mongoConnection;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is missing");
  }

  if (!mongoConnection) {
    mongoConnection = mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
    }).catch((error) => {
      mongoConnection = null;
      throw error;
    });
  }

  await mongoConnection;
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "K-Shala Backend Running Successfully",
  });
});

app.get("/api/db-health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ success: true, message: "MongoDB Connected" });
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    res.status(503).json({ success: false, message: "MongoDB connection failed" });
  }
});

app.use(async (req, res, next) => {
  if (!req.path.startsWith("/api/")) return next();

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    res.status(503).json({
      success: false,
      message: "Database connection unavailable",
    });
  }
});

const enrollmentRoute = require("./routes/enrollmentRoute");
const contactRoute = require("./routes/contactRoute");

app.use("/api", enrollmentRoute);
app.use("/api", contactRoute);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server Started on Port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB Error:", error.message);
      process.exit(1);
    });
}

module.exports = app;
