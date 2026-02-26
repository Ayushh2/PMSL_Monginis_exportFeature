import express from "express";
import { PrismaClient } from "@prisma/client";
import { sendBrochureLeadEmail } from "../mailer.js";

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/brochure-leads - Save lead details before brochure download
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, language = "en" } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    const lead = await prisma.brochureLead.create({
      data: { name, email, phone, language },
    });

    try {
      await sendBrochureLeadEmail({ name, email, phone, language });
    } catch (mailErr) {
      // Don't fail the request if email fails
      console.error("Brochure lead email send failed:", mailErr);
    }

    return res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error saving brochure lead:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save lead",
    });
  }
});

export default router;
