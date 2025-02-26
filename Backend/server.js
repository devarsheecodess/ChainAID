const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

dotenv.config();

app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies

// Models
const Donor = require("./Models/Donor");
const Organization = require("./Models/Organization");

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

// Function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Signup Routes
app.post("/donor", async (req, res) => {
  const data = req.body;
  try {
    data.password = await hashPassword(data.password);
    const donor = new Donor(data);
    await donor.save();
    res.send({ status: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/organization", async (req, res) => {
  const data = req.body;
  try {
    data.password = await hashPassword(data.password);
    const organization = new Organization(data);
    await organization.save();
    res.send({ status: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Login Routes
app.post("/donor/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const donor = await Donor.findOne({ email }).lean();
    if (!donor) {
      return res.json({ status: "error", error: "Donor doesnt exist!" });
    }
    if (await bcrypt.compare(password, donor.password)) {
      return res.json({ status: "loggedIn", data: donor });
    }
    res.json({ status: "error", error: "Invalid username/password" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/organization/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const organization = await Organization.findOne({ email }).lean();
    if (!organization) {
      return res.json({
        status: "error",
        error: "Organization doesn't exist!",
      });
    }
    if (await bcrypt.compare(password, organization.password)) {
      return res.json({ status: "loggedIn", data: organization });
    }
    res.json({ status: "error", error: "Invalid email/password" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
