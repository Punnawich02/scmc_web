import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/server", () => ({
	NextResponse: {
		json: (body: any, init?: { status?: number }) => ({ body, status: init?.status ?? 200 }),
	},
}));

describe("api/news GET", () => {
	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		delete process.env.NEWS_CMU_API;
		delete process.env.COUNT_NEWS_CMU_API;
	});

	it("returns 500 when NEWS_CMU_API missing", async () => {
		const { GET } = await import("../../src/app/api/news/route");
		const res: any = await GET();
		expect(res.status).toBe(500);
		expect(res.body.error).toMatch(/not configured/i);
	});

	it("returns 500 when COUNT_NEWS_CMU_API missing", async () => {
		process.env.NEWS_CMU_API = "https://example.com/news";
		const { GET } = await import("../../src/app/api/news/route");
		const res: any = await GET();
		expect(res.status).toBe(500);
	});

	it("proxies news count then fetches news successfully", async () => {
		process.env.NEWS_CMU_API = "https://example.com/news";
		process.env.COUNT_NEWS_CMU_API = "https://example.com/count";
		const fetchMock = vi.spyOn(global, "fetch" as any);
		fetchMock
			.mockResolvedValueOnce({ ok: true, status: 200, json: async () => 4 } as any)
			.mockResolvedValueOnce({ ok: true, status: 200, json: async () => [{ id: 1 }] } as any);
		const { GET } = await import("../../src/app/api/news/route");
		const res: any = await GET();
		expect(res.status).toBe(200);
		expect(res.body).toEqual([{ id: 1 }]);
		expect(fetchMock).toHaveBeenCalledTimes(2);
		fetchMock.mockRestore();
	});
});


