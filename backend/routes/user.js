import express from "express";
import expressJwt from "express-jwt";
const router = express.Router();
import {
  createUser,
  getAllUser,
  getSingleUser,
  patchUser,
} from "../controllers/user";
import { SECRET } from "../constants";

router.route("/").get(getAllUser);

router
  .route("/:userId")
  .get(expressJwt({ secret: SECRET, algorithms: ["HS256"] }), getSingleUser);

router.route("/").post(createUser);

router
  .route("/:userId")
  .patch(expressJwt({ secret: SECRET, algorithms: ["HS256"] }), patchUser);

export default router;
