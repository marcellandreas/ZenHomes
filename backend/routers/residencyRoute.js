import express from "express";
import {
  createRecidency,
  getAllResidencies,
  getRecidency,
} from "../controllers/RecidencyController.js";
import jwtCheck from "../config/auth0config.js";

const router = express.Router();

router.post("/create", jwtCheck, createRecidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getRecidency);

export { router as residencyRoute };
