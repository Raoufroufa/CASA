import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";

import * as dotenv from "dotenv";
dotenv.config();

import connectDB from "./mongodb/connect.js";

import authenticationRouter from "./routes/authenticationRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import auth from "./middlewares/authentication.js";
import propertiesRouter from "./routes/propertiesRoutes.js";
import postsRouter from "./routes/postsRoutes.js";
import commentsRouter from "./routes/commentsRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(__dirname + "/uploads"));

const photosMiddleware = multer({ dest: "uploads" });

app.post("/upload", photosMiddleware.array("photos", 15), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const url = req.protocol + "://" + req.get("host") + "/" + newPath;
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

// register and login route
app.use("/auth", authenticationRouter);

// initiallize routes
app.use("/users", auth, userRouter);

app.use("/properties", propertiesRouter);

app.use("/posts", postsRouter);

app.use("/comments", commentsRouter);

app.use("/dashboard", auth, dashboardRouter);

// start mongodb server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(5000, () =>
      console.log("Server started on port http://localhost:5000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
