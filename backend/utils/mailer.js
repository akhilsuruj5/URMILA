const nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");

function truthy(v) {
  return ["1", "true", "yes", "on"].includes(String(v || "").toLowerCase());
}

function getSmtpConfig() {
  // Defaults tuned for Hostinger STARTTLS (less likely to be blocked than 465)
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE !== undefined ? truthy(process.env.SMTP_SECURE) : port === 465;

  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  return { host, port, secure, user, pass };
}

function normalizeRecipients(to) {
  if (!to) return [];
  if (Array.isArray(to)) {
    return to.map((email) => ({ email }));
  }
  return [{ email: to }];
}

async function sendMail({ to, subject, html, from, text, category }) {
  // Prefer Mailtrap API (HTTPS) when configured to avoid SMTP connectivity issues on PaaS hosts.
  if (process.env.MAILTRAP_TOKEN) {
    const client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

    const senderEmail =
      (typeof from === "string" ? from : from?.email) ||
      process.env.MAILTRAP_FROM_EMAIL ||
      process.env.EMAIL_FROM ||
      process.env.EMAIL_USER;
    const senderName =
      (typeof from === "object" ? from?.name : undefined) ||
      process.env.MAILTRAP_FROM_NAME ||
      "URMILA";

    if (!senderEmail) {
      throw new Error("Missing MAILTRAP_FROM_EMAIL (or EMAIL_FROM/EMAIL_USER) for Mailtrap sender");
    }

    const recipients = normalizeRecipients(to);
    if (recipients.length === 0) throw new Error("Missing recipient email");

    await client.send({
      from: { email: senderEmail, name: senderName },
      to: recipients,
      subject,
      text: text || (html ? html.replace(/<[^>]*>/g, "") : undefined),
      html,
      category: category || process.env.MAILTRAP_CATEGORY || "Transactional",
    });
    return;
  }

  const { host, port, secure, user, pass } = getSmtpConfig();
  if (!user || !pass) throw new Error("Missing SMTP_USER/SMTP_PASS (or EMAIL_USER/EMAIL_PASS)");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // fail fast: don't hang 30-40 seconds on blocked SMTP
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT_MS || 10_000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS || 10_000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS || 10_000),
    requireTLS: truthy(process.env.SMTP_REQUIRE_TLS ?? (!secure && port === 587)),
    tls: {
      // Some SMTP providers have strict TLS quirks; allow toggling.
      rejectUnauthorized: !truthy(process.env.SMTP_TLS_ALLOW_INVALID_CERTS),
    },
  });

  const mailFrom =
    (typeof from === "string" ? from : from?.email) || process.env.EMAIL_FROM || user;

  // Additional overall timeout guard
  const sendPromise = transporter.sendMail({
    from: mailFrom,
    to,
    subject,
    html,
    text,
  });
  const hardTimeoutMs = Number(process.env.EMAIL_SEND_TIMEOUT_MS || 15_000);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Email sending timeout after ${hardTimeoutMs}ms`)), hardTimeoutMs)
  );

  await Promise.race([sendPromise, timeoutPromise]);
}

module.exports = { sendMail, getSmtpConfig };

