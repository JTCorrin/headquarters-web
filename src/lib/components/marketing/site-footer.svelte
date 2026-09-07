<script lang="ts">
	import { resolve } from '$app/paths';
	import { appLoginUrl } from '$lib/marketing/app.js';
</script>

<footer class="border-t border-hq-line bg-hq-ink text-hq-paper">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
		<div>
			<p class="font-display text-2xl font-semibold tracking-tight">Headquarters</p>
			<p class="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
				Source-available command room for founders and small teams — pipeline, inbox, mail-shots,
				money, and playbooks.
			</p>
		</div>
		<div>
			<p class="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">Product</p>
			<ul class="mt-3 space-y-2 text-sm text-white/75">
				<li><a href={resolve('/#playbooks')} class="hover:text-white">Playbooks</a></li>
				<li><a href={resolve('/#pipeline')} class="hover:text-white">Pipeline</a></li>
				<li><a href={resolve('/#campaigns')} class="hover:text-white">Mail-shots</a></li>
				<li><a href={resolve('/#mcp')} class="hover:text-white">MCP agents</a></li>
				<li><a href={resolve('/#pricing')} class="hover:text-white">Pricing</a></li>
				<li><a href={resolve('/docs')} class="hover:text-white">Docs</a></li>
			</ul>
		</div>
		<div>
			<p class="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">Company</p>
			<ul class="mt-3 space-y-2 text-sm text-white/75">
				<li><a href={resolve('/#pricing')} class="hover:text-white">Start hosted</a></li>
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external app origin -->
					<a href={appLoginUrl} class="hover:text-white">Log in</a>
				</li>
				<li>
					<a
						href="https://github.com/JTCorrin/Headquarters"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-white">GitHub</a
					>
				</li>
			</ul>
		</div>
		<div>
			<p class="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">Legal</p>
			<ul class="mt-3 space-y-2 text-sm text-white/75">
				<li><span class="text-white/40">Privacy — soon</span></li>
				<li><span class="text-white/40">Terms — soon</span></li>
			</ul>
		</div>
	</div>
	<div class="border-t border-white/10">
		<p class="mx-auto max-w-7xl px-4 py-5 text-xs text-hq-muted text-white/45 sm:px-6">
			© {new Date().getFullYear()} Headquarters. All rights reserved.
		</p>
	</div>
</footer>
