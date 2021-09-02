const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

import consola from "consola";

import { json } from "body-parser";
import morgan from "morgan";

import { PORT } from "./constants";

import authApi from "./routes/auth";
import userApi from "./routes/user";

const app = express();

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Node.js & Express" });
});

app.use("/api/v1/auth", authApi);
app.use("/api/v1/users", userApi);

app.listen(PORT || 3000, () => {
  consola.success(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
