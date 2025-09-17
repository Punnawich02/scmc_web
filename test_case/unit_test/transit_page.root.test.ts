import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { makeReq, setBasicAuth, mockResponseJson } from "./helpers";

vi.mock("@prisma/client", () => {
	const mock = {
		transitCategory: {
			findMany: vi.fn(),
			create: vi.fn(),
			findUnique: vi.fn(),
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

// Use real bcrypt.compare against AUTH_PASSWORD_BCRYPT

describe("api/transit_page root handlers", () => {
	beforeEach(() => {
		vi.resetModules();
		mockResponseJson();
		process.env.AUTH_USERNAME = "admin";
		process.env.AUTH_PASSWORD_BCRYPT = "$2a$12$ow67jEkiWKM5sgzKsWBM7ePka5wtDwbkx3y62CucOv2nd6fWlNF82";
	});

	afterEach(() => {
		vi.restoreAllMocks();
		delete process.env.AUTH_USERNAME;
		delete process.env.AUTH_PASSWORD_BCRYPT;
	});

	it("GET returns list", async () => {
		const { GET } = await import("../../src/app/api/transit_page/route");
		const prismaModule = await import("@prisma/client");
		(prismaModule as any).__mock.transitCategory.findMany = vi.fn().mockResolvedValue([{ id: 1 }]);
		const res: any = await GET();
		expect(res.status).toBe(200);
		expect(res.body).toEqual([{ id: 1 }]);
	});

	it("POST creates when valid", async () => {
		const PASSWORD = process.env.TEST_USER_PASSWORD ?? "12345678";
		const { POST } = await import("../../src/app/api/transit_page/route");
		const prismaModule = await import("@prisma/client");
		(prismaModule as any).__mock.transitCategory.create = vi.fn().mockResolvedValue({ id: 1 });
		const headers = setBasicAuth("admin", PASSWORD);
		const req = makeReq({ headers, json: { name: "n", display_name_th: "th", display_name_en: "en", createBy: "me" } });
		const res: any = await POST(req);
		expect(res.status).toBe(200);
	});

	it("PUT 404 when not found", async () => {
		const PASSWORD = process.env.TEST_USER_PASSWORD ?? "12345678";
		const { PUT } = await import("../../src/app/api/transit_page/route");
		const prismaModule = await import("@prisma/client");
		(prismaModule as any).__mock.transitCategory.findUnique = vi.fn().mockResolvedValue(null);
		const headers = setBasicAuth("admin", PASSWORD);
		const req = makeReq({ headers, json: { id: 1, name: "n", display_name_th: "th", display_name_en: "en", editBy: "me" } });
		const res: any = await PUT(req);
		expect(res.status).toBe(404);
	});

	it("DELETE happy path", async () => {
		const PASSWORD = process.env.TEST_USER_PASSWORD ?? "12345678";
		const { DELETE } = await import("../../src/app/api/transit_page/route");
		const prismaModule = await import("@prisma/client");
		(prismaModule as any).__mock.transitCategory.findUnique = vi.fn().mockResolvedValue({ id: 1 });
		(prismaModule as any).__mock.transitCategory.delete = vi.fn().mockResolvedValue({ id: 1 });
		const headers = setBasicAuth("admin", PASSWORD);
		const req = makeReq({ headers, json: { id: 1 } });
		const res: any = await DELETE(req);
		expect(res.status).toBe(200);
	});
});


