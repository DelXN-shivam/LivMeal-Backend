import { Student } from "../models/Student.js";
import { Mess } from "../models/Mess.js";

export const unifiedLoginByContact = async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "Contact number is required"
      });
    }

    // Search in Student collection first
    const student = await Student.findOne({ contact });
    if (student) {
      return res.status(200).json({
        success: true,
        message: "Student found, Login successful",
        role: "student",
        data: student
      });
    }

    // Search in Mess collection if not found in Student
    const mess = await Mess.findOne({ mobile: contact });
    if (mess) {
      return res.status(200).json({
        success: true,
        message: "Mess found, Login successful", 
        role: "mess",
        data: mess
      });
    }

    // If not found in either collection
    return res.status(404).json({
      success: false,
      message: "No user found with this contact number"
    });

  } catch (error) {
    console.error("Error during unified login:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};