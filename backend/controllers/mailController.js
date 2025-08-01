const sendEmail = require("../utils/sendMail");

const sendEmailNormal = async (req, res, next) => {
  const { to, subject, message } = req.body;
  if (!to || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendEmail({
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    next(err);
  }
}

const sendOtpEmail = async (req, res, next) => {
  const { to, otp} = req.body;
  if (!to || !otp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendEmail({
      to,
      subject: "OTP Verification",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Our Platform</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
          <tr>
            <td style="background-color: #4F46E5; padding: 30px; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">👋 Welcome to [Your Company Name]</h1>
              <p style="margin: 10px 0 0; font-size: 16px;">Let’s get you started</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #333;">
                Hi <strong>{{name}}</strong>,
              </p>
              <p style="font-size: 16px; color: #333;">
                Your account has been successfully created. Use the OTP below to log in and access your dashboard.
              </p>
              <div style="margin: 20px 0; text-align: center;">
                <span style="display: inline-block; font-size: 24px; background-color: #E0E7FF; color: #1E3A8A; padding: 15px 30px; border-radius: 8px; font-weight: bold; letter-spacing: 4px;">
                  {${otp}}
                </span>
              </div>
              <p style="font-size: 14px; color: #666;">
                This OTP is valid for 10 minutes. Please do not share it with anyone.
              </p>
              <p style="font-size: 16px; color: #333;">
                Need help? Contact our support team at <a href="mailto:support@yourcompany.com" style="color: #4F46E5; text-decoration: none;">support@yourcompany.com</a>.
              </p>
              <p style="font-size: 16px; color: #333;">
                Cheers,<br />
                The [Your Company Name] Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #F3F4F6; text-align: center; padding: 20px; font-size: 12px; color: #888;">
              © {{year}} [Your Company Name]. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    next(err);
  }
}


module.exports = {
  sendEmailNormal,
  sendOtpEmail
}