import { Mess } from "../models/Mess.js";

// export const updateById = async (req, res) => {
//     const { id } = req.params;
//     const updateFields = req.body;

//     // Define allowed fields from your schema
//     const allowedFields = [
//         'messName', 'messOwnerName', 'email', 'contact', 'messAddress',
//         'mealTypes', 'messTimings', 'deliveryAvailable',
//         'subscription', 'photos', 'isVerified'
//     ];

//     // Filter out invalid fields
//     const sanitizedFields = {};
//     Object.entries(updateFields).forEach(([key, value]) => {
//         if (allowedFields.includes(key) && value !== undefined && value !== '' &&
//             !(typeof value === 'object' && Object.keys(value).length === 0)) {
//             sanitizedFields[key] = value;
//         }
//     });

//     // Check if any valid fields were provided
//     if (Object.keys(sanitizedFields).length === 0) {
//         return res.status(400).json({ message: 'No valid fields provided for update' });
//     }

//     try {
//         const updatedMess = await Mess.findByIdAndUpdate(
//             id,
//             { $set: sanitizedFields },
//             { new: true, runValidators: true, strict: true }
//         );

//         if (!updatedMess) {
//             return res.status(404).json({ message: 'Mess not found' });
//         }

//         res.status(200).json(updatedMess);
//     } catch (error) {
//         console.error('Error updating mess:', error);
//         res.status(500).json({
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

// Register a new mess
export const registerMess = async (req, res) => {
  try {
    const requiredFields = [
      "messName",
      "ownerName",
      "email",
      "mobile",
      "address",
      "messType",
      // "deliveryAvailable",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    // Specifically check deliveryAvailable (boolean field)
    if (typeof req.body.deliveryAvailable !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "deliveryAvailable must be a boolean value",
      });
    }

    if (!req.body.upiId && !req.body.paymentPhone) {
      return res.status(400).json({
        success: false,
        message: "Either UPI ID or Payment Phone is required",
      });
    }

    if (req.body.deliveryAvailable === true && !req.body.serviceRadius) {
      return res.status(400).json({
        success: false,
        message: "Service radius is required when delivery is available",
      });
    }

    // Prepare mess data
    const newMess = {
      messName: req.body.messName,
      ownerName: req.body.ownerName,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address,
      messType: req.body.messType,
      deliveryAvailable: req.body.deliveryAvailable,
      serviceRadius: req.body.serviceRadius,
      upiId: req.body.upiId,
      paymentPhone: req.body.paymentPhone,
      photos: Array.isArray(req.body.photos) ? req.body.photos : [],
      documents: Array.isArray(req.body.documents) ? req.body.documents : [],
    };

    // Add meal timings if provided
    if (req.body.breakfastStart || req.body.breakfastEnd) {
      newMess.breakfastTimings = {
        start: req.body.breakfastStart,
        end: req.body.breakfastEnd,
      };
    }
    if (req.body.lunchStart || req.body.lunchEnd) {
      newMess.lunchTimings = {
        start: req.body.lunchStart,
        end: req.body.lunchEnd,
      };
    }
    if (req.body.dinnerStart || req.body.dinnerEnd) {
      newMess.dinnerTimings = {
        start: req.body.dinnerStart,
        end: req.body.dinnerEnd,
      };
    }

    const mess = await Mess.create(newMess);
    res.status(201).json({
      success: true,
      data: mess,
      role: "mess",
      message: "Mess registered successfully",
    });
  } catch (error) {
    console.error("Error registering mess:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all messes
export const getAllMesses = async (req, res) => {
  try {
    const messes = await Mess.find();
    res.status(200).json({
      success: true,
      count: messes.length,
      data: messes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single mess
export const getMess = async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }
    res.status(200).json({
      success: true,
      data: mess,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const loginByContact = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    // Find mess by mobile
    const mess = await Mess.findOne({ mobile });
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "No mess found with this mobile number",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: mess,
    });
  } catch (error) {
    console.error("Error logging in by contact:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update mess
export const updateMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }
    res.status(200).json({
      success: true,
      data: mess,
      message: "Mess updated successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete mess (soft delete)
export const deleteMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      { new: true }
    );
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
      message: "Mess deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
