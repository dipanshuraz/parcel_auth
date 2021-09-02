import express from "express";
const router = express.Router();
import { authenticateUser } from "../controllers/auth";

router.route("/").post(authenticateUser);

export default router;
