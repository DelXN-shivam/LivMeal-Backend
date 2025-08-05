import mongoose from 'mongoose';

const messSchema = new mongoose.Schema({
  messName: {
    type: String,
    // required: true,
    trim: true,
  },
  messOwnerName: {
    type: String,
    // required: true,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true, // assuming one mess per email
    lowercase: true,
  },
  contact: {
    type: String,
    // required: true,
  },
  messAddress: {
    type: String,
    // required: true,
  },
  mealTypes: {
    type: String,
    enum: ['veg', 'non-veg', 'both'],
    // required: true,
  },
  messTimings: {
    breakfast: {
      from: { type: String },
      to: { type: String },
    },
    lunch: {
      from: { type: String },
      to: { type: String },
    },
    dinner: {
      from: { type: String },
      to: { type: String },
    },
  },
  deliveryAvailable: {
    type: Boolean,
    default: false,
  },
  serviceRadius: {
    type: Number, // in kilometers
    default: 0,
  },
  subscriptionPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription', 
    },
  ],
  photos: [
    {
      type: String
    },
  ],
  isVerified: {
    type: String,
    enum: ['pending', 'verified' , 'rejected'],
    default: "pending"
  }
}, { timestamps: true , strict : true });

export default mongoose.model('Mess', messSchema);
