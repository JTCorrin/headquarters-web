<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { cn } from '$lib/utils.js';

	type Kind = 'note' | 'email' | 'conversion' | 'payment' | 'meeting';

	type Event = {
		id: string;
		kind: Kind;
		title: string;
		body: string;
		when: string;
	};

	const accents: Record<Kind, string> = {
		note: 'bg-sky-500',
		email: 'bg-violet-500',
		conversion: 'bg-emerald-500',
		payment: 'bg-amber-500',
		meeting: 'bg-orange-500'
	};

	let events = $state<Event[]>([
		{
			id: '1',
			kind: 'meeting',
			title: 'Discovery call with Contoso',
			body: 'Scoped phase two timeline; Ava to confirm stakeholders.',
			when: 'Today · 10:00'
		},
		{
			id: '2',
			kind: 'email',
			title: 'Sent quote Q-2081',
			body: 'Proposal for Contoso expansion — £18,000.',
			when: 'Yesterday'
		},
		{
			id: '3',
			kind: 'note',
			title: 'Internal note',
			body: 'Prefer email follow-up over phone; billing contact is Ava.',
			when: 'Mon'
		},
		{
			id: '4',
			kind: 'conversion',
			title: 'Lead converted to client',
			body: 'Fabrikam pilot → Fabrikam Ltd.',
			when: 'Last week'
		},
		{
			id: '5',
			kind: 'payment',
			title: 'Payment received',
			body: 'INV-1038 · £4,200 · Litware retainer.',
			when: '12 Mar'
		},
		{
			id: '6',
			kind: 'email',
			title: 'Chase: INV-1042',
			body: 'Friendly reminder drafted and sent to Fabrikam billing.',
			when: '10 Mar'
		}
	]);

	let draft = $state('');

	function addNote() {
		const body = draft.trim();
		if (!body) return;
		events = [
			{
				id: crypto.randomUUID(),
				kind: 'note',
				title: 'Note',
				body,
				when: 'Just now'
			},
			...events
		];
		draft = '';
	}
</script>

<div class="flex h-[520px] flex-col gap-3 p-3 sm:h-[560px]">
	<form
		class="flex gap-2"
		onsubmit={(e) => {
			e.preventDefault();
			addNote();
		}}
	>
		<Textarea
			bind:value={draft}
			placeholder="Add a note to this timeline…"
			class="min-h-12 flex-1 resize-none text-sm"
		/>
		<Button type="submit" size="sm" class="self-end">Add</Button>
	</form>

	<ul class="flex flex-1 flex-col gap-2 overflow-y-auto">
		{#each events as event (event.id)}
			<li class="bg-card flex gap-3 rounded-lg border p-3 shadow-sm">
				<span class={cn('mt-1 h-8 w-1 shrink-0 rounded-full', accents[event.kind])}></span>
				<div class="min-w-0 flex-1">
					<div class="flex items-baseline justify-between gap-2">
						<p class="text-sm font-medium">{event.title}</p>
						<span class="text-muted-foreground shrink-0 text-[10px]">{event.when}</span>
					</div>
					<p class="text-muted-foreground mt-0.5 text-[10px] tracking-wide uppercase">
						{event.kind}
					</p>
					<p class="text-muted-foreground mt-1 text-sm leading-snug">{event.body}</p>
				</div>
			</li>
		{/each}
	</ul>
</div>
