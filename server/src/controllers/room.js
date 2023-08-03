import mongoose from "mongoose";
import Room from "../models/room.js";
import Booking from "../models/booking.js";
import RoomType from "../models/room_type.js";
import Log from "../models/log.js";
import { INTEGER, STRING } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Phòng",
    time_stamp: time,
  });
  await newLog.save();
};

export const getAllRoom = async (req, res) => {
  try {
    const room = await Room.find()
      .populate("hotel", ["_id", "name"])
      .populate("room_type", ["_id", "name"]);
    setTimeout(() => {
      return res.status(200).json(room);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createRoom = async (req, res) => {
  const room = req.body;
  try {
    const TIME_STAMP = new Date();
    const newRoom = new Room({
      number: Number(room.number),
      hotel: room.hotel._id,
      room_type: room.room_type._id,
      created_date: TIME_STAMP,
    });
    await newRoom.save();
    const returnedRoom = await Room.findOne({ _id: newRoom._id })
      .populate("hotel", ["_id", "name"])
      .populate("room_type", ["_id", "name"]);
    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
    return res.status(200).json(returnedRoom);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const room = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room with that id");
  }
  try {
    const TIME_STAMP = new Date();
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        number: Number(room.number),
        hotel: room.hotel._id,
        room_type: room.room_type._id,
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("hotel", ["_id", "name"])
      .populate("room_type", ["_id", "name"]);
    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);
    res.status(202).json(updatedRoom);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room with that id");
  }
  try {
    // CHECK RELATED RECORD
    let delete_id = mongoose.Types.ObjectId(id);
    const related_booking = await Booking.findOne({ room_list: delete_id });
    if (related_booking) {
      return res.status(409).send(STRING.DELETE_RELATED_RECORD);
    }

    // PROCESS
    const TIME_STAMP = new Date();
    await Room.findOneAndRemove({ _id: id });
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Room deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const holdRoom = async (req, res) => {
  const data = req.body;
  if (!mongoose.Types.ObjectId.isValid(data.hotel)) {
    return res.status(404).send("No hotel with that id");
  }
  const begin = new Date(data.date[0]).setHours(0, 0, 0, 0);
  const end = new Date(data.date[1]).setHours(0, 0, 0, 0);
  try {
    // REQUESTED ROOM TYPES
    const selectedRoomTypes = data.selectedRoomTypes.reduce(
      (result, current) => {
        if (result[current["_id"]]) result[current["_id"]] += 1;
        else result[current["_id"]] = 1;
        return result;
      },
      {}
    );
    // GET ALL BOOKINGS IN DATE RANGE
    const bookingList = await Booking.find(
      {
        hotel: data.hotel,
        $or: [
          {
            status: {
              $gt: INTEGER.BOOKING_CANCELED,
              $lt: INTEGER.BOOKING_CHECK_OUT,
            },
            effective_from: { $gte: begin, $lte: end },
          },
          {
            status: {
              $gt: INTEGER.BOOKING_CANCELED,
              $lt: INTEGER.BOOKING_CHECK_OUT,
            },
            effective_to: { $gte: begin, $lte: end },
          },
        ],
      },
      "room_list"
    );
    let rentRoom = [];
    // CONCAT ALL RENTED ROOMS INTO ONE ARRAY
    for (let booking of bookingList) {
      rentRoom = rentRoom.concat(booking.room_list);
    }
    // REMOVE DUPLICATES AND COUNT RENTED ROOM
    const rentRoomCount = rentRoom.reduce((result, current) => {
      const curString = current.toString();
      if (result[curString]) result[curString] += 1;
      else result[curString] = 1;
      return result;
    }, {});
    //COUNT RENTED ROOMS GROUPED BY ROOM TYPE
    let rentRoomTypeCount = {};
    for (let room in rentRoomCount) {
      const roomTypeObj = await Room.findOne({ _id: room }, "room_type");
      const roomType = roomTypeObj.room_type.toString();
      if (rentRoomTypeCount[roomType])
        rentRoomTypeCount[roomType] += rentRoomCount[room];
      else rentRoomTypeCount[roomType] = rentRoomCount[room];
    }
    // CHECK ROOM QUANTITY
    const notEnoughRooms = [];
    for (let key in selectedRoomTypes) {
      const requested_count = selectedRoomTypes[key];
      // COUNT ROOMS WITH CORRESPONDING TYPES
      const all_count = await Room.countDocuments({
        $or: [
          { hotel: data.hotel, room_type: key, status: INTEGER.ROOM_EMPTY },
          {
            hotel: data.hotel,
            room_type: key,
            status: INTEGER.ROOM_PENDING,
            last_holding_time: { $lt: Date.now() },
          },
          {
            hotel: data.hotel,
            room_type: key,
            status: INTEGER.ROOM_RENTED,
          },
        ],
      });
      const actual_count = all_count - (rentRoomTypeCount[key] || 0);
      if (actual_count < requested_count) {
        //can not add key/value to a mongoose object
        //using lean() to disconnect object from mongoose
        const room_type = await RoomType.findOne(
          { _id: key },
          "name rent_bill"
        ).lean();
        room_type.requested_count = requested_count;
        room_type.actual_count = actual_count;
        notEnoughRooms.push(room_type);
      }
    }
    if (notEnoughRooms.length > 0) return res.status(409).json(notEnoughRooms);
    // ADD HOLDING TIME
    const holdingRooms = [];
    for (let key in selectedRoomTypes) {
      // GET ALL ROOMS EXCEPT HOLDING ROOMS BASED ON ROOM TYPE
      const roomList = await Room.find(
        {
          $or: [
            { hotel: data.hotel, room_type: key, status: INTEGER.ROOM_EMPTY },
            {
              hotel: data.hotel,
              room_type: key,
              status: INTEGER.ROOM_PENDING,
              last_holding_time: { $lt: Date.now() },
            },
            {
              hotel: data.hotel,
              room_type: key,
              status: INTEGER.ROOM_RENTED,
            },
          ],
        },
        "number"
      );
      // REMOVE ALL UNVAILABLE ROOMS
      for (let index = 0; index < roomList.length; index++) {
        if (rentRoomCount[roomList[index]._id.toString()])
          roomList.splice(index, 1);
      }

      //ADD HOLDING TIME
      let chosen_count = 0;
      for (let item of roomList) {
        if (chosen_count === selectedRoomTypes[key]) break;
        chosen_count++;
        await Room.findByIdAndUpdate(
          item._id,
          {
            status: INTEGER.ROOM_PENDING,
            last_holding_time: Date.now() + data.holding_time,
          }, // Holding in 10 minutes
          { new: true }
        );
        holdingRooms.push(item._id);
      }
    }
    res.status(202).json(holdingRooms);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
