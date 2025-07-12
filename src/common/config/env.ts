import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: `.env.${process.env["NODE_ENV"]}`,
  override: true,
});

const envSchema = z.object({
  PORT: z.string().optional().default("5000"),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  port: _env.data.PORT || 5000,
  dbHost: _env.data.DB_HOST,
  dbUser: _env.data.DB_USER,
  dbPassword: _env.data.DB_PASSWORD,
  dbName: _env.data.DB_NAME,
  cloudName: _env.data.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: _env.data.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: _env.data.CLOUDINARY_API_SECRET,
  accessTokenSecret: _env.data.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: _env.data.REFRESH_TOKEN_SECRET,
};
