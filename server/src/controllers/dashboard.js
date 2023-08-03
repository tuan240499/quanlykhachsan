import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import Booking from "../models/booking.js";
import Expense from "../models/expense.js";
import { STRING, INTEGER } from "../constants/constants.js";

export const getDashboard = async (req, res) => {
  try {
    // HOTEL COUNT
    const hotelCount = await Hotel.countDocuments();
    // ROOM COUNT
    const roomCount = await Room.aggregate([
      {
        $group: {
          _id: null,
          total_count: { $sum: 1 },
          empty_count: {
            $sum: {
              $cond: [
                {
                  $or: [
                    {
                      $eq: ["$status", INTEGER.ROOM_EMPTY],
                    },
                    {
                      $and: [
                        {
                          $eq: ["$status", INTEGER.ROOM_PENDING],
                        },
                        {
                          $lt: ["$last_holding_time", Date.now()],
                        },
                      ],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          pending_count: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$status", INTEGER.ROOM_PENDING],
                    },
                    {
                      $gt: ["$last_holding_time", Date.now()],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          rented_count: {
            $sum: {
              $cond: [{ $eq: ["$status", INTEGER.ROOM_RENTED] }, 1, 0],
            },
          },
        },
      },
    ]);
    if (roomCount.length === 0) {
      roomCount[0] = {
        total_count: 0,
        empty_count: 0,
        pending_count: 0,
        rented_count: 0,
      };
    }
    // BOOKING
    const bookingCount = await Booking.aggregate([
      {
        $group: {
          _id: null,
          total_count: { $sum: 1 },
          check_in_count: {
            $sum: {
              $cond: [{ $eq: ["$status", INTEGER.BOOKING_CHECK_IN] }, 1, 0],
            },
          },
          check_out_count: {
            $sum: {
              $cond: [{ $eq: ["$status", INTEGER.BOOKING_CHECK_OUT] }, 1, 0],
            },
          },
        },
      },
    ]);
    if (bookingCount.length === 0) {
      bookingCount[0] = {
        total_count: 0,
        check_in_count: 0,
        check_out_count: 0,
      };
    }
    // INCOME EXPENSE
    const income = await Booking.aggregate([
      { $match: { status: { $gt: INTEGER.BOOKING_CANCELED } } },
      { $project: { amount: true, month: { $month: "$created_date" } } },
      { $group: { _id: "$month", total: { $sum: "$amount" } } },
    ]);
    const expense = await Expense.aggregate([
      { $project: { amount: true, month: { $month: "$created_date" } } },
      { $group: { _id: "$month", total: { $sum: "$amount" } } },
    ]);
    setTimeout(() => {
      return res.status(200).json({
        bookingCount: bookingCount[0],
        hotelCount: hotelCount,
        roomCount: roomCount[0],
        income: income,
        expense: expense,
      });
    }, 500);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
