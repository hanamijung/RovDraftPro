const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true, trim: true },
  role:        { type: [String], default: [] },
  tier:        { type: String, default: "A", enum: ["S+","S","A","B","C","D"] },
  emoji:       { type: String, default: "⚔️" },
  color:       { type: String, default: "#60a5fa" },
  imgUrl:      { type: String, default: "" },   // path เช่น /uploads/heroes/xxx.jpg
  counters:    { type: [Number], default: [] },  // array of hero _id refs (stored as numbers for simplicity)
  counteredBy: { type: [Number], default: [] },
  synergy:     { type: [Number], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);
