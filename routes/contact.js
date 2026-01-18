// routes/contact.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Gmail Transporter Setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendContactEmail = async (formData) => {
  const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 40px 20px;
      line-height: 1.6;
    }
    .email-wrapper { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header-banner {
      background: rgb(48, 64, 80);
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }
    .header-banner::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: white;
      border-radius: 20px 20px 0 0;
    }
    .icon-badge {
      width: 80px;
      height: 80px;
      background: white;
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .header-title {
      color: white;
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .content { 
      padding: 40px 30px;
      color: #334155;
    }
    .greeting {
      font-size: 18px;
      color: #1e293b;
      margin-bottom: 20px;
    }
    .sender-box {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 20px;
      border-radius: 12px;
      margin: 25px 0;
      border-left: 4px solid #2ecc71;
    }
    .sender-text {
      font-size: 16px;
      color: #475569;
    }
    .sender-name {
      color: #2ecc71;
      font-weight: 700;
      font-size: 18px;
    }
    .info-box {
      background: linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%);
      padding: 25px;
      border-radius: 12px;
      margin: 25px 0;
      border: 2px solid #2ecc71;
    }
    .info-title {
      font-size: 18px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .info-row {
      background: white;
      padding: 18px;
      border-radius: 10px;
      margin-bottom: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .info-row:last-child { margin-bottom: 0; }
   .info-icon {
  font-size: 24px;
  min-width: 30px;
  margin-right: 10px;
}
    .info-content {
      flex: 1;
    }
    .info-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #999;
      font-weight: 700;
      margin-bottom: 5px;
      display: block;
    }
    .info-value {
      font-size: 15px;
      color: #1c1917;
      font-weight: 600;
      word-break: break-all;
    }
    .info-value a {
      color: #2ecc71;
      text-decoration: none;
      font-weight: 700;
    }
    .info-value a:hover {
      text-decoration: underline;
    }
    .message-box {
      background: linear-gradient(135deg, #fff7ed 0%, #fde8d0 100%);
      padding: 20px;
      border-radius: 12px;
      margin: 25px 0;
      border-left: 4px solid #f97316;
    }
    .message-title {
      font-weight: 700;
      color: #92400e;
      margin-bottom: 12px;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .message-content {
      color: #7f1d1d;
      line-height: 1.8;
      font-size: 15px;
      white-space: pre-wrap;
    }
    .cta-section {
      text-align: center;
      margin: 35px 0 25px;
    }
    .cta-text {
      font-size: 16px;
      color: #475569;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 700;
      font-size: 16px;
      box-shadow: 0 10px 25px rgba(46, 204, 113, 0.4);
      transition: all 0.3s ease;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(46, 204, 113, 0.5);
    }
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer-text {
      color: #64748b;
      font-size: 13px;
      margin: 8px 0;
    }
    .footer-brand {
      color: #1a1a2e;
      font-weight: 600;
      margin-top: 15px;
    }
    @media only screen and (max-width: 600px) {
      body { padding: 20px 10px; }
      .content { padding: 30px 20px; }
      .header-title { font-size: 22px; }
      .button { padding: 14px 30px; font-size: 14px; }
      .info-row { padding: 16px; gap: 12px; }
      .info-icon { font-size: 20px; }
      .info-label { font-size: 10px; }
      .info-value { font-size: 14px; }
      .message-content { font-size: 14px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header-banner">
      <h1 class="header-title">New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <p class="greeting">Hello!</p>
      
      <div class="sender-box">
        <p class="sender-text">
          You have received a new contact form submission from <span class="sender-name">${formData.firstName} ${formData.lastName}</span>
        </p>
      </div>
      
      <div class="info-box">
        <div class="info-title">
          <span class="info-icon">ℹ️</span> <span class="info-icon">Contact Information</span>
        </div>
        
        <div class="info-row">
          <div class="info-icon">📧</div>
          <div class="info-content">
            <span class="info-label">Email Address</span>
            <div class="info-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
          </div>
        </div>
        
        ${
          formData.phone
            ? `
        <div class="info-row">
          <div class="info-icon">📞</div>
          <div class="info-content">
            <span class="info-label">Phone Number</span>
            <div class="info-value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
          </div>
        </div>
        `
            : ""
        }
        
        ${
          formData.company
            ? `
        <div class="info-row">
          <div class="info-icon">🏢</div>
          <div class="info-content">
            <span class="info-label">Company</span>
            <div class="info-value">${formData.company}</div>
          </div>
        </div>
        `
            : ""
        }
      </div>
      
      <div class="message-box">
        <div class="message-title">
          <span class="info-icon">💬</span> 
          <span class="info-icon">Message</span>
        </div>
        <div class="message-content">${formData.message}</div>
      </div>
      
      <div class="cta-section">
        <p class="cta-text">Reply directly to this sender:</p>
        <a href="mailto:${formData.email}" class="button">Reply Now →</a>
      </div>
    </div>
    
    <div class="footer">
      <p class="footer-text">This message was sent on ${new Date().toLocaleString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      )}</p>
      <p class="footer-brand">ALLENXO Contact System</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      replyTo: formData.email,
      subject: `📬 New Contact: ${formData.firstName} ${formData.lastName}`,
      html: emailBody,
    });
    console.log("✅ Email sent successfully to:", process.env.NOTIFY_EMAIL);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

// POST - Contact Form Submission
router.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, company, phone, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Send email to admin
    await sendContactEmail({
      firstName,
      lastName,
      email,
      company: company || null,
      phone: phone || null,
      message,
    });

    // User کو success response
    res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully! We will get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

module.exports = router;
