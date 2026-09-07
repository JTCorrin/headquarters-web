import { test, expect } from '@playwright/test';
test('hosted pricing links to a successful checkout', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (e) => errors.push(e.message));
	await page.route('https://billing.example.test/v1/checkout', (route) =>
		route.fulfill({ json: { url: 'https://checkout.stripe.com/review' } })
	);
	await page.route('https://checkout.stripe.com/**', (route) =>
		route.fulfill({ body: 'Checkout' })
	);
	await page.goto('/');
	await expect(
		page.getByRole('link', { name: 'Start hosted', exact: true }).first()
	).toHaveAttribute('href', '/#pricing');
	await expect(page.getByText('£3 / month per additional seat')).toHaveCount(0);
	await page.getByRole('button', { name: 'Start hosted', exact: true }).first().click();
	await expect(page).toHaveURL('https://checkout.stripe.com/review');
	expect(errors).toEqual([]);
});
test('failed checkout is visible and can be retried', async ({ page }) => {
	await page.route('https://billing.example.test/v1/checkout', (route) =>
		route.fulfill({ status: 503, json: { error: 'Billing unavailable' } })
	);
	await page.goto('/');
	await page.getByRole('button', { name: 'Start hosted', exact: true }).first().click();
	await expect(page.getByRole('alert')).toHaveText('Billing unavailable');
	await expect(
		page.getByRole('button', { name: 'Start hosted', exact: true }).first()
	).toBeEnabled();
});
test('mobile page has canonical metadata and no horizontal overflow', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://headquarters-crm.com/'
	);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
