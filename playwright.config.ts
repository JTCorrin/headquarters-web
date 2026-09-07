import { defineConfig } from '@playwright/test';
export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	use: { baseURL: 'http://127.0.0.1:4185', screenshot: 'only-on-failure' },
	webServer: {
		command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4185',
		port: 4185,
		timeout: 120000,
		env: { PUBLIC_BILLING_API_URL: 'https://billing.example.test' }
	}
});
