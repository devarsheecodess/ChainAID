const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const session = require("express-session");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const Donor = require("../Models/Donor");
const FRONTEND_URL = process.env.FRONTEND_URL; // Replace with your frontend URL

// Session setup
router.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET, // Replace with a unique key
    resave: false, // Avoid resaving unchanged sessions
    saveUninitialized: false, // Only save sessions with initialized data
    cookie: {
      secure: false, // Set to true in production if using HTTPS
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // Session expires after 1 hour
    },
  })
);

// Passport setup
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingDonor = await Donor.findOne({
          email: profile.emails[0].value,
        });

        if (existingDonor) {
          return cb(null, existingDonor);
        } else {
          // If no donor is found, return an error
          return cb(new Error("Email address not found"));
        }
      } catch (err) {
        // Handle error and return it to the callback
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id); // Store user ID
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await Donor.find({ id });
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

// Routes
router.get(
  "/donor/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/donor/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),
  async (req, res) => {
    try {
      const donor = req.user;
      if (donor) {
        // Successful login logic
        res.cookie("donorName", donor.name, {
          httpOnly: true,
        });
        res.cookie("donorId", donor.id, {
          httpOnly: true,
        });

        // Redirect to your frontend
        res.redirect(`${FRONTEND_URL}/donor/dashboard`);
      } else {
        // If no user is found, render a page with an alert
        res.render("auth", { message: "Email address not found" });
      }
    } catch (err) {
      console.error(err);
      // Handle error and render a page with an alert
      res.render("auth", { message: "Authentication failed" });
    }
  }
);

// Retrieve cookies
router.get("/donor/cookies", (req, res) => {
  const donorName = req.cookies.donorName;
  const donorId = req.cookies.donorId;

  if (!donorName || !donorId) {
    return res.status(401).json({ message: "No donor information found" });
  }

  res.json({ donorName, donorId });
});

router.get("/donor/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("donorName"); // Clear donorName cookie
    res.clearCookie("donorId"); // Clear donorId cookie
    res.json({ success: true });
  });
});

module.exports = router;
