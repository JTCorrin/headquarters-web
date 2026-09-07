<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	const canonical = $derived(`https://headquarters-crm.com${page.url.pathname}`);
	import favicon from '$lib/assets/favicon.svg';
	import SiteFooter from '$lib/components/marketing/site-footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content="Headquarters" />
	<meta property="og:title" content="Headquarters — CRM for founders and small teams" />
	<meta
		property="og:description"
		content="Pipeline, email, invoices and tasks in one place. Self-host Headquarters or choose the hosted plan for up to three people."
	/>
	<meta name="twitter:card" content="summary" />
	<link rel="icon" href={favicon} />
	<title>Headquarters — CRM for founders and small teams</title>
	<meta
		name="description"
		content="Source-available Headquarters for solopreneurs and small teams: pipeline, email, invoices, tasks, and playbook automations in one place."
	/>
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<main class="flex-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>
