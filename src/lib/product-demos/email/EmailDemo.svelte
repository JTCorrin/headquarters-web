<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { cn } from '$lib/utils.js';

	type Tone = 'warm' | 'neutral' | 'firm';

	type Message = {
		id: string;
		from: string;
		subject: string;
		preview: string;
		body: string;
		when: string;
	};

	const messages: Message[] = [
		{
			id: '1',
			from: 'ava@contoso.com',
			subject: 'Re: Contoso expansion quote',
			preview: 'Thanks — can we tighten the timeline on phase two?',
			body: 'Hi Joe,\n\nThanks for sending the quote through. The scope looks right. Can we tighten the timeline on phase two by about two weeks?\n\nAva',
			when: '2h ago'
		},
		{
			id: '2',
			from: 'billing@fabrikam.io',
			subject: 'Invoice INV-1042 overdue',
			preview: 'Just checking in on the outstanding balance…',
			body: 'Hello,\n\nInvoice INV-1042 for £6,500 is now 14 days overdue. Please advise on payment timing.\n\nAccounts, Fabrikam',
			when: 'Yesterday'
		},
		{
			id: '3',
			from: 'sam@litware.co',
			subject: 'Kickoff notes',
			preview: 'Attached are notes from Monday’s call.',
			body: 'Joe — attached are notes from Monday’s call. Happy to convert the retainer once the SOW is signed.\n\nSam',
			when: 'Mon'
		},
		{
			id: '4',
			from: 'maya@northwind.ops',
			subject: 'Client intro: Tailspin',
			preview: 'Introducing you to Priya at Tailspin…',
			body: 'Looping you in with Priya at Tailspin. They’re looking for a discovery workshop next month.\n\nMaya',
			when: 'Sun'
		}
	];

	const drafts: Record<Tone, string> = {
		warm: 'Hi Ava — glad the scope feels right. Happy to pull phase two forward; I’ll send an updated timeline this afternoon.',
		neutral:
			'Hi Ava — we can bring phase two forward by two weeks. I’ll send a revised schedule today.',
		firm: 'Hi Ava — we can compress phase two by two weeks if sign-off lands this week. Revised timeline attached once confirmed.'
	};

	let selectedId = $state('1');
	let tone = $state<Tone>('warm');
	let reply = $state('');
	let suggestion = $state(drafts.warm);

	const selected = $derived(messages.find((m) => m.id === selectedId) ?? messages[0]!);

	function setTone(next: Tone) {
		tone = next;
		suggestion = drafts[next];
	}

	function useDraft() {
		reply = suggestion;
	}
</script>

<div class="grid h-[520px] grid-cols-1 md:grid-cols-[240px_1fr] sm:h-[560px]">
	<ul class="border-border divide-border divide-y overflow-y-auto border-r">
		{#each messages as msg (msg.id)}
			<li>
				<button
					type="button"
					onclick={() => (selectedId = msg.id)}
					class={cn(
						'w-full px-3 py-2.5 text-left transition',
						selectedId === msg.id ? 'bg-muted' : 'hover:bg-muted/50'
					)}
				>
					<div class="flex items-baseline justify-between gap-2">
						<span class="truncate text-xs font-medium">{msg.from}</span>
						<span class="text-muted-foreground shrink-0 text-[10px]">{msg.when}</span>
					</div>
					<p class="mt-0.5 truncate text-sm">{msg.subject}</p>
					<p class="text-muted-foreground mt-0.5 truncate text-xs">{msg.preview}</p>
				</button>
			</li>
		{/each}
	</ul>

	<div class="flex min-h-0 flex-col">
		<div class="border-border border-b px-4 py-3">
			<p class="text-sm font-medium">{selected.subject}</p>
			<p class="text-muted-foreground text-xs">{selected.from}</p>
		</div>
		<pre
			class="text-muted-foreground flex-1 overflow-y-auto px-4 py-3 font-sans text-sm leading-relaxed whitespace-pre-wrap">{selected.body}</pre
		>

		<div class="border-border space-y-2 border-t bg-muted/20 p-3">
			<div class="flex flex-wrap items-center gap-1.5">
				<span class="text-muted-foreground mr-1 text-xs">AI draft</span>
				{#each (['warm', 'neutral', 'firm'] as const) as t (t)}
					<Button
						type="button"
						size="xs"
						variant={tone === t ? 'default' : 'outline'}
						onclick={() => setTone(t)}
					>
						{t[0]!.toUpperCase() + t.slice(1)}
					</Button>
				{/each}
				<Button type="button" size="xs" variant="secondary" class="ml-auto" onclick={useDraft}>
					Use draft
				</Button>
			</div>
			<Textarea readonly value={suggestion} class="min-h-16 resize-none text-xs" />
			<Textarea
				bind:value={reply}
				placeholder="Reply…"
				class="min-h-16 resize-none text-sm"
			/>
		</div>
	</div>
</div>
