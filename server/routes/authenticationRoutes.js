import express from "express";
import {
  registration,
  login,
  logout,
  resetPassword,
} from "../controllers/authenticationController.js";

import * as dotenv from "dotenv";
// import auth from "../middlewares/authentication.js";

dotenv.config();

const router = express.Router();

router.post("/register", registration);

router.post("/login",  login);

router.post("/logout", logout);

router.post("/forgot-password", resetPassword);



export default router;
