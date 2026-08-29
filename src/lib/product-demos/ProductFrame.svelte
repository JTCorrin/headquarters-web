<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		class?: string;
		/** Stagger float phase: 0 | 1 | 2 */
		floatPhase?: 0 | 1 | 2;
		children: Snippet;
	}

	let { title, class: className, floatPhase = 0, children }: Props = $props();
</script>

<div
	class={cn(
		'product-demo overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_18px_50px_-28px_rgba(15,23,28,0.45),0_8px_24px_-18px_rgba(15,23,28,0.28)]',
		floatPhase === 0 && 'hq-float',
		floatPhase === 1 && 'hq-float-delay',
		floatPhase === 2 && 'hq-float-delay-2',
		className
	)}
>
	{#if title}
		<header class="flex items-center border-b border-border/80 px-4 py-3">
			<p class="text-muted-foreground text-xs font-medium tracking-wide">{title}</p>
		</header>
	{/if}
	<div class="min-h-0">
		{@render children()}
	</div>
</div>
