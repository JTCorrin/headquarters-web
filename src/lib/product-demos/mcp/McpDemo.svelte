<script lang="ts">
	const tools = [
		{ name: 'list_leads', domain: 'Pipeline' },
		{ name: 'create_task', domain: 'Tasks' },
		{ name: 'create_quote', domain: 'Quotes' },
		{ name: 'send_invoice', domain: 'Invoices' },
		{ name: 'create_payment', domain: 'Payments' },
		{ name: 'add_timeline_note', domain: 'Timeline' }
	] as const;

	const transcript = [
		{
			role: 'user' as const,
			text: 'Fabrikam went quiet after the pilot. Open the lead, assign Maya a follow-up, and draft an invoice for the remaining £2,400.'
		},
		{
			role: 'tool' as const,
			name: 'get_lead',
			detail: 'Fabrikam pilot · Qualified · £6,500'
		},
		{
			role: 'tool' as const,
			name: 'create_task',
			detail: 'Assignee Maya · Due Fri · “Chase Fabrikam remainder”'
		},
		{
			role: 'tool' as const,
			name: 'create_invoice',
			detail: 'INV-1042 · Contoso/Fabrikam · £2,400 · Draft'
		},
		{
			role: 'tool' as const,
			name: 'send_invoice',
			detail: 'Sent to billing@fabrikam.example'
		},
		{
			role: 'assistant' as const,
			text: 'Done. Lead is open, Maya owns the chase, and INV-1042 is in their inbox — same org rules as the UI.'
		}
	];
</script>

<div class="flex flex-col gap-3 bg-muted/20 p-3 sm:p-4 lg:flex-row lg:gap-4">
	<div class="bg-background flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border">
		<header class="border-border/80 flex items-center justify-between border-b px-3 py-2.5">
			<div>
				<p class="text-foreground text-xs font-semibold tracking-wide">Agent · Cursor</p>
				<p class="text-muted-foreground text-[11px]">Connected via MCP · headquarters-crm</p>
			</div>
			<span
				class="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-emerald-700 uppercase"
			>
				Live
			</span>
		</header>
		<div class="flex flex-1 flex-col gap-3 overflow-y-auto p-3">
			{#each transcript as turn, i (i)}
				{#if turn.role === 'user'}
					<div class="ml-6 rounded-lg bg-muted/60 px-3 py-2 text-sm leading-relaxed text-foreground">
						{turn.text}
					</div>
				{:else if turn.role === 'tool'}
					<div
						class="border-border/80 mr-4 rounded-lg border border-dashed bg-background px-3 py-2 font-mono text-[11px] leading-relaxed"
					>
						<p class="text-muted-foreground">
							<span class="text-foreground font-semibold">tools/call</span>
							· {turn.name}
						</p>
						<p class="text-muted-foreground mt-0.5">{turn.detail}</p>
					</div>
				{:else}
					<div
						class="border-border/80 mr-2 rounded-lg border bg-background px-3 py-2 text-sm leading-relaxed text-foreground"
					>
						{turn.text}
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<aside class="bg-background flex w-full shrink-0 flex-col rounded-lg border lg:w-52">
		<header class="border-border/80 border-b px-3 py-2.5">
			<p class="text-foreground text-xs font-semibold tracking-wide">Org tools</p>
			<p class="text-muted-foreground text-[11px]">API key scoped</p>
		</header>
		<ul class="flex flex-1 flex-col gap-1 p-2">
			{#each tools as tool (tool.name)}
				<li
					class="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[11px] hover:bg-muted/50"
				>
					<span class="font-mono text-foreground">{tool.name}</span>
					<span class="text-muted-foreground shrink-0">{tool.domain}</span>
				</li>
			{/each}
			<li class="text-muted-foreground px-2 py-1.5 text-[11px]">+ contacts, clients, projects…</li>
		</ul>
		<div class="border-border/80 border-t px-3 py-2.5">
			<p class="text-muted-foreground font-mono text-[10px] leading-relaxed break-all">
				POST /api/v1/mcp
			</p>
		</div>
	</aside>
</div>
