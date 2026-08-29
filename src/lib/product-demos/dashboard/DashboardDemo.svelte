<script lang="ts">
	import { cn } from '$lib/utils.js';

	type Task = {
		id: string;
		title: string;
		relatedTo: string;
		dueOn: string;
		status: 'Open' | 'In progress' | 'Overdue' | 'Done';
		priority: string;
	};

	let tasks = $state<Task[]>([
		{
			id: '1',
			title: 'Send kickoff pack',
			relatedTo: 'Northwind',
			dueOn: 'Today',
			status: 'Open',
			priority: 'P1'
		},
		{
			id: '2',
			title: 'Chase overdue invoice INV-0883',
			relatedTo: 'Fabrikam',
			dueOn: 'Mar 10',
			status: 'Overdue',
			priority: 'P1'
		},
		{
			id: '3',
			title: 'Prep Q2 proposal',
			relatedTo: 'Contoso',
			dueOn: 'Mar 22',
			status: 'In progress',
			priority: 'P2'
		},
		{
			id: '4',
			title: 'Review meeting notes',
			relatedTo: 'Contoso',
			dueOn: 'Tomorrow',
			status: 'In progress',
			priority: 'P2'
		},
		{
			id: '5',
			title: 'Upload signed SOW',
			relatedTo: 'Northwind',
			dueOn: 'Mar 19',
			status: 'Open',
			priority: 'P3'
		}
	]);

	const stats = [
		{ label: 'Open leads', value: '8', hint: 'This week' },
		{ label: 'Pipeline', value: '£42k', hint: 'Active deals' },
		{ label: 'Unpaid', value: '£6.5k', hint: '1 overdue' },
		{ label: 'Open tasks', value: '', hint: 'Yours' }
	];

	const attention = [
		{ id: 'a1', label: 'INV-0883 overdue', detail: 'Fabrikam · £960 · 21 days', warn: true },
		{ id: 'a2', label: 'Q-0142 waiting reply', detail: 'Northwind · sent 5 days ago', warn: false },
		{ id: 'a3', label: 'Discovery call tomorrow', detail: 'Contoso · 10:00', warn: false }
	];

	const meetings = [
		{ id: 'm1', title: 'Q2 planning', when: 'Today · 15:00', withWhom: 'Ava · Northwind' },
		{ id: 'm2', title: 'Renewal check-in', when: 'Thu · 11:30', withWhom: 'Sam · Contoso' }
	];

	const activity = [
		{ id: 'e1', title: 'Quote sent', body: 'Q-2081 → Contoso', when: '2h' },
		{ id: 'e2', title: 'Lead won', body: 'Litware retainer', when: 'Yesterday' },
		{ id: 'e3', title: 'Note added', body: 'Prefer email over phone', when: 'Mon' }
	];

	const openCount = $derived(tasks.filter((t) => t.status !== 'Done').length);

	function toggleTask(id: string) {
		tasks = tasks.map((t) => {
			if (t.id !== id) return t;
			return { ...t, status: t.status === 'Done' ? 'Open' : 'Done' };
		});
	}

	function statusClass(status: Task['status']) {
		switch (status) {
			case 'Overdue':
				return 'text-destructive';
			case 'Done':
				return 'text-muted-foreground line-through';
			default:
				return 'text-foreground';
		}
	}
</script>

<div class="flex h-[520px] flex-col gap-4 overflow-auto bg-muted/15 p-4 sm:h-[560px]">
	<div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
		{#each stats as stat, i (stat.label)}
			<div class="bg-card rounded-lg border px-3 py-2.5 shadow-sm">
				<p class="text-muted-foreground text-[10px] tracking-wide uppercase">{stat.label}</p>
				<p class="mt-1 text-xl font-semibold tracking-tight tabular-nums">
					{i === 3 ? openCount : stat.value}
				</p>
				<p class="text-muted-foreground text-[11px]">{stat.hint}</p>
			</div>
		{/each}
	</div>

	<div class="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
		<section class="bg-card flex min-h-0 flex-col rounded-lg border shadow-sm">
			<header class="flex items-center justify-between border-b px-3 py-2.5">
				<h4 class="text-sm font-medium">My tasks</h4>
				<span class="text-muted-foreground text-xs">{openCount} open</span>
			</header>
			<ul class="divide-border flex-1 divide-y overflow-y-auto">
				{#each tasks as task (task.id)}
					<li>
						<button
							type="button"
							onclick={() => toggleTask(task.id)}
							class="hover:bg-muted/40 flex w-full items-start gap-3 px-3 py-2.5 text-left"
						>
							<span
								class={cn(
									'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border text-[10px]',
									task.status === 'Done' && 'bg-foreground text-background border-foreground'
								)}
								aria-hidden="true"
							>
								{task.status === 'Done' ? '✓' : ''}
							</span>
							<span class="min-w-0 flex-1">
								<span class={cn('block text-sm font-medium', statusClass(task.status))}
									>{task.title}</span
								>
								<span class="text-muted-foreground mt-0.5 block text-xs">
									{task.relatedTo} · {task.dueOn} · {task.priority}
								</span>
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</section>

		<div class="flex min-h-0 flex-col gap-4">
			<section class="bg-card rounded-lg border shadow-sm">
				<header class="border-b px-3 py-2.5">
					<h4 class="text-sm font-medium">Needs attention</h4>
				</header>
				<ul class="divide-border divide-y">
					{#each attention as item (item.id)}
						<li class="px-3 py-2.5">
							<p class={cn('text-sm font-medium', item.warn && 'text-destructive')}>{item.label}</p>
							<p class="text-muted-foreground text-xs">{item.detail}</p>
						</li>
					{/each}
				</ul>
			</section>

			<section class="bg-card min-h-0 flex-1 rounded-lg border shadow-sm">
				<header class="border-b px-3 py-2.5">
					<h4 class="text-sm font-medium">Upcoming</h4>
				</header>
				<ul class="divide-border divide-y">
					{#each meetings as m (m.id)}
						<li class="px-3 py-2.5">
							<p class="text-sm font-medium">{m.title}</p>
							<p class="text-muted-foreground text-xs">{m.when} · {m.withWhom}</p>
						</li>
					{/each}
					{#each activity as e (e.id)}
						<li class="px-3 py-2">
							<p class="text-sm">{e.title}</p>
							<p class="text-muted-foreground text-xs">{e.body} · {e.when}</p>
						</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
</div>
