const express = require('express');
const axios = require('axios');


const router = express.Router();

// Redirect user to Google's OAuth 2.0 consent screen
router.get('/auth/google', (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;
  res.redirect(redirectUrl);
});

// Handle Google redirect
router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const { access_token, id_token } = tokenResponse.data;

    // Get user profile
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const user = userResponse.data;

    // TODO: Check if user exists in your DB and create session/token
    console.log('User info:', user);

    // Send response to frontend
    res.json({ user });
  } catch (err) {
    console.error('Error during OAuth callback:', err.response?.data || err.message);
    next(err);
  }
});

module.exports=router;
