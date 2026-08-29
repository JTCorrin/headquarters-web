<script lang="ts">
	import { Handle, Position, useSvelteFlow } from '@xyflow/svelte';
	import type { Node, NodeProps } from '@xyflow/svelte';

	/** Demo-only templates — no API or playbook context required. */
	const DEMO_TEMPLATES = [
		{ id: 'invoice-reminder', name: 'Invoice reminder' },
		{ id: 'payment-thank-you', name: 'Payment thank you' },
		{ id: 'welcome-follow-up', name: 'Welcome follow-up' }
	] as const;

	type EmailData = { templateId: string; mailboxId: string; to: string };
	type TSend = Node<EmailData, 'emailSend'>;
	let { id, data }: NodeProps<TSend> = $props();

	const { updateNodeData } = useSvelteFlow();
</script>

<Handle type="target" position={Position.Top} class="!bg-muted-foreground" />
<div
	class="border-border bg-card text-card-foreground min-w-[200px] max-w-[260px] rounded-lg border px-3 py-2 shadow-sm"
>
	<div class="mb-2 text-xs font-semibold tracking-wide uppercase">Send email</div>
	<select
		class="border-input bg-background nodrag nopan mb-2 w-full rounded border px-2 py-1 text-sm"
		value={data.templateId}
		onchange={(e) =>
			updateNodeData(id, { ...data, templateId: (e.target as HTMLSelectElement).value })}
	>
		<option value="">Select template…</option>
		{#each DEMO_TEMPLATES as t (t.id)}
			<option value={t.id}>{t.name}</option>
		{/each}
	</select>
	<select
		class="border-input bg-background nodrag nopan w-full rounded border px-2 py-1 text-sm"
		value={data.to}
		onchange={(e) => updateNodeData(id, { ...data, to: (e.target as HTMLSelectElement).value })}
	>
		<option value="entity_primary">Entity primary email</option>
		<option value="related_contact">Related contact</option>
	</select>
</div>
<Handle type="source" position={Position.Bottom} class="!bg-primary" />
