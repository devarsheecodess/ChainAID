const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Models
const Donor = require("../Models/Donor");

// Function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Signup donor
router.post("/", async (req, res) => {
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

// Login donor
router.post("/login", async (req, res) => {
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

// Fetch donor details to edit
router.get("/data", async (req, res) => {
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
router.put("/update", async (req, res) => {
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

module.exports = router;
