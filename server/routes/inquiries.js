import express from "express";
import { PrismaClient } from "@prisma/client";
import { sendInquiryEmail } from "../mailer.js";

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/inquiries - Create a new inquiry + send email
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      inform,
      country,
      message, // optional (removed from UI)
      businessDetails,
      language = "en",
    } = req.body;

    if (!name || !email || !phone || !inform || !country || !businessDetails) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, inform, country, and business details are required",
      });
    }

    const allowedInform = new Set(["exporter", "retailer", "trader"]);
    if (!allowedInform.has(String(inform))) {
      return res.status(400).json({
        success: false,
        message: "Invalid inform value",
      });
    }

    const finalMessage = message || "";

    // Save inquiry in DB
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        inform,
        country,
        message: finalMessage,
        businessDetails,
        language,
      },
    });

    // Send email notification (don’t block DB save success if email fails)
    try {
      await sendInquiryEmail({
        name,
        email,
        phone,
        inform,
        country,
        message: finalMessage,
        businessDetails,
        language,
        inquiryId: inquiry.id,
      });
    } catch (mailErr) {
      console.error("Email send failed:", mailErr);
    }

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit inquiry",
    });
  }
});

// GET /api/inquiries - Get all inquiries (admin use)
router.get("/", async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries",
    });
  }
});

export default router;
