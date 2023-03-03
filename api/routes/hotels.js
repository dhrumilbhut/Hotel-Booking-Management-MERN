import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE HOTEL ROUTE
router.post("/", createHotel);

//UPDATE HOTEL ROUTE
router.put("/:id", updateHotel);
//DELETE HOTEL ROUTE
router.delete("/:id", deleteHotel);

//GET ALL HOTELS ROUTE
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

//GET HOTEL ROUTE
router.get("/:id", getHotel);

router.get("/room/:id", getHotelRooms);

export default router;
