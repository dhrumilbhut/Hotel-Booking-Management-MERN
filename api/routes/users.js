import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE User ROUTE
router.put("/:id", verifyUser, updateUser);

//DELETE User ROUTE
router.delete("/:id", deleteUser);

//GET User ROUTE
router.get("/:id", verifyUser, getUser);

//GET ALL UserS ROUTE
router.get("/", getUsers);

export default router;
