const mongoose = require("mongoose");

connectDB = async () => {
  const real = process.env.MONGO_URI;
  const test = process.env.MONGO_URI_TEST;

  try {
    const connect = await mongoose.connect(
      process.env.NODE_ENV === "test" ? test : real,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }
    );

    console.log(`MongoDB connected: ${connect.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    // close server & exit process
    server.close(() => process.exit(1));
  }
};

module.exports = connectDB;
