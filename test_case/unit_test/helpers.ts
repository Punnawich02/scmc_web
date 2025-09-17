export function makeReq(init?: { headers?: Record<string, string>; json?: any }) {
	const headerMap = new Map<string, string>(Object.entries(init?.headers ?? {}));
	return {
		headers: {
			get: (k: string) => headerMap.get(k) ?? headerMap.get(k.toLowerCase()) ?? null,
		},
		json: async () => init?.json,
	} as any as Request;
}

export function setBasicAuth(username: string, password: string) {
	const token = Buffer.from(`${username}:${password}`, "utf-8").toString("base64");
	return { authorization: `Basic ${token}` };
}

export function mockResponseJson() {
	(globalThis as any).Response = class {
		body: any;
		status: number;
		headers: Record<string, string>;
		constructor(body?: any, init?: { status?: number; headers?: Record<string, string> }) {
			this.body = body;
			this.status = init?.status ?? 200;
			this.headers = init?.headers ?? {};
		}
		static json(body: any, init?: { status?: number; headers?: Record<string, string> }) {
			return { body, status: init?.status ?? 200, headers: init?.headers ?? {} } as any;
		}
	};
}


