import mongoose from 'mongoose';

const MessMenuSchema = new mongoose.Schema({
  messId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mess",
    required: true,
  },
  dietaryPreferences: [String],
  menu: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      meals: [
        {
          mealType: {
            type: String,
            enum: ["Breakfast", "Lunch", "Dinner"],
            required: true,
          },
          items: [String],
          price: {
            type: Number,
            required: true,
          },
          calories: Number,
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessMenu = mongoose.model('MessMenu', MessMenuSchema);

export default MessMenu;
