import Mess from "../models/Mess.js";
import { Student } from "../models/Student.js";
import { Subscription } from "../models/Subscription.js";

export const addSubscriptionMess = async (req, res) => {
  try {
    const { name, price, trialMealPrice, onGoingDiscount, discountOffer, messId } = req.body;

    // Validate required fields
    // if (!name || !price || !trialMealPrice || !messId || !studentId) {
    //   return res.status(400).json({ message: "Missing required fields." });
    // }

    // Create a new subscription
    const newSubscription = new Subscription({
      name,
      price,
      trialMealPrice,
      onGoingDiscount,
      discountOffer,
      messId
    });

    // Save the subscription to the database
    await newSubscription.save();

    // Optional: update the Mess with this subscription reference (only if needed)
    await Mess.findByIdAndUpdate(messId, { subscriptionPlans: newSubscription._id });

    res.status(201).json({
      message: 'Subscription created successfully.',
      subscription: newSubscription
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
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