import mongoose from "mongoose";
import Review from "../models/review.js";
import Booking from "../models/booking.js";
import Log from "../models/log.js";
import { INTEGER, STRING } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Đánh giá",
    time_stamp: time,
  });
  await newLog.save();
};

const ROW_PER_PAGE = 2;

export const createReview = async (req, res) => {
  const review = req.body;
  try {
    const TIME_STAMP = new Date();
    const new_review = new Review({
      ...review,
      user: req._id,
      created_date: TIME_STAMP,
    });
    await new_review.save();
    const updatedBooking = await Booking.findByIdAndUpdate(
      new_review.booking,
      {
        reviewed: true,
        modified_date: TIME_STAMP,
      },
      { new: true }
    ).populate("hotel", ["name", "images"]);
    await logAction(req._id, INTEGER.LOG_SEND_REVIEW, TIME_STAMP);
    setTimeout(() => {
      res.status(202).json(updatedBooking);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAllReviewByHotel = async (req, res) => {
  const hotel = req.params.id;
  try {
    // GET ALL RELATED BOOKING
    const booking = await Booking.find(
      {
        hotel: hotel,
        status: INTEGER.BOOKING_CHECK_OUT,
        reviewed: true,
      },
      "_id"
    );
    // GET ALL REVIEWS
    const CUR_PAGE = 1;
    const review = await Review.find({ status: INTEGER.REVIEW_ACCEPTED })
      .where("booking")
      .in(booking)
      .skip(ROW_PER_PAGE * CUR_PAGE - ROW_PER_PAGE)
      .limit(ROW_PER_PAGE)
      .populate("user", ["full_name"])
      .populate("booking", [
        "effective_from",
        "effective_to",
        "adult",
        "kid",
        "baby",
      ]);
    // CALCULATE SCORES
    const scores = await Review.aggregate([
      {
        $match: {
          booking: { $in: booking.map((item) => item._id) },
          status: INTEGER.REVIEW_ACCEPTED,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalOverallScore: { $sum: "$overallScore" },
          totalCleanScore: { $sum: "$cleanScore" },
          totalLocationScore: { $sum: "$locationScore" },
          totalValueScore: { $sum: "$valueScore" },
          totalServiceScore: { $sum: "$serviceScore" },
          totalFacilityScore: { $sum: "$facilityScore" },
        },
      },
    ]);
    let NUMBER_REVIEW = 0;
    if (scores.length > 0) {
      NUMBER_REVIEW = scores[0].count;
      delete scores[0].count;
      delete scores[0]._id;
      for (const item in scores[0]) {
        const value = (scores[0][item] * 2) / NUMBER_REVIEW;
        scores[0][item] = Number(value.toFixed(1));
      }
    } else {
      scores[0] = {};
    }
    setTimeout(() => {
      res.status(202).send({
        info: {
          totalPage: Math.ceil(NUMBER_REVIEW / ROW_PER_PAGE),
          count: NUMBER_REVIEW,
          scores: scores[0],
        },
        review: review,
      });
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAllReviewByPagination = async (req, res) => {
  const { hotel, page } = req.params;
  try {
    // GET ALL RELATED BOOKING
    const booking = await Booking.find(
      {
        hotel: hotel,
        status: INTEGER.BOOKING_CHECK_OUT,
        reviewed: true,
      },
      "_id"
    );
    // GET ALL REVIEWS
    const review = await Review.find({ status: INTEGER.REVIEW_ACCEPTED })
      .where("booking")
      .in(booking)
      .skip(ROW_PER_PAGE * page - ROW_PER_PAGE)
      .limit(ROW_PER_PAGE)
      .populate("user", ["full_name"])
      .populate("booking", [
        "effective_from",
        "effective_to",
        "adult",
        "kid",
        "baby",
      ]);
    setTimeout(() => {
      res.status(202).send(review);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAllReviewByUser = async (req, res) => {
  const user = req._id;
  try {
    const review = await Review.find({ user: user }).populate("booking", [
      "number",
    ]);
    setTimeout(() => {
      res.status(202).send(review);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

// MANAGEMENT

export const getAllReviewForManagement = async (req, res) => {
  try {
    const review = await Review.find()
      .populate("user", ["full_name", "phone"])
      .populate({
        path: "booking",
        select: "number",
        populate: {
          path: "hotel",
          model: "Hotel",
          select: "name",
        },
      })
      .sort({ created_date: -1 });
    setTimeout(() => {
      res.status(202).send(review);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const acceptReview = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No review with that id");
  }
  try {
    const TIME_STAMP = new Date();
    const updated_review = await Review.findByIdAndUpdate(
      id,
      {
        status: INTEGER.REVIEW_ACCEPTED,
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("user", ["full_name", "phone"])
      .populate({
        path: "booking",
        select: "number",
        populate: {
          path: "hotel",
          model: "Hotel",
          select: "name",
        },
      });
    await logAction(req._id, INTEGER.LOG_APPROVE_REVIEW, TIME_STAMP);
    res.status(202).send(updated_review);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const ignoreReview = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No review with that id");
  }
  try {
    const TIME_STAMP = new Date();
    const updated_review = await Review.findByIdAndUpdate(
      id,
      {
        status: INTEGER.REVIEW_IGNORED,
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("user", ["full_name", "phone"])
      .populate({
        path: "booking",
        select: "number",
        populate: {
          path: "hotel",
          model: "Hotel",
          select: "name",
        },
      });
    await logAction(req._id, INTEGER.LOG_REJECT_REVIEW, TIME_STAMP);
    res.status(202).send(updated_review);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const resetReview = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No review with that id");
  }
  try {
    const TIME_STAMP = new Date();
    const updated_review = await Review.findByIdAndUpdate(
      id,
      {
        status: INTEGER.REVIEW_WAITING,
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("user", ["full_name", "phone"])
      .populate({
        path: "booking",
        select: "number",
        populate: {
          path: "hotel",
          model: "Hotel",
          select: "name",
        },
      });
    await logAction(req._id, INTEGER.LOG_RESET_REVIEW, TIME_STAMP);
    res.status(202).send(updated_review);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
