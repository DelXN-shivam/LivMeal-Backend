// models/Mess.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const messSchema = new Schema({
  // Basic Info
  messName: { type: String },
  ownerName: { type: String },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  address: { type: String },
  role: { type: String, default: "mess" },

  // Service Details
  messType: { type: String, enum: ["veg", "non-veg", "both"] },
  deliveryAvailable: { type: Boolean },
  serviceRadius: { type: Number },

  // Meal Times
  breakfastTimings: {
    start: { type: String },
    end: { type: String },
  },
  lunchTimings: {
    start: { type: String },
    end: { type: String },
  },
  dinnerTimings: {
    start: { type: String },
    end: { type: String },
  },

  // Payment Methods
  upiId: { type: String },
  paymentPhone: { type: String },

  // Photos
  photos: {
    type: [String],
    default: [],
  },
  subscriptionPlans: {
    type: [
      {
        name: { type: String },
        price: { type: Number },
        mealType: { type: Number },
        onGoingDiscount: { type: Boolean, default: false },
        discountOffer: { type: Number },
        description: { type: String },
        subscriptionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subscription",
        },
      },
    ],
    default: [],
  },
  documents: {
    type: [String],
    default: [],
  },
  subscription: {
    type: [
      {
        name: { type: String },
        price: { type: Number },
      },
    ],
    default: [],
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVerified: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  messMenu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessMenu",
  },
});

export const Mess = mongoose.model("Mess", messSchema);

