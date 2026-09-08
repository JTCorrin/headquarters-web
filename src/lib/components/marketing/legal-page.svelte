<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import { legal } from '$lib/marketing/legal.js';
	let { title, description, children }: { title: string; description: string; children: Snippet } =
		$props();
</script>

<svelte:head>
	<title>{title} — Headquarters</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={`${title} — Headquarters`} />
	<meta property="og:description" content={description} />
</svelte:head>

<div class="border-b border-hq-line bg-hq-paper">
	<div
		class="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6"
	>
		<a href={resolve('/')} class="font-display text-lg font-semibold tracking-tight text-hq-ink"
			>Headquarters</a
		>
		<nav aria-label="Policy pages" class="flex gap-5 text-sm text-hq-muted">
			<a href={resolve('/privacy')} class="hover:text-hq-ink">Privacy</a>
			<a href={resolve('/terms')} class="hover:text-hq-ink">Terms</a>
			<a href={`mailto:${legal.email}`} class="hover:text-hq-ink">Support</a>
		</nav>
	</div>
</div>
<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
	<header class="mb-10">
		<p class="text-xs font-semibold tracking-[0.18em] text-hq-accent-strong uppercase">
			Headquarters hosted
		</p>
		<h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-hq-ink sm:text-5xl">
			{title}
		</h1>
		<p class="mt-4 text-lg leading-relaxed text-hq-muted">{description}</p>
		<p class="mt-4 text-sm text-hq-muted">Last updated: {legal.updated}</p>
	</header>
	<article
		class="prose max-w-none prose-neutral prose-headings:font-display prose-headings:tracking-tight prose-headings:text-hq-ink prose-p:text-hq-muted prose-a:text-hq-accent-strong prose-strong:text-hq-ink prose-li:text-hq-muted"
	>
		{@render children()}
	</article>
</div>
