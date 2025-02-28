const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

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
    const blacklistedOrgs = await Organization.find({ blacklsted: true });
    const filtered = orgs.filter(
      (org) => !blacklistedOrgs.some((blacklisted) => blacklisted.id === org.id)
    );
    res.json(filtered);
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
app.put("/donor/update", async (req, res) => {
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

// Fetch organization details to edit
app.get("/organization/data", async (req, res) => {
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

app.put("/organization/update", async (req, res) => {
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

// Get organization info (admin panel)
app.get("/admin/orgs", async (req, res) => {
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
app.get("/admin/verify/info", async (req, res) => {
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
app.get("/admin/stats", async (req, res) => {
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
app.get("/admin/verify/pending", async (req, res) => {
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
app.put("/admin/verify", async (req, res) => {
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
app.put("/admin/blacklist", async (req, res) => {
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
app.put("/admin/whitelist", async (req, res) => {
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

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
