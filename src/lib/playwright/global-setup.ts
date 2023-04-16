import { config } from "dotenv";

const globalSetup = async () => {
  // Load environment variables from .env file
  const envConfig = config({ path: ".env" });

  // Add environment variables to process.env
  for (const key in envConfig.parsed) {
    process.env[key] = envConfig.parsed[key];
  }
};

export default globalSetup;
