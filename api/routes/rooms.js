import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE Room ROUTE
router.post("/:hotelId", createRoom);

//UPDATE Room ROUTE
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//DELETE Room ROUTE
router.delete("/:id/:hotelId", deleteRoom);

//GET Room ROUTE
router.get("/:id", getRoom);

//GET ALL RoomS ROUTE
router.get("/", getRooms);

export default router;
