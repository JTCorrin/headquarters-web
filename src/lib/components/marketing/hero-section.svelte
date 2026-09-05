<script lang="ts">
	import ProductFrame from '$lib/product-demos/ProductFrame.svelte';
	import DashboardDemo from '$lib/product-demos/dashboard/DashboardDemo.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { APP_ORIGIN, appLoginUrl, appSignupUrl } from '$lib/marketing/app.js';

	const appHost = APP_ORIGIN.replace(/^https:\/\//, '');
</script>

<section class="relative overflow-hidden hq-atmosphere hq-grain">
	<div
		class="relative mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:items-end lg:gap-12 lg:pt-24 lg:pb-28"
	>
		<div class="hq-rise max-w-xl">
			<p
				class="font-display text-5xl leading-[0.95] font-semibold tracking-tight text-hq-ink sm:text-6xl lg:text-7xl"
			>
				Headquarters
			</p>
			<h1 class="mt-6 text-2xl leading-snug font-medium text-hq-ink sm:text-3xl">
				Your business, one dashboard — not twelve tabs.
			</h1>
			<p class="text-hq-muted mt-4 max-w-md text-lg leading-relaxed">
				Built for founders, freelancers, and small teams who sell, chase, and deliver themselves.
				Pipeline, inbox, invoices, and tasks in one place.
			</p>
			<div class="mt-8 flex flex-wrap items-center gap-3">
				<Button
					href={appSignupUrl}
					size="lg"
					class="bg-hq-accent-strong text-white hover:bg-hq-accent rounded-full px-6"
				>
					Sign up
				</Button>
				<Button
					href={appLoginUrl}
					variant="outline"
					size="lg"
					class="border-hq-ink/20 text-hq-ink hover:bg-hq-paper-deep rounded-full px-6"
				>
					Log in
				</Button>
				<a
					href="#pricing"
					class="text-hq-muted hover:text-hq-ink text-sm font-medium underline-offset-4 hover:underline"
				>
					See pricing
				</a>
			</div>
		</div>

		<div class="hq-rise-delay min-w-0">
			<ProductFrame title="Home · Today" class="min-h-[560px]" floatPhase={0}>
				<DashboardDemo />
			</ProductFrame>
			<p class="text-hq-muted mt-4 text-center text-xs sm:text-left">
				Click tasks to tick them off — same home view you’d open every morning at
				{appHost}.
			</p>
		</div>
	</div>
</section>
