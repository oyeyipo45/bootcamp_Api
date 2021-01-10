const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");
//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route Files
const bootcamps = require("./routes/bootcampRoutes");
const logger = require("./middleware/logger");

const app = express();

//body parser
app.use(express.json());

//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);

//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
