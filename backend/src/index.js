require("dotenv").config();
const express   = require("express");
const mongoose  = require("mongoose");
const cors      = require("cors");
const path      = require("path");

const heroesRouter = require("./routes/heroes");

const app  = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors({ origin: "*" }));   // ปรับเป็น domain จริงตอน production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ── Routes ─────────────────────────────────────────────────────────
app.use("/api/heroes", heroesRouter);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date() }));

// ── MongoDB connection ─────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
