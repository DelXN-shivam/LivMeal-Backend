import Review from '../models/Review.js';
import { Mess } from '../models/Mess.js';

export const addReview = async (req, res) => {
  try {
    const { messId, studentId, imgUrl, name, rating, description } = req.body;

    if (!messId || !studentId || !name || !rating || !description) {
      return res.status(400).json({
        success: false,
        message: "messId, studentId, name, rating, and description are required"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const newReview = new Review({
      messId,
      studentId,
      imgUrl,
      name,
      rating,
      description
    });

    await newReview.save();

    await Mess.findByIdAndUpdate(
      messId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: newReview
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const getReviewsByMess = async (req, res) => {
  try {
    const { messId } = req.params;

    const reviews = await Review.find({ messId }).populate('studentId', 'name imgUrl');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};