import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/netflix";

mongoose
  .connect(MONGODB_URI, { dbName: "netflix" })
  .then(() => console.log("DB connected"))
  .catch((e) => console.error("DB connection error:", e.message));

app.get("/", (_, res) => res.json({ ok: true }));

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
