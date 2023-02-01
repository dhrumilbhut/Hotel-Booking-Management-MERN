import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/room.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE Room ROUTE
router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE Room ROUTE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE Room ROUTE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

//GET Room ROUTE
router.get("/:id", getRoom);

//GET ALL RoomS ROUTE
router.get("/", getRooms);

export default router;
