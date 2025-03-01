const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const FRONTEND_URLS = [
  "http://localhost:5173", // Vite Dev Server
  "https://chain-aid.vercel.app", // Deployed Frontend
];

// Allow multiple origins dynamically
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || FRONTEND_URLS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies if needed
  })
);

app.use(bodyParser.json()); // To parse JSON bodies

// Increase payload size limit
app.use(bodyParser.json({ limit: "10mb" })); // Increase limit to 10MB
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import Routes
const donorRoutes = require("./Routes/donorRoutes");
const orgRoutes = require("./Routes/orgRoutes");
const adminRoutes = require("./Routes/adminRoutes");

// Use Routes
app.use("/donor", donorRoutes);
app.use("/organization", orgRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
