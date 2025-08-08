// src/models/AdminConfig.js
import mongoose from 'mongoose';

const adminConfigSchema = new mongoose.Schema({
  gst: {
    type: Number,
    required: true,
    default: 5, // default 5%
  },
  platformFee: {
    type: Number,
    required: true,
    default: 10, // default 10%
  }
}, {
  timestamps: true
});

export default mongoose.model('AdminConfig', adminConfigSchema);
