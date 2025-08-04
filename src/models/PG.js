import mongoose from 'mongoose';

const pgSchema = new mongoose.Schema({
  pgName: {
    type: String,
    required: true,
    trim: true,
  },
  pgOwnerName: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  address: {
    building: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  genderAccommodation: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    required: true
  },
  totalRooms: {
    type: Number,
    default: 0
  },
  availableRooms: {
    type: Number,
    default: 0
  },
  roomTypes: [
    {
      type: {
        type: String,
        enum: ['Single', 'Double', 'Triple', 'Dorm'],
        required: true
      },
      pricePerMonth: {
        type: Number,
        required: true
      },
      amenities: [String], // e.g. ['WiFi', 'Attached Bathroom', 'AC']
      totalRooms: Number,
      availableRooms: Number
    }
  ],
  facilities: [String], // e.g. ['Laundry', 'Parking', 'Power Backup']
  images: [String], // URLs to PG images
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PG = mongoose.model('PG', pgSchema);

export default PG;
