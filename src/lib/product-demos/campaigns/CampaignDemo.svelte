<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	type EntityType = 'lead' | 'contact' | 'client';

	type Person = {
		id: string;
		name: string;
		email: string;
		entity: EntityType;
		tags: string[];
	};

	const tags = [
		{ id: 'pilot', label: 'Pilot' },
		{ id: 'newsletter', label: 'Newsletter' },
		{ id: 'vip', label: 'VIP' },
		{ id: 'overdue', label: 'Overdue' }
	] as const;

	const people: Person[] = [
		{
			id: '1',
			name: 'Ava Chen',
			email: 'ava@contoso.com',
			entity: 'client',
			tags: ['pilot', 'vip']
		},
		{
			id: '2',
			name: 'Sam Rivera',
			email: 'sam@litware.co',
			entity: 'contact',
			tags: ['newsletter']
		},
		{
			id: '3',
			name: 'Priya Nair',
			email: 'priya@tailspin.io',
			entity: 'lead',
			tags: ['pilot', 'newsletter']
		},
		{
			id: '4',
			name: 'Billing · Fabrikam',
			email: 'billing@fabrikam.io',
			entity: 'client',
			tags: ['overdue']
		},
		{
			id: '5',
			name: 'Maya Ortiz',
			email: 'maya@northwind.ops',
			entity: 'contact',
			tags: ['vip', 'newsletter']
		},
		{
			id: '6',
			name: 'Jordan Lee',
			email: 'jordan@adventure.works',
			entity: 'lead',
			tags: ['pilot']
		},
		{
			id: '7',
			name: 'No email lead',
			email: '',
			entity: 'lead',
			tags: ['newsletter']
		}
	];

	const templates = [
		{ id: 'spring', name: 'Spring outreach', subject: 'Quick check-in from {{contact.name}}' },
		{ id: 'pilot', name: 'Pilot follow-up', subject: 'How did the pilot land?' },
		{ id: 'chase', name: 'Invoice soft chase', subject: 'Friendly nudge on INV-1042' }
	] as const;

	const entityOptions: { value: EntityType; label: string }[] = [
		{ value: 'lead', label: 'Leads' },
		{ value: 'contact', label: 'Contacts' },
		{ value: 'client', label: 'Clients' }
	];

	let selectedTags = $state<string[]>(['pilot', 'newsletter']);
	let entityTypes = $state<EntityType[]>(['lead', 'contact', 'client']);
	let templateId = $state<(typeof templates)[number]['id']>('spring');
	let phase = $state<'draft' | 'sending' | 'done'>('draft');
	let sentCount = $state(0);

	const selectedTemplate = $derived(templates.find((t) => t.id === templateId) ?? templates[0]!);

	const audience = $derived.by(() => {
		const matched = people.filter(
			(p) =>
				entityTypes.includes(p.entity) &&
				selectedTags.length > 0 &&
				selectedTags.some((tag) => p.tags.includes(tag))
		);
		const sendable = matched.filter((p) => p.email.length > 0);
		const skipped = matched.length - sendable.length;
		return { matched, sendable, skipped, total: matched.length };
	});

	function toggleTag(id: string) {
		if (phase !== 'draft') return;
		selectedTags = selectedTags.includes(id)
			? selectedTags.filter((tag) => tag !== id)
			: [...selectedTags, id];
	}

	function toggleEntity(value: EntityType) {
		if (phase !== 'draft') return;
		if (entityTypes.includes(value)) {
			if (entityTypes.length <= 1) return;
			entityTypes = entityTypes.filter((type) => type !== value);
			return;
		}
		entityTypes = [...entityTypes, value];
	}

	function launch() {
		if (phase !== 'draft' || audience.sendable.length === 0 || selectedTags.length === 0) return;
		phase = 'sending';
		sentCount = 0;
		const total = audience.sendable.length;
		const tick = () => {
			sentCount += 1;
			if (sentCount >= total) {
				phase = 'done';
				return;
			}
			setTimeout(tick, 220);
		};
		setTimeout(tick, 280);
	}

	function reset() {
		phase = 'draft';
		sentCount = 0;
	}
</script>

