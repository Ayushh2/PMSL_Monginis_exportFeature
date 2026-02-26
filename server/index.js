import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import inquiriesRouter from "./routes/inquiries.js";
import brochureLeadsRouter from "./routes/brochureLeads.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins (Vercel + local)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://pmsl-monginis-export-feature.vercel.app",
];

// ✅ CORS (fix for Vercel submit)
app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / Postman requests (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/brochure-leads", brochureLeadsRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Monginis Export API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Monginis Export API server running on port ${PORT}`);
});
