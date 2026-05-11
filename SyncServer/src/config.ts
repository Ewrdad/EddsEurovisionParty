import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "8080", 10),
  adminToken: process.env.ADMIN_TOKEN || "development_fallback_token",
  isTestMode: process.env.TEST_MODE === "true"
};
