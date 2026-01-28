const axios = require("axios");

async function sendMail({ to, subject, html, from, text }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Missing BREVO_API_KEY for Brevo transactional email API");
  }

  const senderEmail =
    (typeof from === "string" ? from : from?.email) || process.env.EMAIL_FROM;
  const senderName =
    (typeof from === "object" ? from?.name : undefined) || process.env.EMAIL_FROM_NAME || "URMILA";

  if (!senderEmail) {
    throw new Error("Missing EMAIL_FROM or explicit 'from' for Brevo sender");
  }

  const toEmail = Array.isArray(to) ? to[0] : to;

  console.log("[MAIL] Brevo API send start", {
    to: toEmail,
    subject,
    senderEmail,
    senderName,
  });

  const payload = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: toEmail }],
    subject,
    htmlContent: html,
    textContent: text || undefined,
  };

  const response = await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    timeout: Number(process.env.BREVO_TIMEOUT_MS || 10000),
  });

  console.log("[MAIL] Brevo API send success", {
    to: toEmail,
    subject,
    status: response.status,
    data: response.data,
  });

  return response.data;
}

module.exports = { sendMail };

