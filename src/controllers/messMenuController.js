// controllers/messMenuController.js
import MessMenu from "../models/MessMenu.js";
import { Mess } from "../models/Mess.js";

export const registerMessMenu = async (req, res) => {
  try {
    const { messId, dietaryPreferences, menu } = req.body;

    // Basic validation
    if (!messId || !menu || menu.length === 0) {
      return res
        .status(400)
        .json({ message: "Mess ID, type, and menu are required." });
    }

    // Create new MessMenu document
    const newMessMenu = new MessMenu({
      messId,
      dietaryPreferences,
      menu,
    });

    await newMessMenu.save();

    // Update the Mess with the new MessMenu ID
    await Mess.findByIdAndUpdate(
      messId,
      { $push: { messMenu: newMessMenu._id } }, // Correct $push syntax
      { new: true }
    );

    res.status(201).json({
      message: "Mess menu registered successfully and linked to mess",
      data: newMessMenu,
    });
  } catch (error) {
    console.error("Error registering mess menu:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
