import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res) => {
//   res.send("Hello user you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res) => {
//   res.send("Hello user you are logged in");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
//   res.send("Hello Admin you are logged in");
// });

//UPDATE User ROUTE
router.put("/:id", verifyUser, updateUser);

//DELETE User ROUTE
router.delete("/:id", verifyUser, deleteUser);

//GET User ROUTE
router.get("/:id", verifyUser, getUser);

//GET ALL UserS ROUTE
router.get("/", verifyAdmin, getUsers);

export default router;
