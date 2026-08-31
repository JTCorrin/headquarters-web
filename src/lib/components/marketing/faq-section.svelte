<script lang="ts">
	import { resolve } from '$app/paths';

	const faqs = [
		{
			q: 'Is this for big sales teams?',
			a: 'No — it’s aimed at founders, freelancers, and small teams who wear every hat. You get CRM, email, money, and automations without enterprise ceremony.'
		},
		{
			q: 'What’s free vs paid?',
			a: 'Self-host is free and source-available under Elastic License 2.0. Hosted is £10 per license / month with 3 seats included, then £3 per extra seat.',
			showDocsLink: true,
			docsLabel: 'Read the self-host guide'
		},
		{
			q: 'Do I need Microsoft or Google for email?',
			a: 'Outlook and Gmail connect with modern OAuth. Custom IMAP/SMTP still works with app passwords if that’s your setup.'
		},
		{
			q: 'What’s a playbook?',
			a: 'A visual automation — triggers, waits, emails, tasks, notes — so follow-ups don’t live only in your head when you’re heads-down delivering.'
		},
		{
			q: 'Can AI agents use Headquarters?',
			a: 'Yes. An org-scoped MCP server at /api/v1/mcp lets agents in Cursor, Claude Desktop, Buzz, and similar hosts work contacts, pipeline, projects, quotes, invoices, and payments with the same API-key permissions as scripts.'
		},
		{
			q: 'Can I start alone and add seats later?',
			a: 'Yes. Hosted includes three seats; add people at £3 each when you’re ready. Self-host has no seat meter on your own infra.'
		}
	];

	let openId = $state(0);
</script>

<section id="faq" class="scroll-mt-20 border-hq-line border-t bg-hq-paper-deep/20 py-20 sm:py-28">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
		<div>
			<p class="text-hq-accent-strong text-xs font-semibold tracking-[0.18em] uppercase">FAQ</p>
			<h2 class="font-display text-hq-ink mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
				Straight answers.
			</h2>
		</div>
		<div class="divide-hq-line divide-y border-hq-line border-y">
			{#each faqs as faq, i (faq.q)}
				<details
					class="group py-4"
					open={openId === i}
					ontoggle={(e) => {
						if ((e.currentTarget as HTMLDetailsElement).open) openId = i;
					}}
				>
					<summary
						class="font-display text-hq-ink cursor-pointer list-none text-lg font-semibold tracking-tight marker:content-none [&::-webkit-details-marker]:hidden"
					>
						{faq.q}
					</summary>
					<p class="text-hq-muted mt-2 max-w-2xl leading-relaxed">{faq.a}</p>
					{#if 'showDocsLink' in faq && faq.showDocsLink}
						<p class="mt-2">
							<a
								href={resolve('/docs')}
								class="text-hq-accent-strong text-sm font-medium underline-offset-4 hover:underline"
								>{faq.docsLabel}</a
							>
						</p>
					{/if}
				</details>
			{/each}
		</div>
	</div>
</section>
