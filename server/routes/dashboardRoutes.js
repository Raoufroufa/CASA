import express from "express";

import {
  getDashboardCounts,
} from "../controllers/dashboardController.js";

  
import { sendNewsletter } from "../controllers/userController.js";

const router = express.Router();

// get statistics for admin
router.route("/count").get(getDashboardCounts);

// send newsletter notification to users 
router.route("/newsletter").post(sendNewsletter);

export default router;
