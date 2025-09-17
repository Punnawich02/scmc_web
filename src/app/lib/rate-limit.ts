// /lib/rateLimit.ts
interface RateLimitConfig {
  windowMs: number; // ระยะเวลา window ในหน่วย milliseconds
  max: number; // จำนวน requests สูงสุดต่อ window
  keyGenerator?: (req: Request) => string; // function สำหรับสร้าง key
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;

    // ทำความสะอาด expired entries ทุก 5 นาที
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    Object.keys(this.store).forEach((key) => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  private getKey(req: Request): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(req);
    }

    // ใช้ IP address และ User-Agent เป็น default key
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwarded?.split(",")[0] || realIp || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    return `${ip}:${userAgent}`;
  }

  async check(req: Request): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
  }> {
    const key = this.getKey(req);
    const now = Date.now();
    const resetTime = now + this.config.windowMs;

    // ตรวจสอบว่ามี entry อยู่แล้วหรือไม่
    if (!this.store[key] || this.store[key].resetTime < now) {
      // สร้าง entry ใหม่หรือ reset
      this.store[key] = {
        count: 1,
        resetTime: resetTime,
      };

      return {
        success: true,
        limit: this.config.max,
        remaining: this.config.max - 1,
        resetTime: resetTime,
      };
    }

    // เพิ่ม count
    this.store[key].count += 1;
    const remaining = Math.max(0, this.config.max - this.store[key].count);
    const success = this.store[key].count <= this.config.max;

    return {
      success,
      limit: this.config.max,
      remaining,
      resetTime: this.store[key].resetTime,
    };
  }
}

// Export function สำหรับสร้าง rate limiter
export function rateLimit(config: RateLimitConfig) {
  const limiter = new RateLimiter(config);

  return async (req: Request) => {
    return await limiter.check(req);
  };
}

// Export middleware function
export function createRateLimitMiddleware(config: RateLimitConfig) {
  const limiter = new RateLimiter(config);

  return async (req: Request): Promise<Response | null> => {
    const result = await limiter.check(req);

    if (!result.success) {
      return Response.json(
        {
          error: "Too many requests",
          limit: result.limit,
          remaining: result.remaining,
          resetTime: new Date(result.resetTime).toISOString(),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit.toString(),
            "X-RateLimit-Remaining": result.remaining.toString(),
            "X-RateLimit-Reset": result.resetTime.toString(),
            "Retry-After": Math.ceil(
              (result.resetTime - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    return null; // ไม่มี error, ให้ดำเนินการต่อ
  };
}
