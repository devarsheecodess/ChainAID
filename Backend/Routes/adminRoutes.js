const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Models
const Organization = require("../Models/Organization");
const OrgInfo = require("../Models/OrgInfo");
const Donor = require("../Models/Donor");

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const donor = await Donor.findOne({ email }).lean();

    // Check if donor exists
    if (!donor) {
      return res.json({ status: "error", error: "Donor doesn't exist!" });
    }

    // Check if the donor is an admin
    if (donor.role !== "admin") {
      return res.json({ status: "error", error: "Not an admin!" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, donor.password);
    if (!isPasswordValid) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }

    // ✅ Successful login: Return admin ID
    return res.json({
      status: "loggedIn",
      id: donor.id, // Ensuring MongoDB ObjectId is properly sent
    });
  } catch (err) {
    console.error("Error in admin login:", err);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
});

// Check if donor is admin
router.get("/check", async (req, res) => {
  const { id } = req.query;

  try {
    const donor = await Donor.findOne({ id: id }).lean();

    if (!donor) {
      return res.json({ status: "error", error: "Donor not found" });
    }

    if (donor.role === "admin") {
      return res.json({ status: "success" });
    }

    return res.json({ status: "error", error: "Not an admin" });
  } catch (err) {
    console.error("Admin Check Error:", err);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
});

// Get organization info (admin panel)
router.get("/orgs", async (req, res) => {
  try {
    const orgs = await Organization.find();
    const orgInfo = await OrgInfo.find();

    if (!orgs || !orgInfo) {
      return res.status(404).json({ message: "No organizations found" });
    }

    const response = orgs.map((org) => {
      const info = orgInfo.find(
        (info) => info.id.toString() === org.id.toString()
      );
      return {
        id: org.id,
        name: org.name,
        description: info ? info.vision : "No description available",
        address: info ? info.walletAddress : "No address available",
        status: org.blacklsted ? "blacklisted" : "active",
      };
    });

    res.json(response);
  } catch (err) {
    console.error("Error fetching organizations:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch organization info for verification
router.get("/verify/info", async (req, res) => {
  try {
    const orgs = await Organization.find();
    const orgInfo = await OrgInfo.find();

    if (!orgs || !orgInfo) {
      return res.status(404).json({ message: "No organizations found" });
    }

    // Filter and merge data based on common identifier (`id`) and `verified === false`
    const response = orgs
      .map((org) => {
        const info = orgInfo.find(
          (info) => info.id.toString() === org.id.toString()
        );

        // Only include organizations that are not verified
        if (info && info.verified === false && !org.blacklsted) {
          return {
            _id: org.id,
            id: org.orgID,
            name: org.name,
            certificate: org.certificate,
            description: info.vision,
            certificateDate: info.createdAt,
          };
        }
        return null; // Exclude verified entries
      })
      .filter((entry) => entry !== null); // Remove null values

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// App Stats
router.get("/stats", async (req, res) => {
  try {
    const totalOrganizations = await Organization.countDocuments();
    const activeOrganizations = await OrgInfo.countDocuments({
      verified: true,
    });

    // Keeping 'blacklsted' as intended
    const blacklistedOrganizations = await Organization.countDocuments({
      blacklsted: true,
    });

    const totalDonations = 0; // Placeholder, update when needed
    const totalTransactions = 0; // Placeholder for now

    const unverified = await OrgInfo.countDocuments({ verified: false });
    const blacklisted = await Organization.countDocuments({ blacklsted: true });

    // Ensure pendingVerifications count is non-negative
    const pendingVerifications = Math.max(0, unverified - blacklisted);

    res.json({
      totalOrganizations,
      activeOrganizations,
      blacklistedOrganizations,
      pendingVerifications,
      totalDonations,
      totalTransactions,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch pending verifications
router.get("/verify/pending", async (req, res) => {
  try {
    const pendingOrgs = await OrgInfo.find({ verified: false });
    res.json({
      id: pendingOrgs.id,
      name: pendingOrgs.name,
      submittedOn: pendingOrgs.createdAt,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Verify organization
router.put("/verify", async (req, res) => {
  const { id } = req.body;
  try {
    const org = await OrgInfo.findOneAndUpdate(
      { id },
      { verified: true },
      { new: true }
    );
    res.json({ status: "success", message: "Organization verified" });
  } catch (err) {
    console.log(err);
  }
});

// Blacklist organisation
router.put("/blacklist", async (req, res) => {
  const { id } = req.body;
  try {
    const org = await Organization.findOneAndUpdate(
      { id },
      { blacklsted: true },
      { new: true }
    );
    res.json({ status: "success", message: "Organization blacklisted" });
  } catch (err) {
    console.log(err);
  }
});

// Whitelist organisation
router.put("/whitelist", async (req, res) => {
  const { id } = req.body;
  try {
    const org = await Organization.findOneAndUpdate(
      { id },
      { blacklsted: false },
      { new: true }
    );
    res.json({ status: "success", message: "Organization whitelisted" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
