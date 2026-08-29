<script lang="ts">
	import { cn } from '$lib/utils.js';

	type Stage = 'new' | 'qualified' | 'proposal' | 'won';

	type Lead = {
		id: string;
		name: string;
		company: string;
		value: string;
		owner: string;
		stage: Stage;
	};

	const stages: { id: Stage; label: string }[] = [
		{ id: 'new', label: 'New' },
		{ id: 'qualified', label: 'Qualified' },
		{ id: 'proposal', label: 'Proposal' },
		{ id: 'won', label: 'Won' }
	];

	let leads = $state<Lead[]>([
		{
			id: '1',
			name: 'Contoso expansion',
			company: 'Contoso',
			value: '£18,000',
			owner: 'Joe',
			stage: 'new'
		},
		{
			id: '2',
			name: 'Fabrikam pilot',
			company: 'Fabrikam',
			value: '£6,500',
			owner: 'Maya',
			stage: 'qualified'
		},
		{
			id: '3',
			name: 'Litware retainer',
			company: 'Litware',
			value: '£4,200',
			owner: 'Joe',
			stage: 'proposal'
		},
		{
			id: '4',
			name: 'Northwind upsell',
			company: 'Northwind',
			value: '£9,000',
			owner: 'Maya',
			stage: 'won'
		},
		{
			id: '5',
			name: 'Adventure Works site',
			company: 'Adventure Works',
			value: '£12,400',
			owner: 'Joe',
			stage: 'qualified'
		},
		{
			id: '6',
			name: 'Tailspin discovery',
			company: 'Tailspin',
			value: '£3,100',
			owner: 'Maya',
			stage: 'new'
		}
	]);

	let selectedId = $state<string | null>('2');
	let draggingId = $state<string | null>(null);

	function onDragStart(id: string, e: DragEvent) {
		draggingId = id;
		e.dataTransfer?.setData('text/plain', id);
		if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
	}

	function onDrop(stage: Stage, e: DragEvent) {
		e.preventDefault();
		const id = e.dataTransfer?.getData('text/plain') || draggingId;
		draggingId = null;
		if (!id) return;
		leads = leads.map((l) => (l.id === id ? { ...l, stage } : l));
		selectedId = id;
	}
</script>

<div class="flex h-[520px] gap-3 overflow-x-auto bg-muted/20 p-3 sm:h-[560px]">
	{#each stages as stage (stage.id)}
		{@const columnLeads = leads.filter((l) => l.stage === stage.id)}
		<div
			aria-label="{stage.label} stage"
			class="bg-background flex w-56 shrink-0 flex-col rounded-lg border"
			ondragover={(e) => e.preventDefault()}
			ondrop={(e) => onDrop(stage.id, e)}
			role="group"
		>
			<header class="flex items-center justify-between border-b px-3 py-2">
				<span class="text-xs font-medium tracking-wide uppercase">{stage.label}</span>
				<span class="text-muted-foreground text-xs">{columnLeads.length}</span>
			</header>
			<ul class="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
				{#each columnLeads as lead (lead.id)}
					<li>
						<button
							type="button"
							draggable="true"
							ondragstart={(e) => onDragStart(lead.id, e)}
							ondragend={() => (draggingId = null)}
							onclick={() => (selectedId = lead.id)}
							class={cn(
								'w-full cursor-grab rounded-md border bg-card p-2.5 text-left shadow-sm transition active:cursor-grabbing',
								selectedId === lead.id
									? 'border-foreground/30 ring-1 ring-foreground/15'
									: 'hover:border-foreground/20'
							)}
						>
							<p class="text-sm font-medium leading-snug">{lead.name}</p>
							<p class="text-muted-foreground mt-0.5 text-xs">{lead.company}</p>
							<div class="mt-2 flex items-center justify-between text-xs">
								<span class="font-medium">{lead.value}</span>
								<span class="text-muted-foreground">{lead.owner}</span>
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
