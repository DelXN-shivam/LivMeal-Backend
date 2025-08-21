// models/Menu.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const menuSchema = new mongoose.Schema({
  messId: { type: mongoose.Schema.Types.ObjectId, ref: "Mess", required: true },
  date: { type: String, required: true }, // e.g. "2025-08-21"
  mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
  dietaryPreference: { type: String, enum: ["veg", "non-veg", "both"], required: true },
  items: [String],
  actualTime: { type: String, required: true }, // "08:00-10:30 AM"
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent duplicates for same mess, same date, same mealType
menuSchema.index({ messId: 1, date: 1, mealType: 1 }, { unique: true });

export default mongoose.model("Menu", menuSchema);
