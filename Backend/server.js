const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173/", // Allow Vite frontend
  })
);
app.use(bodyParser.json()); // To parse JSON bodies

// Models
const Donor = require("./Models/Donor");
const Organization = require("./Models/Organization");
const OrgInfo = require("./Models/OrgInfo");

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

// Function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Signup Routes
app.post("/donor", async (req, res) => {
  const data = req.body;
  try {
    if (await Donor.findOne({ email: data.email })) {
      return res.json({ status: "exists", error: "Donor already exists!" });
    }
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
      return res.json({ status: "loggedIn", id: donor.id, name: donor.name });
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
    const image = await OrgInfo.findOne({ id: organization.id });
    if (await bcrypt.compare(password, organization.password)) {
      return res.json({
        status: "loggedIn",
        id: organization.id,
        name: organization.name,
        image: image.image,
      });
    }
    res.json({ status: "error", error: "Invalid email/password" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Post organization info
app.post("/organization/info", async (req, res) => {
  const data = req.body;
  try {
    const orgInfo = new OrgInfo(data);
    await orgInfo.save();
    res.send({ status: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all organizations Info
app.get("/organization/info", async (req, res) => {
  try {
    const orgs = await OrgInfo.find();
    res.send(orgs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Fetch donor details to edit
app.get("/donor/data", async (req, res) => {
  const { id } = req.query; // Get id from query params

  if (!id) {
    return res.status(400).json({ error: "Donor ID is required" });
  }

  try {
    // Find donor by the custom 'id' field
    const donor = await Donor.findOne({ id });

    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json(donor);
  } catch (err) {
    console.error("Error fetching donor:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit donor details
app.put("/update", async (req, res) => {
  try {
    const {
      id,
      username,
      name,
      email,
      phone,
      address,
      currentPassword,
      newPassword,
    } = req.body;

    // Find the donor by ID
    let donor = await Donor.findOne({ id });
    if (!donor) {
      return res
        .status(404)
        .json({ success: false, message: "Donor not found" });
    }

    // Update only schema-defined fields
    donor.username = username || donor.username;
    donor.name = name || donor.name;
    donor.email = email || donor.email;
    donor.phone = phone || donor.phone;
    donor.address = address || donor.address;

    // Handle password update if requested
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required to set a new password",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, donor.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect current password" });
      }

      donor.password = await bcrypt.hash(newPassword, 10);
    }

    await donor.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