<div class="grid min-h-[520px] grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:min-h-[560px]">
	<div class="flex min-h-0 flex-col border-border border-b md:border-r md:border-b-0">
		<div class="border-border flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
			<div>
				<p class="text-sm font-medium">Spring outreach</p>
				<p class="text-muted-foreground text-xs">Draft · from Joe &lt;joe@hq.example&gt;</p>
			</div>
			{#if phase === 'draft'}
				<Button
					type="button"
					size="sm"
					disabled={selectedTags.length === 0 || audience.sendable.length === 0}
					onclick={launch}
				>
					Launch now
				</Button>
			{:else if phase === 'sending'}
				<span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sending…</span>
			{:else}
				<div class="flex items-center gap-2">
					<Badge variant="secondary">Completed</Badge>
					<Button type="button" size="xs" variant="outline" onclick={reset}>Reset</Button>
				</div>
			{/if}
		</div>

		<div class="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Template</p>
				<div class="flex flex-wrap gap-1.5">
					{#each templates as template (template.id)}
						<button
							type="button"
							disabled={phase !== 'draft'}
							onclick={() => (templateId = template.id)}
							class={cn(
								'rounded-md border px-2.5 py-1.5 text-left text-xs transition',
								templateId === template.id
									? 'border-foreground/30 bg-muted'
									: 'border-border hover:bg-muted/50',
								phase !== 'draft' && 'opacity-60'
							)}
						>
							<span class="font-medium">{template.name}</span>
						</button>
					{/each}
				</div>
				<p class="text-muted-foreground text-xs">Subject: {selectedTemplate.subject}</p>
			</div>

			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Audience tags</p>
				<p class="text-muted-foreground text-[11px] leading-relaxed">
					Only tagged people are included — not everyone in the CRM.
				</p>
				<div class="flex flex-wrap gap-2">
					{#each tags as tag (tag.id)}
						<button
							type="button"
							disabled={phase !== 'draft'}
							onclick={() => toggleTag(tag.id)}
							class="rounded-full focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
						>
							<Badge variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}>
								{tag.label}
							</Badge>
						</button>
					{/each}
				</div>
			</div>

			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
					Among tagged, include
				</p>
				<div class="flex flex-wrap gap-4">
					{#each entityOptions as option (option.value)}
						<label class="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								class="size-3.5 rounded border"
								checked={entityTypes.includes(option.value)}
								disabled={phase !== 'draft'}
								onchange={() => toggleEntity(option.value)}
							/>
							{option.label}
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<aside class="bg-muted/20 flex min-h-0 flex-col">
		<div class="border-border border-b px-4 py-3">
			<p class="text-sm font-medium">Audience preview</p>
			<p class="text-muted-foreground text-xs">Resolved from tags · merge at send</p>
		</div>

		{#if selectedTags.length === 0}
			<p class="text-muted-foreground p-4 text-sm">Pick at least one tag to build an audience.</p>
		{:else}
			<dl class="border-border grid grid-cols-3 gap-2 border-b px-4 py-3 text-center">
				<div>
					<dt class="text-muted-foreground text-[10px] tracking-wide uppercase">Sendable</dt>
					<dd class="text-lg font-semibold tabular-nums">{audience.sendable.length}</dd>
				</div>
				<div>
					<dt class="text-muted-foreground text-[10px] tracking-wide uppercase">Skipped</dt>
					<dd class="text-lg font-semibold tabular-nums">{audience.skipped}</dd>
				</div>
				<div>
					<dt class="text-muted-foreground text-[10px] tracking-wide uppercase">
						{phase === 'draft' ? 'Quota' : 'Sent'}
					</dt>
					<dd class="text-lg font-semibold tabular-nums">
						{phase === 'draft' ? 480 : sentCount}
					</dd>
				</div>
			</dl>

			<ul class="divide-border flex-1 divide-y overflow-y-auto">
				{#each audience.matched as person (person.id)}
					{@const willSend = person.email.length > 0}
					{@const isSent =
						phase !== 'draft' &&
						willSend &&
						audience.sendable.findIndex((p) => p.id === person.id) < sentCount}
					<li class="flex items-start justify-between gap-2 px-4 py-2.5">
						<div class="min-w-0">
							<p class="truncate text-sm font-medium">{person.name}</p>
							<p class="text-muted-foreground truncate text-xs">
								{person.email || 'no email'} · {person.entity}
							</p>
						</div>
						{#if !willSend}
							<span class="text-muted-foreground shrink-0 text-[10px] uppercase">Skip</span>
						{:else if isSent}
							<span class="shrink-0 text-[10px] font-medium tracking-wide text-emerald-700 uppercase"
								>Sent</span
							>
						{:else if phase === 'sending'}
							<span class="text-muted-foreground shrink-0 text-[10px] uppercase">Queued</span>
						{:else}
							<span class="text-muted-foreground shrink-0 text-[10px] uppercase">Ready</span>
						{/if}
					</li>
				{:else}
					<li class="text-muted-foreground px-4 py-6 text-sm">No matches for these tags.</li>
				{/each}
			</ul>
		{/if}
	</aside>
</div>
