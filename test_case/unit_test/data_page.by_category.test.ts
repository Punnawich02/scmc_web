import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mockResponseJson, makeReq, setBasicAuth } from "./helpers";

vi.mock("@prisma/client", () => {
	const mock = {
		dataCategory: { findUnique: vi.fn() },
		dataEmbed: {
			findMany: vi.fn(),
			findFirst: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		},
		$disconnect: vi.fn(),
	} as any;
	return {
		PrismaClient: vi.fn(() => mock),
		__mock: mock,
	};
});

// Use real bcrypt.compare (not used in these GET tests, but keep consistent)

function contextWith(category: string) {
	return { params: Promise.resolve({ category }) } as any;
}

describe("api/data_page/[category] handlers", () => {
	beforeEach(() => {
		vi.resetModules();
		mockResponseJson();
		process.env.AUTH_USERNAME;
		process.env.AUTH_PASSWORD_BCRYPT;
	});

	afterEach(() => {
		vi.restoreAllMocks();
		delete process.env.AUTH_USERNAME;
		delete process.env.AUTH_PASSWORD_BCRYPT;
	});

	it("GET 404 when category missing", async () => {
		const prismaModule = await import("@prisma/client");
		(prismaModule as any).__mock.dataCategory.findUnique = vi.fn().mockResolvedValue(null);
		const { GET } = await import("../../src/app/api/data_page/[category]/route");
		const res: any = await GET(makeReq(), contextWith("abc"));
		expect(res.status).toBe(404);
	});

	it("GET returns embeds", async () => {
		const prismaModule = await import("@prisma/client");
		(prismaModule as any).__mock.dataCategory.findUnique = vi.fn().mockResolvedValue({ id: 2 });
		(prismaModule as any).__mock.dataEmbed.findMany = vi.fn().mockResolvedValue([{ id: 1 }]);
		const { GET } = await import("../../src/app/api/data_page/[category]/route");
		const res: any = await GET(makeReq(), contextWith("abc"));
		expect(res.status).toBe(200);
		expect(res.body).toEqual([{ id: 1 }]);
	});
});


