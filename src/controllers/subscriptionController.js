import AdminConfig from "../models/AdminConfig.js";
import { Mess } from "../models/Mess.js";
import { Student } from "../models/Student.js";
import { Subscription } from "../models/Subscription.js";

export const addSubscriptionMess = async (req, res) => {
  try {
    const {
      name,
      price,
      trialMealPrice,
      onGoingDiscount,
      discountOffer,
      messId,
      mealType,
      description,
      subscriptionId
    } = req.body;

    // Validate required fields
    if (!name || !price || !messId || mealType === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const adminConfig = await AdminConfig.findOne();
    if (!adminConfig) {
      return res.status(500).json({ message: 'Admin config not found' });
    }

    const GST_PERCENT = adminConfig.gst;
    const PLATFORM_FEE_PERCENT = adminConfig.platformFee;

    // Calculate final price
    const gstAmount = (price * GST_PERCENT) / 100;
    const platformFee = (price * PLATFORM_FEE_PERCENT) / 100;
    const finalPrice = Math.round(price + gstAmount + platformFee); // you can keep decimal if needed

    // Create the new embedded subscription plan object for Mess
    const embeddedPlan = {
      name,
      price: finalPrice,
      mealType,
      onGoingDiscount: onGoingDiscount || false,
      discountOffer: discountOffer || 0,
      description,
      subscriptionId
    };

    const subscriptionObj = {
      name,
      price: finalPrice
    };

    // Create new subscription in Subscription model
    const newSubscription = new Subscription({
      name,
      price: finalPrice,
      trialMealPrice: trialMealPrice || 0,
      onGoingDiscount: onGoingDiscount || false,
      discountOffer: discountOffer || 0,
      messId
    });

    // Save the subscription to get the ID
    const savedSubscription = await newSubscription.save();

    embeddedPlan.subscriptionId = savedSubscription._id;

    // Update Mess with embedded plan and subscription reference
    const updatedMess = await Mess.findByIdAndUpdate(
      messId,
      {
        $push: {
          subscriptionPlans: embeddedPlan,
          subscription: subscriptionObj
        }
      },
      { new: true }
    );

    if (!updatedMess) {
      // If mess update fails, clean up the created subscription
      await Subscription.findByIdAndDelete(savedSubscription._id);
      return res.status(404).json({ message: 'Mess not found.' });
    }

    res.status(201).json({
      message: 'Subscription plan added successfully.',
      subscriptionId: savedSubscription._id,
      subscription: savedSubscription,
      mess: updatedMess
    });

  } catch (error) {
    console.error('Error adding subscription plan:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



export const addSubscriptionToStudent = async (req, res) => {
  try {
    const { studentId, subscriptionId, messId } = req.body;

    if (!studentId || !subscriptionId || !messId) {
      return res.status(400).json({
        success: false,
        message: "studentId, subscriptionId, and messId are required",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        $push: {
          subscribedMess: { $each: messId },
          subscription: { $each: subscriptionId }
        }
      },
      { new: true }
    )
      .populate("subscribedMess")
      .populate("subscription");

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscription and mess added successfully",
      data: updatedStudent
    });

  } catch (error) {
    console.error("Error adding subscription:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
