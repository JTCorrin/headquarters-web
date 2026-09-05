<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { appLoginUrl } from '$lib/marketing/app.js';

	const githubRepo = 'https://github.com/JTCorrin/Headquarters';
	const billingApiUrl = $derived((env.PUBLIC_BILLING_API_URL ?? '').replace(/\/$/, ''));

	let checkoutBusy = $state(false);
	let checkoutError = $state<string | null>(null);

	const tiers = [
		{
			id: 'self-host' as const,
			name: 'Self-host',
			price: 'Free',
			priceSuffix: '',
			blurb: 'Source-available. Run it on your own stack — forever free.',
			features: [
				'Full product, self-hosted',
				'Unlimited seats on your infra',
				'You own the data and uptime',
				'Community updates'
			],
			cta: 'Self-host guide',
			featured: false
		},
		{
			id: 'hosted' as const,
			name: 'Hosted',
			price: '£10',
			priceSuffix: ' / license / month',
			blurb: 'We host it. Three seats included — then £3 per extra seat.',
			features: [
				'3 seats included',
				'£3 / month per additional seat',
				'Mailbox, playbooks, billing path',
				'Updates and backups handled'
			],
			cta: 'Start hosted',
			featured: true
		}
	];

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

<section id="pricing" class="scroll-mt-20 py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<div class="mx-auto max-w-xl text-center">
			<p class="text-hq-accent-strong text-xs font-semibold tracking-[0.18em] uppercase">Pricing</p>
			<h2 class="font-display text-hq-ink mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
				Self-host free. Hosted when you’d rather not babysit servers.
			</h2>
			<p class="text-hq-muted mt-4 text-lg">
				Solopreneurs and small teams shouldn’t need an enterprise quote to stay organized.
			</p>
		</div>

		<div class="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
			{#each tiers as tier, i (tier.id)}
				<article
					class={cn(
						'flex flex-col rounded-2xl border p-8 shadow-[0_16px_40px_-28px_rgba(15,23,28,0.35)]',
						i === 0 && 'hq-float',
						i === 1 && 'hq-float-delay',
						tier.featured
							? 'border-hq-accent bg-hq-accent-soft/40 shadow-hq-accent/15'
							: 'border-hq-line bg-card'
					)}
				>
					<h3 class="font-display text-hq-ink text-2xl font-semibold">{tier.name}</h3>
					<p class="text-hq-muted mt-2 text-sm leading-relaxed">{tier.blurb}</p>
					<p class="text-hq-ink mt-6">
						<span class="font-display text-4xl font-semibold">{tier.price}</span>
						{#if tier.priceSuffix}
							<span class="text-hq-muted text-sm">{tier.priceSuffix}</span>
						{/if}
					</p>
					<ul class="text-hq-muted mt-6 flex-1 space-y-2 text-sm">
						{#each tier.features as feature (feature)}
							<li class="flex gap-2">
								<span class="text-hq-accent-strong">✓</span>
								{feature}
							</li>
						{/each}
					</ul>
					{#if tier.id === 'self-host'}
						<Button
							href={resolve('/docs')}
							class="mt-8 w-full rounded-full bg-hq-ink text-hq-paper hover:bg-hq-ink/90"
						>
							{tier.cta}
						</Button>
						<a
							href={githubRepo}
							target="_blank"
							rel="noopener noreferrer"
							class="text-hq-muted hover:text-hq-ink mt-3 block text-center text-sm underline-offset-4 hover:underline"
						>
							View source on GitHub
						</a>
					{:else}
						<Button
							type="button"
							disabled={checkoutBusy}
							onclick={startHostedCheckout}
							class="mt-8 w-full rounded-full bg-hq-accent-strong text-white hover:bg-hq-accent"
						>
							{checkoutBusy ? 'Redirecting…' : tier.cta}
						</Button>
						<a
							href={appLoginUrl}
							class="text-hq-muted hover:text-hq-ink mt-3 block text-center text-sm underline-offset-4 hover:underline"
						>
							Log in to the app
						</a>
					{/if}
				</article>
			{/each}
		</div>
		{#if checkoutError}
			<p class="text-destructive mt-6 text-center text-sm" role="alert">{checkoutError}</p>
		{/if}
	</div>
</section>
