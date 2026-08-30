<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteFooter from '$lib/components/marketing/site-footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
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
