const ALLOWED_ORIGINS = [
  "https://export.monginis.net",
  "https://www.export.monginis.net",
  "https://pmsl-monginis-export-feature.vercel.app",
  "https://pmsl-monginis-exportfeature.pages.dev",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

const SUPABASE_URL = "https://gziibzepaeralabxudwz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6aWliemVwYWVyYWxhYnh1ZHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTI3MTgsImV4cCI6MjA4OTU2ODcxOH0.LpaZCRetdnwKvWmt2CNT1K3YHqV83SQDNbjQUjXDy2Y";

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
  };
}

function corsResponse(body, status = 200, origin = "") {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin),
    },
  });
}

async function supabaseInsert(env, table, data) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=representation",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result?.message || `Supabase error: ${res.status}`);
  return Array.isArray(result) ? result[0] : result;
}

async function sendBrevoEmail(env, { senderName, toEmail, toName, subject, textContent, replyToEmail }) {
  const payload = {
    sender: { name: senderName || "Monginis Export", email: env.FROM_EMAIL },
    to: [{ email: toEmail, name: toName || toEmail }],
    subject,
    textContent: String(textContent),
    ...(replyToEmail ? { replyTo: { email: replyToEmail } } : {}),
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": env.BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `Brevo error: ${res.status}`);
  return data;
}

async function sendInquiryEmails(env, { name, email, phone, inform, country, businessDetails, language, inquiryId }) {
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

  // Admin email
  await sendBrevoEmail(env, {
    senderName: "Monginis Export",
    toEmail: env.ADMIN_EMAIL,
    subject: `New Inquiry from ${name}`,
    textContent: adminText,
    replyToEmail: email,
  });

  // Customer confirmation
  await sendBrevoEmail(env, {
    senderName: "Monginis Export Team",
    toEmail: email,
    toName: name,
    subject: "Thank you for contacting Monginis Exports",
    textContent: customerText,
  });
}

async function sendBrochureLeadEmail(env, { name, email, phone, language }) {
  const adminText = `
Brochure Download Request

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : 'Phone: Not provided'}
Language: ${language}
`.trim();

  const customerText = `
Hi ${name},

Thank you for downloading the Monginis Export Brochure!

We hope you find it informative. Our export team will reach out to you shortly.

If you have any queries, feel free to contact us at exports@monginis.net

Regards,
Monginis Export Team
`.trim();

  // Admin email
  await sendBrevoEmail(env, {
    senderName: "Monginis Export",
    toEmail: env.ADMIN_EMAIL,
    subject: `Brochure Download Request - ${name}`,
    textContent: adminText,
    replyToEmail: email,
  });

  // Customer confirmation
  await sendBrevoEmail(env, {
    senderName: "Monginis Export Team",
    toEmail: email,
    toName: name,
    subject: "Thank you for downloading Monginis Export Brochure!",
    textContent: customerText,
  });
}

async function handleInquiry(request, env, origin) {
  let body;
  try { body = await request.json(); }
  catch { return corsResponse({ success: false, message: "Invalid JSON" }, 400, origin); }

  const { name, email, phone, inform, country, message, businessDetails, language = "en" } = body;

  if (!name || !email || !phone || !inform || !country || !businessDetails) {
    return corsResponse({ success: false, message: "All fields are required" }, 400, origin);
  }

  const allowedInform = new Set(["exporter", "retailer", "trader"]);
  if (!allowedInform.has(String(inform))) {
    return corsResponse({ success: false, message: "Invalid inform value" }, 400, origin);
  }

  let inquiry;
  try {
    inquiry = await supabaseInsert(env, "Inquiry", {
      name, email, phone, inform, country,
      message: message || "",
      businessDetails, language,
    });
  } catch (err) {
    console.error("❌ DB error:", err);
    return corsResponse({ success: false, message: "Failed to submit inquiry" }, 500, origin);
  }

  try {
    await sendInquiryEmails(env, {
      name, email, phone, inform, country,
      businessDetails, language,
      inquiryId: inquiry?.id || "N/A",
    });
  } catch (mailErr) {
    console.error("❌ Email failed:", mailErr.message);
  }

  return corsResponse({ success: true, message: "Inquiry submitted successfully", data: inquiry }, 201, origin);
}

async function handleBrochureLead(request, env, origin) {
  let body;
  try { body = await request.json(); }
  catch { return corsResponse({ success: false, message: "Invalid JSON" }, 400, origin); }

  const { name, email, phone, language = "en" } = body;

  if (!name || !email || !phone) {
    return corsResponse({ success: false, message: "Name, email, and phone are required" }, 400, origin);
  }

  let lead;
  try {
    lead = await supabaseInsert(env, "BrochureLead", { name, email, phone, language });
  } catch (err) {
    console.error("❌ DB error:", err);
    return corsResponse({ success: false, message: "Failed to save lead" }, 500, origin);
  }

  try {
    await sendBrochureLeadEmail(env, { name, email, phone, language });
  } catch (mailErr) {
    console.error("❌ Brochure email failed:", mailErr.message);
  }

  return corsResponse({ success: true, message: "Lead saved successfully", data: lead }, 201, origin);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
    }

    if (path === "/api/health" && method === "GET") {
      return corsResponse({ status: "ok", message: "Monginis Export API ⚡ Cloudflare Workers" }, 200, origin);
    }

    if (path === "/api/inquiries" && method === "POST") {
      return handleInquiry(request, env, origin);
    }

    if (path === "/api/brochure-leads" && method === "POST") {
      return handleBrochureLead(request, env, origin);
    }

    return corsResponse({ success: false, message: "Route not found" }, 404, origin);
  },
};