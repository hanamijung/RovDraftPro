const express = require("express");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");
const Hero    = require("../models/Hero");

const router = express.Router();

// ── Multer config ──────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../uploads/heroes");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safe = Date.now() + "-" + Math.round(Math.random() * 1e6) + ext;
    cb(null, safe);
  },
});
const fileFilter = (req, file, cb) => {
  const ok = /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype);
  cb(ok ? null : new Error("Only images allowed"), ok);
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// ── GET all heroes ─────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ name: 1 });
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET single hero ────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ error: "Not found" });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST create hero (with optional image) ─────────────────────────
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, role, tier, emoji, color, counters, counteredBy, synergy } = req.body;
    const imgUrl = req.file ? `/uploads/heroes/${req.file.filename}` : "";
    const hero = await Hero.create({
      name,
      role:        JSON.parse(role        || "[]"),
      tier:        tier || "A",
      emoji:       emoji || "⚔️",
      color:       color || "#60a5fa",
      imgUrl,
      counters:    JSON.parse(counters    || "[]"),
      counteredBy: JSON.parse(counteredBy || "[]"),
      synergy:     JSON.parse(synergy     || "[]"),
    });
    res.status(201).json(hero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PUT update hero (with optional new image) ──────────────────────
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ error: "Not found" });

    const { name, role, tier, emoji, color, counters, counteredBy, synergy } = req.body;

    // Delete old image file if new one uploaded
    if (req.file && hero.imgUrl) {
      const oldPath = path.join(__dirname, "../../", hero.imgUrl);
      fs.unlink(oldPath, () => {});
    }

    const update = {
      name:        name        ?? hero.name,
      role:        role        ? JSON.parse(role)        : hero.role,
      tier:        tier        ?? hero.tier,
      emoji:       emoji       ?? hero.emoji,
      color:       color       ?? hero.color,
      counters:    counters    ? JSON.parse(counters)    : hero.counters,
      counteredBy: counteredBy ? JSON.parse(counteredBy) : hero.counteredBy,
      synergy:     synergy     ? JSON.parse(synergy)     : hero.synergy,
    };
    if (req.file) update.imgUrl = `/uploads/heroes/${req.file.filename}`;

    const updated = await Hero.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PATCH relations only (counter/synergy) ─────────────────────────
router.patch("/:id/relations", async (req, res) => {
  try {
    const { counters, counteredBy, synergy } = req.body;
    const update = {};
    if (counters    !== undefined) update.counters    = counters;
    if (counteredBy !== undefined) update.counteredBy = counteredBy;
    if (synergy     !== undefined) update.synergy     = synergy;
    const hero = await Hero.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!hero) return res.status(404).json({ error: "Not found" });
    res.json(hero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE hero ────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ error: "Not found" });
    // Remove image file
    if (hero.imgUrl) {
      const imgPath = path.join(__dirname, "../../", hero.imgUrl);
      fs.unlink(imgPath, () => {});
    }
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
