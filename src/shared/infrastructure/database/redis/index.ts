import Redis from "ioredis";

export const redis = new Redis({
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});
