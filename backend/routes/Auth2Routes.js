const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// Redirect user to Google's OAuth 2.0 consent screen
router.get("/auth/google", (req, res) => {
  const protocol = req.protocol;
  const host = req.get('host'); // e.g., example.com or localhost:5000

  const baseUrl = `${protocol}://${host}`;

  const redirectUri = process.env.NODE_ENV === "production"
    ? `${baseUrl}/auth/google/callback`
    : process.env.GOOGLE_REDIRECT_URI;

  const redirectUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;
  res.redirect(redirectUrl);
});

// Handle Google redirect
router.get("/auth/google/callback", async (req, res,next) => {
  const code = req.query.code;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token, id_token } = tokenResponse.data;

    // Get user profile
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userResponse.data;

    console.log("User info:", user);
    //Check if user exists

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id, role: existingUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return res
        .cookie("Token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production" ? true : false, // Set to true in production
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .redirect(
          process.env.NODE_ENV === "production" ? "/" : "http://localhost:5173/"
        );
      // .redirect(`http://localhost:5173/`);
    } else {
      const tokenPayload = {
        email: user.email,
        name: user.name,
        googleId: user.sub || user.googleId,
        picture: user.picture,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "15m", // short-lived for pre-registration
      });

      // Redirect to frontend with token in query
      res.redirect(
        process.env.NODE_ENV === "production"
          ? `/user/register?token=${token}`
          : `http://localhost:5173/user/register?token=${token}`
      );
    }

    // Send response to frontend
  } catch (err) {
    console.error(
      "Error during OAuth callback:",
      err.response?.data || err.message
    );
    next(err);
  }
});

module.exports = router;
