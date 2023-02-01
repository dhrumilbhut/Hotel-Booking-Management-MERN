import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE HOTEL ROUTE
router.post("/", verifyAdmin, createHotel);

//UPDATE HOTEL ROUTE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE HOTEL ROUTE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET HOTEL ROUTE
router.get("/:id", getHotel);

//GET ALL HOTELS ROUTE
router.get("/", getHotels);

export default router;
