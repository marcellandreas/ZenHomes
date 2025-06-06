import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoute } from "./routers/userRoute.js";
import { residencyRoute } from "./routers/residencyRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", authRoute);
app.use("/api/residency", residencyRoute);
