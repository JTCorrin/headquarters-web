<script lang="ts">
	import { browser } from '$app/environment';
	import type { Edge, Node } from '@xyflow/svelte';
	import { cn } from '$lib/utils.js';
	import PlaybookWorkflowCanvas from './playbook-workflow-canvas.svelte';
	import { createMarketingPlaybookFlow } from './seed-graph.js';

	interface Props {
		class?: string;
		compact?: boolean;
	}

	let { class: className, compact = false }: Props = $props();

	const seed = createMarketingPlaybookFlow();
	let nodes = $state<Node[]>(seed.nodes);
	let edges = $state<Edge[]>(seed.edges);
</script>

<div
	class={cn(
		'product-frame text-foreground w-full',
		className
	)}
>
	{#if browser}
		<PlaybookWorkflowCanvas bind:nodes bind:edges {compact} />
	{:else}
		<div
			class={cn(
				'bg-muted/30 w-full animate-pulse rounded-lg border',
				compact ? 'min-h-[360px]' : 'min-h-[520px]'
			)}
			aria-hidden="true"
		></div>
	{/if}
</div>
