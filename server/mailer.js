import "dotenv/config";

/* ------------------ ENV VALIDATION ------------------ */
if (!process.env.BREVO_API_KEY) {
  throw new Error("Missing BREVO_API_KEY in env");
}
if (!process.env.ADMIN_EMAIL || !process.env.FROM_EMAIL) {
  throw new Error("Missing ADMIN_EMAIL or FROM_EMAIL in env");
}

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/* ============================================================
   INTERNAL: SEND EMAIL VIA BREVO HTTP API
   Brevo requires: textContent OR htmlContent
============================================================ */
async function sendBrevoEmail({
  senderName = "Monginis Export",
  toEmail,
  toName,
  subject,
  textContent, // ✅ correct field name
  replyToEmail,
  timeoutMs = 15000,
}) {
  if (!textContent || !String(textContent).trim()) {
    throw new Error("textContent is required for Brevo");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const payload = {
      sender: { name: senderName, email: FROM_EMAIL },
      to: [{ email: toEmail, name: toName || toEmail }],
      subject,
      textContent: String(textContent),
      ...(replyToEmail ? { replyTo: { email: replyToEmail } } : {}),
    };

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        data?.message ||
        data?.error ||
        `Brevo API error: ${res.status} ${res.statusText}`;
      throw new Error(msg);
    }

    return data; // typically contains messageId
  } finally {
    clearTimeout(timer);
  }
}

/* ============================================================
   SEND INQUIRY EMAIL
============================================================ */
export const sendInquiryEmail = async ({
  name,
  email,
  phone,
  inform,
  country,
  businessDetails,
  language = "en",
  inquiryId,
}) => {
  const adminText = `
Inquiry ID: ${inquiryId}

Name: ${name}
Email: ${email}
Phone: ${phone}
Inform: ${inform}
Country: ${country}
Language: ${language}

Business Details:
${businessDetails}
`.trim();

  const customerText = `
Hi ${name},

Thank you for contacting Monginis Export Team.

We have received your inquiry and our team will contact you shortly.

Reference ID: ${inquiryId}

Regards,
Monginis Export Team
`.trim();

  try {
    // 1) Admin
    const adminRes = await sendBrevoEmail({
      senderName: "Monginis Export",
      toEmail: ADMIN_EMAIL,
      subject: `New Inquiry from ${name}`,
      textContent: adminText,
      replyToEmail: email,
    });
    console.log("✅ Admin mail sent (Brevo API):", adminRes);

    // 2) Customer
    const custRes = await sendBrevoEmail({
      senderName: "Monginis Export Team",
      toEmail: email,
      toName: name,
      subject: "We received your inquiry",
      textContent: customerText,
    });
    console.log("✅ Customer mail sent (Brevo API):", custRes);

    return { success: true };
  } catch (error) {
    console.error("❌ Error sending inquiry email (Brevo API):", error);
    throw error;
  }
};

/* ============================================================
   SEND BROCHURE LEAD EMAIL
============================================================ */
export const sendBrochureLeadEmail = async ({
  name,
  email,
  phone,
  language = "en",
}) => {
  const text = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Language: ${language}
`.trim();

  try {
    const res = await sendBrevoEmail({
      senderName: "Monginis Export",
      toEmail: ADMIN_EMAIL,
      subject: `Brochure Download Request - ${name}`,
      textContent: text,
      replyToEmail: email,
    });

    console.log("✅ Brochure lead mail sent (Brevo API):", res);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending brochure email (Brevo API):", error);
    throw error;
  }
};