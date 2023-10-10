const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/userRoutes");
const app = express();
dbConnect();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running at server:", PORT);
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});

