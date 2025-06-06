import express from "express";
import {
  createRecidency,
  getAllResidencies,
  getRecidency,
} from "../controllers/RecidencyController.js";

const router = express.Router();

router.post("/create", createRecidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getRecidency);

export { router as residencyRoute };
