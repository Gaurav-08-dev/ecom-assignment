import express from "express";
import { newUser } from "../controllers/user.js";
const app = express.Router();

// create new user
app.post("/new", newUser)
export default app;
