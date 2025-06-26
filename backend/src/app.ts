import express from "express";
import userRoute from "./routes/userRoute.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
const port = 3000;
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("its working 👌");
});

app.use("/api/v1/user", userRoute);

// app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is listening... on ${port}`);
});
