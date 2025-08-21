import mongoose from 'mongoose';

const MessMenuSchema = new mongoose.Schema({
  messId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess',
    required: true,
    unique: true
  },
  dailyMenus: {
    type: Map,
    of: {
      breakfast: {
        dietaryPreference: { type: String, enum: ["veg", "non-veg", "both"] },
        items: [String],
        actualTime: String
      },
      lunch: {
        dietaryPreference: { type: String, enum: ["veg", "non-veg", "both"] },
        items: [String],
        actualTime: String
      },
      dinner: {
        dietaryPreference: { type: String, enum: ["veg", "non-veg", "both"] },
        items: [String],
        actualTime: String
      }
    },
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

MessMenuSchema.pre('save', function() {
  this.updatedAt = new Date();
});

const MessMenu = mongoose.model('MessMenu', MessMenuSchema);

export default MessMenu;