import mongoose from "mongoose";
import Booking from "../models/booking.js";
import RoomType from "../models/room_type.js";
import PeakDay from "../models/peak_day.js";
import Room from "../models/room.js";
import Log from "../models/log.js";
import { existsSync, unlinkSync } from "fs";
import { STRING, INTEGER } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Loại phòng",
    time_stamp: time,
  });
  await newLog.save();
};

const deleteImages = (images) => {
  if (images) {
    if (images instanceof Array) {
      const deletedImage = images.map((item) => "./static/" + item.slice(22));
      deletedImage.forEach((image) => existsSync(image) && unlinkSync(image));
    } else {
      const linkToDelete = "./static/" + images.slice(22);
      if (existsSync(linkToDelete)) unlinkSync(linkToDelete);
    }
  }
};

export const getAllRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.find()
      .populate("hotel", ["_id", "name"])
      .populate("services", ["_id", "name"]);
    setTimeout(() => {
      return res.status(200).json(roomType);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getRoomTypeByHotel = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No hotel with that id");
  }
  try {
    const roomType = await RoomType.find({ hotel: id }, "_id name");
    setTimeout(() => {
      return res.status(200).json(roomType);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createRoomType = async (req, res) => {
  const roomType = req.body;
  try {
    const TIME_STAMP = new Date();
    const newRoomType = new RoomType({
      ...roomType,
      rent_bill: Number(roomType.rent_bill),
      size: Number(roomType.size),
      bed_number: Number(roomType.bed_number),
      big_bed_number: Number(roomType.big_bed_number),
      adult: Number(roomType.adult),
      kid: Number(roomType.kid),
      created_date: TIME_STAMP,
    });
    await newRoomType.save();
    // FOR POPULATE PURPOSE
    const returnedRoomType = await RoomType.findOne({ _id: newRoomType._id })
      .populate("hotel", ["_id", "name"])
      .populate("services", ["_id", "name"]);
    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
    return res.status(200).json(returnedRoomType);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_TYPE_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateRoomType = async (req, res) => {
  const { id } = req.params;
  const roomType = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room_type with that id");
  }
  try {
    const TIME_STAMP = new Date();
    let new_images = [];
    if (roomType.current_images) {
      if (roomType.current_images instanceof Array) {
        new_images = [...roomType.current_images];
      } else {
        new_images.push(roomType.current_images);
      }
    }

    if (roomType.images) {
      if (roomType.images instanceof Array) {
        new_images = [...new_images, ...roomType.images];
      } else {
        new_images.push(roomType.images);
      }
    }

    const updatedRoomType = await RoomType.findByIdAndUpdate(
      id,
      {
        ...roomType,
        images: new_images,
        rent_bill: Number(roomType.rent_bill),
        size: Number(roomType.size),
        bed_number: Number(roomType.bed_number),
        big_bed_number: Number(roomType.big_bed_number),
        adult: Number(roomType.adult),
        kid: Number(roomType.kid),
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("hotel", ["_id", "name"])
      .populate("services", ["_id", "name"]);

    deleteImages(roomType.deleted_images);

    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);

    res.status(202).json(updatedRoomType);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_TYPE_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteRoomType = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room_service with that id");
  }
  try {
    // CHECK RELATED RECORD
    const related_room = await Room.findOne({ room_type: id });
    if (related_room) {
      return res.status(409).send(STRING.DELETE_RELATED_RECORD);
    }

    // PROCESS
    const TIME_STAMP = new Date();
    const deletedRoomType = await RoomType.findOneAndRemove({ _id: id });
    deleteImages(deletedRoomType.images);
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Room Service deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAvailableRoomType = async (req, res) => {
  const { hotel_id } = req.params;
  const filter = req.body;
  const begin = new Date(filter.date[0]).setHours(0, 0, 0, 0);
  const end = new Date(filter.date[1]).setHours(0, 0, 0, 0);
  if (!mongoose.Types.ObjectId.isValid(hotel_id)) {
    return res.status(404).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
  try {
    //ROOM LIST
    let roomList = await Room.find(
      {
        $or: [
          { hotel: hotel_id, status: INTEGER.ROOM_EMPTY },
          {
            hotel: hotel_id,
            status: INTEGER.ROOM_PENDING,
            last_holding_time: { $lt: Date.now() },
          },
          {
            hotel: hotel_id,
            status: INTEGER.ROOM_RENTED,
          },
        ],
      },
      "_id"
    );
    roomList = roomList.map((item) => item._id);
    //BOOKING LIST IN DATE RANGE
    let rentRoom = [];
    const bookingList = await Booking.find(
      {
        hotel: hotel_id,
        status: {
          $gt: INTEGER.BOOKING_CANCELED,
          $lt: INTEGER.BOOKING_CHECK_OUT,
        },
        effective_from: { $lte: end },
        effective_to: { $gte: begin },
      },
      "room_list"
    );
    for (let booking of bookingList) {
      rentRoom = rentRoom.concat(booking.room_list);
    }
    // console.log("room list", roomList);
    // console.log("----");
    // console.log("rent room", rentRoom);
    // console.log("----");
    //Merge, remove duplicates and create an index array to check duplicates with room list
    const ids = {};
    rentRoom.map((_id) => (ids[_id.toString()] = _id));
    //Remove unvailable room and create available list
    const available_room_list = [];
    for (let room of roomList) {
      if (ids[room.toString()] === undefined) available_room_list.push(room);
    }

    // Select available room types
    let room_type = [];

    let overLappingDay = 0;

    //check if there is any room available
    if (available_room_list.length > 0) {
      const available_room_type = await Room.distinct("room_type")
        .where("_id")
        .in(available_room_list);
      //check if there is any room type available
      if (available_room_type.length > 0) {
        room_type = await RoomType.find({
          // hotel: hotel_id, not needed
          adult: { $gte: filter.adult },
          kid: { $gte: filter.kid },
        })
          .where("_id")
          .in(available_room_type)
          .populate("services", ["icon", "name"]);

        const peakDayList = await PeakDay.find(
          {
            start_date: { $lte: end },
            end_date: { $gte: begin },
          },
          "name start_date end_date"
        );

        for (let peakDay of peakDayList) {
          const start_date = new Date(peakDay.start_date).getTime();
          const end_date = new Date(peakDay.end_date).getTime();
          const minEndDate = end_date > end ? end : end_date;
          const maxStartDate = start_date > begin ? start_date : begin;

          const diffDays = Math.floor((minEndDate - maxStartDate) / 86400000);
          overLappingDay =
            diffDays >= 0 ? overLappingDay + diffDays + 1 : overLappingDay;
        }
      }
    }
    //return
    setTimeout(() => {
      res
        .status(202)
        .json({ room_type: room_type, numPeakDay: overLappingDay });
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
