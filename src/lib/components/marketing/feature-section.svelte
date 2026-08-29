<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	interface Props {
		id: string;
		eyebrow: string;
		title: string;
		body: string;
		reverse?: boolean;
		demo: Snippet;
	}

	let { id, eyebrow, title, body, reverse = false, demo }: Props = $props();
</script>

<section {id} class="scroll-mt-20 py-20 sm:py-28">
	<div
		class={cn(
			'mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-14',
			reverse && 'lg:[&>*:first-child]:order-2'
		)}
	>
		<div class="hq-rise max-w-md">
			<p class="text-hq-accent-strong text-xs font-semibold tracking-[0.18em] uppercase">
				{eyebrow}
			</p>
			<h2 class="font-display text-hq-ink mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
				{title}
			</h2>
			<p class="text-hq-muted mt-4 text-lg leading-relaxed">{body}</p>
		</div>
		<div class="hq-rise-delay min-w-0">
			{@render demo()}
		</div>
	</div>
</section>
