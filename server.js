import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors"; // Import cors

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://speed-fox.netlify.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
