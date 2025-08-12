import mongoose from 'mongoose';

const MessMenuSchema = new mongoose.Schema({
  messId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess', // Link to Mess collection
    required: true
  },
  dietaryPreferences: [String], // e.g. ['Jain', 'Vegan', 'Keto']
  menu: [
    {
      day: {
        type: String,
        enum: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        required: true
      },
      meals: [
        {
          mealType: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Dinner'],
            required: true
          },
          items: [String], // List of dishes
          price: {
            type: Number,
            required: true
          },
          calories: Number
        }
      ]
    }
  ],
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MessMenu = mongoose.model('MessMenu', MessMenuSchema);

export default MessMenu;
