import Mess from "../models/Mess.js";
import { Student } from "../models/Student.js";
import { Subscription } from "../models/Subscription.js";

export const addSubscriptionMess = async (req, res) => {
  try {
    const {
      name,
      price,
      trialMealPrice, // You can still accept this if needed separately
      onGoingDiscount,
      discountOffer,
      messId,
      mealType,
      description
    } = req.body;

    // Validate required fields
    if (!name || !price || !messId || mealType === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create the new embedded subscription plan object
    const embeddedPlan = {
      name,
      price,
      mealType,
      onGoingDiscount,
      discountOffer,
      description
    };

    // Update Mess:
    const updatedMess = await Mess.findByIdAndUpdate(
      messId,
      {
        $push: { subscriptionPlans: embeddedPlan },
        $set: {
          subscription: {
            name,
            price
          }
        }
      },
      { new: true }
    );

    res.status(201).json({
      message: 'Subscription plan added successfully.',
      addedPlan: embeddedPlan,
      mess: updatedMess
    });

  } catch (error) {
    console.error('Error adding subscription plan:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



export const addSubscriptionToStudent = async (req, res) => {
  try {
    const { studentId, subscriptionId , messId} = req.body;

    // // Validate required fields
    // if (!studentId || !subscriptionId) {
    //   return res.status(400).json({ message: "Missing required fields." });
    // }

    // Find the student and update their subscription
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { subscribedMess : messId,
        subscription: subscriptionId },
      { new: true }
    ).populate('subscription');

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    const updateSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { studentId: studentId },
      { new: true }
    );
    if (!updateSubscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }


    res.status(200).json({
      message: 'Subscription added to student successfully.Student added to subscription successfully.',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Error adding subscription to student:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}