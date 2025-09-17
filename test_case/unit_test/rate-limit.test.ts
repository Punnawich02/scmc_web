import { describe, it, expect, vi, beforeEach } from "vitest";
import { rateLimit, createRateLimitMiddleware } from "../../src/app/lib/rate-limit";

function makeReq(headers: Record<string, string> = {}) {
	const store = new Map<string, string>(Object.entries(headers));
	return {
		headers: {
			get: (key: string) => store.get(key.toLowerCase()) ?? store.get(key) ?? null,
		},
	} as any;
}

describe("rateLimit core", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it("allows up to max within the window and then blocks", async () => {
		const limiter = rateLimit({ windowMs: 1000, max: 3 });
		const req = makeReq({ "x-forwarded-for": "1.2.3.4", "user-agent": "UA" });

		const r1 = await limiter(req);
		expect(r1.success).toBe(true);
		expect(r1.remaining).toBe(2);

		const r2 = await limiter(req);
		expect(r2.success).toBe(true);
		expect(r2.remaining).toBe(1);

		const r3 = await limiter(req);
		expect(r3.success).toBe(true);
		expect(r3.remaining).toBe(0);

		const r4 = await limiter(req);
		expect(r4.success).toBe(false);
		expect(r4.remaining).toBe(0);
	});

	it("resets after window passes", async () => {
		const limiter = rateLimit({ windowMs: 1000, max: 2 });
		const req = makeReq({ "x-forwarded-for": "5.6.7.8", "user-agent": "UA" });

		await limiter(req); // 1st
		await limiter(req); // 2nd
		const blocked = await limiter(req); // should block
		expect(blocked.success).toBe(false);

		vi.advanceTimersByTime(1001);

		const afterReset = await limiter(req);
		expect(afterReset.success).toBe(true);
		expect(afterReset.remaining).toBe(1);
	});

	it("uses default key derived from headers", async () => {
		const limiter = rateLimit({ windowMs: 1000, max: 1 });
		const reqA = makeReq({ "x-forwarded-for": "10.0.0.1", "user-agent": "A" });
		const reqB = makeReq({ "x-forwarded-for": "10.0.0.2", "user-agent": "B" });

		const a1 = await limiter(reqA);
		expect(a1.success).toBe(true);
		const a2 = await limiter(reqA);
		expect(a2.success).toBe(false);

		const b1 = await limiter(reqB);
		expect(b1.success).toBe(true);
	});
});

describe("createRateLimitMiddleware", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		// Minimal polyfill for Response.json used in middleware
		(globalThis as any).Response = class {
			static json(body: any, init?: { status?: number; headers?: Record<string, string> }) {
				return { body, status: init?.status ?? 200, headers: init?.headers ?? {} } as any;
			}
		};
	});

	it("returns null while under limit and response-like object when exceeded", async () => {
		const middleware = createRateLimitMiddleware({ windowMs: 1000, max: 2 });
		const req = makeReq({ "x-forwarded-for": "9.9.9.9", "user-agent": "UA" });

		const m1 = await middleware(req);
		expect(m1).toBeNull();
		const m2 = await middleware(req);
		expect(m2).toBeNull();
		const m3 = await middleware(req);
		expect(m3).not.toBeNull();
		expect((m3 as any).status).toBe(429);
		expect((m3 as any).headers["X-RateLimit-Limit"]).toBe("2");
	});
});


