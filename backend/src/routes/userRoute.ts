import express from "express";
import {
  newUser,
  getAllUsers,
  getUser,
  deleteUser,
} from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();

// create new user
// @ts-expect-error
app.post("/new", newUser);

// @ts-expect-error
app.get("/all", adminOnly, getAllUsers);

// @ts-expect-error
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);
export default app;
