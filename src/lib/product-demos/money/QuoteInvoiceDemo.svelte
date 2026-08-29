<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils.js';

	type Doc = {
		id: string;
		kind: 'quote' | 'invoice';
		number: string;
		client: string;
		status: string;
		total: string;
		lines: { desc: string; amount: string }[];
	};

	const docs: Doc[] = [
		{
			id: 'q1',
			kind: 'quote',
			number: 'Q-2081',
			client: 'Contoso',
			status: 'Sent',
			total: '£18,000',
			lines: [
				{ desc: 'Discovery & design', amount: '£4,500' },
				{ desc: 'Implementation', amount: '£11,000' },
				{ desc: 'Training', amount: '£2,500' }
			]
		},
		{
			id: 'q2',
			kind: 'quote',
			number: 'Q-2074',
			client: 'Tailspin',
			status: 'Draft',
			total: '£3,100',
			lines: [{ desc: 'Discovery workshop', amount: '£3,100' }]
		},
		{
			id: 'i1',
			kind: 'invoice',
			number: 'INV-1042',
			client: 'Fabrikam',
			status: 'Overdue',
			total: '£6,500',
			lines: [
				{ desc: 'Pilot build', amount: '£5,000' },
				{ desc: 'Support (month 1)', amount: '£1,500' }
			]
		},
		{
			id: 'i2',
			kind: 'invoice',
			number: 'INV-1038',
			client: 'Litware',
			status: 'Paid',
			total: '£4,200',
			lines: [{ desc: 'Monthly retainer', amount: '£4,200' }]
		}
	];

	let selectedId = $state('i1');
	const selected = $derived(docs.find((d) => d.id === selectedId) ?? docs[0]!);
</script>

<div class="grid h-[520px] grid-cols-1 md:grid-cols-[220px_1fr] sm:h-[560px]">
	<ul class="border-border divide-border divide-y overflow-y-auto border-r">
		{#each docs as doc (doc.id)}
			<li>
				<button
					type="button"
					onclick={() => (selectedId = doc.id)}
					class={cn(
						'w-full px-3 py-2.5 text-left',
						selectedId === doc.id ? 'bg-muted' : 'hover:bg-muted/50'
					)}
				>
					<p class="text-xs font-medium tracking-wide uppercase">{doc.kind}</p>
					<p class="text-sm font-medium">{doc.number}</p>
					<p class="text-muted-foreground text-xs">{doc.client} · {doc.total}</p>
				</button>
			</li>
		{/each}
	</ul>

	<div class="flex flex-col p-4">
		<div class="flex items-start justify-between gap-3">
			<div>
				<p class="text-muted-foreground text-xs tracking-wide uppercase">{selected.kind}</p>
				<h4 class="text-lg font-semibold tracking-tight">{selected.number}</h4>
				<p class="text-muted-foreground text-sm">{selected.client}</p>
			</div>
			<Badge variant="secondary">{selected.status}</Badge>
		</div>

		<table class="mt-4 w-full text-sm">
			<thead>
				<tr class="text-muted-foreground border-b text-left text-xs">
					<th class="py-2 font-medium">Description</th>
					<th class="py-2 text-right font-medium">Amount</th>
				</tr>
			</thead>
			<tbody>
				{#each selected.lines as line (line.desc)}
					<tr class="border-b border-border/70">
						<td class="py-2.5">{line.desc}</td>
						<td class="py-2.5 text-right tabular-nums">{line.amount}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td class="pt-3 font-medium">Total</td>
					<td class="pt-3 text-right font-semibold tabular-nums">{selected.total}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
