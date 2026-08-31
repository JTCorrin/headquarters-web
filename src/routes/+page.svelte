<script lang="ts">
	import HeroSection from '$lib/components/marketing/hero-section.svelte';
	import SocialProof from '$lib/components/marketing/social-proof.svelte';
	import FeatureSection from '$lib/components/marketing/feature-section.svelte';
	import HowItWorks from '$lib/components/marketing/how-it-works.svelte';
	import PricingSection from '$lib/components/marketing/pricing-section.svelte';
	import FaqSection from '$lib/components/marketing/faq-section.svelte';
	import FinalCta from '$lib/components/marketing/final-cta.svelte';
	import ProductFrame from '$lib/product-demos/ProductFrame.svelte';
	import PlaybookDemo from '$lib/product-demos/playbook/PlaybookDemo.svelte';
	import PipelineDemo from '$lib/product-demos/pipeline/PipelineDemo.svelte';
	import EmailDemo from '$lib/product-demos/email/EmailDemo.svelte';
	import TimelineDemo from '$lib/product-demos/timeline/TimelineDemo.svelte';
	import QuoteInvoiceDemo from '$lib/product-demos/money/QuoteInvoiceDemo.svelte';
	import McpDemo from '$lib/product-demos/mcp/McpDemo.svelte';
</script>

<HeroSection />
<SocialProof />

<FeatureSection
	id="playbooks"
	eyebrow="Playbooks"
	title="Automate the chase so you can stay in the work."
	body="When you’re the sales team and the delivery team, follow-ups slip. Wire waits, emails, and tasks once — Headquarters runs them."
>
	{#snippet demo()}
		<ProductFrame title="Playbooks · Invoice chase" floatPhase={1}>
			<div class="p-2">
				<PlaybookDemo />
			</div>
		</ProductFrame>
	{/snippet}
</FeatureSection>

<FeatureSection
	id="pipeline"
	eyebrow="Pipeline"
	title="See every deal without a spreadsheet ritual."
	body="Drag stages, keep values visible, and convert wins to clients when the work gets real — built for one person or a tiny crew."
	reverse
>
	{#snippet demo()}
		<ProductFrame title="Leads" floatPhase={2}>
			<PipelineDemo />
		</ProductFrame>
	{/snippet}
</FeatureSection>

<FeatureSection
	id="email"
	eyebrow="Email"
	title="Client email that stays on the record."
	body="Stop digging through a personal inbox for “what did we promise?” Threads sit on the contact — with AI drafts when you’re buried."
>
	{#snippet demo()}
		<ProductFrame title="Email" floatPhase={0}>
			<EmailDemo />
		</ProductFrame>
	{/snippet}
</FeatureSection>

<FeatureSection
	id="timeline"
	eyebrow="Timeline"
	title="Catch up in one scroll."
	body="Notes, emails, payments, and meetings in order — so you (or a new hire) can reopen a client without archaeology."
	reverse
>
	{#snippet demo()}
		<ProductFrame title="Contoso · Timeline" floatPhase={1}>
			<TimelineDemo />
		</ProductFrame>
	{/snippet}
</FeatureSection>

<FeatureSection
	id="money"
	eyebrow="Quotes & invoices"
	title="Quote today. Get paid without another tool."
	body="Send the quote, raise the invoice, chase the balance — same HQ as the relationship. No handoff to a separate billing tab."
>
	{#snippet demo()}
		<ProductFrame title="Invoices" floatPhase={2}>
			<QuoteInvoiceDemo />
		</ProductFrame>
	{/snippet}
</FeatureSection>

<FeatureSection
	id="mcp"
	eyebrow="MCP · Agents"
	title="Let your AI agent work the CRM — not just talk about it."
	body="Headquarters ships a Model Context Protocol server. Paste an org API key into Cursor, Claude Desktop, or Buzz and agents can create contacts, chase leads, send invoices, and log payments with the same permissions as the product API."
	reverse
>
	{#snippet demo()}
		<ProductFrame title="MCP · headquarters-crm" floatPhase={0}>
			<McpDemo />
		</ProductFrame>
	{/snippet}
</FeatureSection>

<HowItWorks />
<PricingSection />
<FaqSection />
<FinalCta />
