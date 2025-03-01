const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Models
const Organization = require("../Models/Organization");
const OrgInfo = require("../Models/OrgInfo");
const Donation = require("../Models/Donation");

// Function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Organization signup
router.post("/", async (req, res) => {
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
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const organization = await Organization.findOne({ email }).lean();
    const orgInfo = await OrgInfo.findOne({ id: organization.id });

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
        verified: orgInfo.verified,
      });
    }
    res.json({ status: "error", error: "Invalid email/password" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Post organization info
router.post("/info", async (req, res) => {
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
router.get("/info", async (req, res) => {
  try {
    const orgs = await OrgInfo.find();
    const blacklistedOrgs = await Organization.find({ blacklsted: true });
    const filtered = orgs.filter(
      (org) => !blacklistedOrgs.some((blacklisted) => blacklisted.id === org.id)
    );
    res.json(filtered);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Fetch organization details to edit
router.get("/data", async (req, res) => {
  const { id } = req.query; // Get id from query params

  if (!id) {
    return res.status(400).json({ error: "Organization ID is required" });
  }

  try {
    // Find donor by the custom 'id' field
    const org = await Organization.findOne({ id });
    const org2 = await OrgInfo.findOne({ id });

    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    if (!org2) {
      return res.status(404).json({ error: "Organization Info not found" });
    }

    res.json({
      name: org.name,
      email: org.email,
      telephone: org.telephone,
      type: org.type,
      address: org.address,
      walletAddress: org2.walletAddress,
      vision: org2.vision,
      donationAim: org2.donationAim,
      donationAmount: org2.donationAmount,
      currency: org2.currency,
      website: org2.website,
      image: org2.image,
      password: org.password,
    });
  } catch (err) {
    console.error("Error fetching organization:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update details
router.put("/update", async (req, res) => {
  const { id } = req.query; // Extract id from query parameters
  const data = req.body; // Extract the rest of the data from the request body

  try {
    const orgData = {
      name: data.name,
      email: data.email,
      telephone: data.telephone,
      type: data.type,
      address: data.address,
    };

    if (data.newPassword) {
      orgData.password = await hashPassword(data.newPassword);
    }

    const orgInfoData = {
      name: data.name,
      vision: data.vision,
      donationAim: data.donationAim,
      image: data.image,
      donationAmount: data.donationAmount,
      currency: data.currency,
      walletAddress: data.walletAddress,
      website: data.website,
      updatedAt: new Date(),
    };

    const org = await Organization.findOneAndUpdate({ id }, orgData, {
      new: true,
    });
    const orgInfo = await OrgInfo.findOneAndUpdate({ id }, orgInfoData, {
      new: true,
    });

    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    if (!orgInfo) {
      return res.status(404).json({ error: "Organization Info not found" });
    }

    res.json({ success: true, message: "Organization updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

// Get donations for an organization
router.get("/donations", async (req, res) => {
  const { id } = req.query;
  try {
    const donations = await Donation.find({ orgId: id });
    res.json(donations);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Stats
router.get("/stats", async (req, res) => {
  const { id } = req.query;
  try {
    const total_ = await Donation.find({ orgId: id });
    const total = total_.length;

    // Calculate total amount donated
    const amount = total_.reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate donations in the last 7 days using `donatedOn`
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recent = total_.filter(
      (donation) => donation.donatedOn > sevenDaysAgo
    ).length;

    res.json({
      total,
      amount,
      recent,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
