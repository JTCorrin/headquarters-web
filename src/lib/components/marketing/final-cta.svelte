<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import { appLoginUrl } from '$lib/marketing/app.js';

	const billingApiUrl = $derived((env.PUBLIC_BILLING_API_URL ?? '').replace(/\/$/, ''));
	let checkoutBusy = $state(false);
	let checkoutError = $state<string | null>(null);

	async function startHostedCheckout() {
		checkoutError = null;
		if (!billingApiUrl) {
			checkoutError = 'Hosted checkout is not configured yet.';
			return;
		}
		checkoutBusy = true;
		try {
			const res = await fetch(`${billingApiUrl}/v1/checkout`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: '{}'
			});
			const data = (await res.json()) as { url?: string; error?: string };
			if (!res.ok || !data.url) {
				checkoutError = data.error ?? 'Could not start checkout.';
				return;
			}
			window.location.assign(data.url);
		} catch {
			checkoutError = 'Could not reach billing. Try again in a moment.';
		} finally {
			checkoutBusy = false;
		}
	}
</script>

<section id="waitlist" class="scroll-mt-20 py-20 sm:py-28">
	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
		<p class="font-display text-hq-ink text-4xl font-semibold tracking-tight sm:text-5xl">
			Run the business without the tab chaos.
		</p>
		<p class="text-hq-muted mx-auto mt-4 max-w-lg text-lg leading-relaxed">
			Start the hosted plan (£10/month) or self-host the source-available repo on your own stack. The
			app lives at app.headquarters-crm.com.
		</p>

		<div class="mx-auto mt-8 flex max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row">
			<Button
				type="button"
				disabled={checkoutBusy}
				onclick={startHostedCheckout}
				class="bg-hq-accent-strong hover:bg-hq-accent h-11 rounded-full px-6 text-white"
			>
				{checkoutBusy ? 'Redirecting…' : 'Start hosted'}
			</Button>
			<Button
				href={resolve('/docs')}
				variant="outline"
				class="border-hq-ink/20 text-hq-ink hover:bg-hq-paper-deep h-11 rounded-full px-6"
			>
				Self-host guide
			</Button>
		</div>
		<p class="text-hq-muted mt-4 text-sm">
			Already have an account?
			<a
				href={appLoginUrl}
				class="text-hq-accent-strong font-medium underline-offset-4 hover:underline">Log in</a
			>
		</p>
		{#if checkoutError}
			<p class="text-destructive mt-4 text-sm" role="alert">{checkoutError}</p>
		{/if}
	</div>
</section>
