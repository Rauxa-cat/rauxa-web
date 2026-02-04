import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export const contactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
});

export async function limitContactByIp(ip: string) {
  return contactRatelimit.limit(`contact:${ip}:dev`);
}
