<script lang="ts">
	import { resolve } from '$app/paths';

	const githubRepo = 'https://github.com/JTCorrin/Headquarters';
	const githubLicense = `${githubRepo}/blob/main/LICENSE`;

	const toc = [
		{ id: 'prerequisites', label: 'Prerequisites' },
		{ id: 'quick-start', label: 'Quick start' },
		{ id: 'production', label: 'Production' },
		{ id: 'optional', label: 'Optional integrations' },
		{ id: 'license', label: 'License' },
		{ id: 'help', label: 'Help' }
	] as const;
</script>

<svelte:head>
	<title>Self-host Headquarters — Docs</title>
	<meta
		name="description"
		content="Step-by-step guide to self-host Headquarters: local quick start with Docker and Supabase, plus a production VPS deploy checklist."
	/>
</svelte:head>

<div class="border-hq-line border-b bg-hq-paper">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
		<a
			href={resolve('/')}
			class="font-display text-hq-ink text-lg font-semibold tracking-tight hover:opacity-80"
		>
			Headquarters
		</a>
		<span class="text-hq-muted text-sm font-medium tracking-wide uppercase">Docs</span>
	</div>
</div>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
	<nav
		aria-label="On this page"
		class="border-hq-line mb-10 rounded-xl border bg-card p-4 lg:sticky lg:top-6 lg:mb-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0"
	>
		<p class="text-hq-accent-strong text-xs font-semibold tracking-[0.16em] uppercase">On this page</p>
		<ul class="mt-3 space-y-2 text-sm">
			{#each toc as item (item.id)}
				<li>
					<a href={`#${item.id}`} class="text-hq-muted hover:text-hq-ink transition-colors"
						>{item.label}</a
					>
				</li>
			{/each}
		</ul>
	</nav>

	<article
		class="prose prose-neutral max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-hq-ink prose-p:text-hq-muted prose-li:text-hq-muted prose-strong:text-hq-ink prose-a:text-hq-accent-strong prose-code:text-hq-ink prose-pre:bg-hq-ink prose-pre:text-hq-paper"
	>
		<header class="not-prose mb-10">
			<p class="text-hq-accent-strong text-xs font-semibold tracking-[0.18em] uppercase">Docs</p>
			<h1 class="font-display text-hq-ink mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
				Self-host Headquarters
			</h1>
			<p class="text-hq-muted mt-4 max-w-2xl text-lg leading-relaxed">
				Run the full CRM on your own machine or VPS. Start locally in minutes, then harden for
				always-on production when you’re ready.
			</p>
		</header>

		<section id="prerequisites" class="scroll-mt-24">
			<h2>Prerequisites</h2>
			<p>Install these before you clone the repo:</p>
			<ul>
				<li>
					<a href="https://docs.docker.com/get-docker/" target="_blank" rel="noopener noreferrer"
						>Docker</a
					>
					(daemon running)
				</li>
				<li>
					<a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> 22+
				</li>
				<li>
					<a href="https://pnpm.io/" target="_blank" rel="noopener noreferrer">pnpm</a> 10 —
					<code>corepack enable && corepack prepare pnpm@10 --activate</code>
				</li>
				<li>
					<a
						href="https://supabase.com/docs/guides/cli/getting-started"
						target="_blank"
						rel="noopener noreferrer">Supabase CLI</a
					>
					~2.111
				</li>
			</ul>
		</section>

		<section id="quick-start" class="scroll-mt-24">
			<h2>Quick start</h2>
			<p>
				The fastest path is the bootstrap script. It starts the Supabase Docker stack, applies
				migrations, writes public env keys, serves the API, and runs the app.
			</p>

			<ol>
				<li>
					<strong>Clone the repo</strong>
					<pre><code>git clone https://github.com/JTCorrin/Headquarters.git
cd Headquarters</code></pre>
				</li>
				<li>
					<strong>Start the stack</strong>
					<pre><code>./scripts/dev-up.sh</code></pre>
					<p>
						Same as <code>pnpm dev:stack</code>. First run applies migrations. Use
						<code>pnpm dev:stack:reset</code> when you want a clean database.
					</p>
				</li>
				<li>
					<strong>Open the app</strong> at
					<a href="http://127.0.0.1:5173">http://127.0.0.1:5173</a>, sign up, and create an
					organisation through onboarding.
				</li>
			</ol>

			<p>Useful helpers:</p>
			<pre><code>./scripts/dev-status.sh   # URLs and public key summary
./scripts/dev-down.sh     # stop api-v1 serve + supabase stop</code></pre>

			<p>
				Backend only (no Vite): <code>./scripts/dev-up.sh --no-app</code>, then
				<code>pnpm dev</code> in another terminal.
			</p>

			<table>
				<thead>
					<tr>
						<th>Service</th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>App</td>
						<td><code>http://127.0.0.1:5173</code></td>
					</tr>
					<tr>
						<td>Supabase API</td>
						<td><code>http://127.0.0.1:54321</code></td>
					</tr>
					<tr>
						<td>Studio</td>
						<td><code>http://127.0.0.1:54323</code></td>
					</tr>
				</tbody>
			</table>
		</section>

		<section id="production" class="scroll-mt-24">
			<h2>Production (always-on VPS)</h2>
			<p>
				Self-hosting for real use means a durable host with Docker, Node 22+, pnpm, and the
				Supabase CLI — plus a reverse proxy with TLS in front of the Node app. There is no
				first-party Docker Compose file today; the app process is Node, and Supabase runs via the
				CLI’s Docker stack.
			</p>

			<ol>
				<li>
					<strong>Provision the host</strong> with Docker (daemon up), Node.js 22+, pnpm 10, Supabase
					CLI ~2.111, git, and a reverse proxy (Caddy, nginx, or Traefik).
				</li>
				<li>
					<strong>Clone and install</strong>
					<pre><code>git clone https://github.com/JTCorrin/Headquarters.git
cd Headquarters
pnpm install --frozen-lockfile</code></pre>
				</li>
				<li>
					<strong>Point Auth at your public origin</strong> in
					<code>supabase/config.toml</code>: set <code>site_url</code>,
					<code>additional_redirect_urls</code> (include
					<code>https://your.domain/auth/callback</code>), and ensure auth email/SMTP settings match
					how you want signup confirmation to work.
				</li>
				<li>
					<strong>Start Supabase and load edge secrets</strong>
					<pre><code>supabase start</code></pre>
					<p>
						Write <code>supabase/functions/.env</code> (Edge loads these on container create). At
						minimum pin CORS and cron secrets — generate strong random values and keep them offline:
					</p>
					<pre><code>API_CORS_ORIGIN=https://your.domain
APP_BASE_URL=https://your.domain
PUBLIC_SUPABASE_URL=https://supabase.your.domain
MAILBOX_SYNC_SECRET=…
RECURRING_INVOICES_CRON_SECRET=…
PLAYBOOKS_CRON_SECRET=…</code></pre>
					<p>
						<code>PUBLIC_SUPABASE_URL</code> here must be the <em>browser-reachable</em> Kong/API URL
						(not only loopback), so Auth and signed Storage URLs work for users. After writing
						<code>functions/.env</code>, bounce the stack with <code>supabase stop</code> then
						<code>supabase start</code> so Edge picks up secrets. Do not remove the edge-runtime
						container alone.
					</p>
				</li>
				<li>
					<strong>Configure the app <code>.env</code></strong>
					<pre><code>PUBLIC_SUPABASE_URL=https://supabase.your.domain
PUBLIC_SUPABASE_ANON_KEY=…   # from `supabase status`
PUBLIC_API_BASE_URL=         # leave empty — same-origin /api/v1 proxy
APP_BASE_URL=https://your.domain</code></pre>
					<p>
						Leave <code>PUBLIC_HOSTED_BILLING</code>, <code>PUBLIC_BILLING_API_URL</code>,
						<code>PUBLIC_LANDING_URL</code>, and <code>BILLING_CLAIM_SECRET</code> unset. Those are
						for the hosted SaaS product only.
					</p>
				</li>
				<li>
					<strong>Build and run the Node app</strong>
					<pre><code>pnpm build
pnpm start</code></pre>
					<p>
						<code>pnpm start</code> runs <code>node build/index.js</code> (adapter-node). Put it
						behind systemd (or similar) and reverse-proxy HTTPS to that process. Prefer empty
						<code>PUBLIC_API_BASE_URL</code> so browsers only call <code>/api/v1</code> on your app
						origin.
					</p>
				</li>
				<li>
					<strong>Schedule background jobs</strong> with host cron (or another scheduler). Hit the
					Edge function URLs with the matching secret headers — for example every minute for mailbox
					sync and every few minutes for recurring invoices and playbooks:
					<ul>
						<li>
							<code>mailbox-sync</code> — header <code>x-mailbox-sync-secret</code>
						</li>
						<li>
							<code>jobs-recurring-invoices</code> — header
							<code>x-recurring-invoices-cron-secret</code>
						</li>
						<li>
							<code>jobs-playbooks</code> — header <code>x-playbooks-cron-secret</code>
						</li>
					</ul>
					<p>
						Keep secrets out of process argv (use a small wrapper script that reads a file). Protect
						these endpoints with network isolation; they use shared secrets rather than end-user
						JWTs.
					</p>
				</li>
			</ol>

			<p>
				Core CRM works without OAuth or mailbox providers. Invite email goes through the inviter’s
				personal mailbox SMTP (Settings → Mail), not a platform SMTP env var.
			</p>
		</section>

		<section id="optional" class="scroll-mt-24">
			<h2>Optional integrations</h2>
			<p>
				Copy values into <code>.env</code> / edge env using the repo’s
				<a href={`${githubRepo}/blob/main/.env.example`} target="_blank" rel="noopener noreferrer"
					>.env.example</a
				>
				as the guide. Common optional pieces:
			</p>
			<ul>
				<li>Google / Azure login (Supabase Auth external providers + <code>config.toml</code>)</li>
				<li>Mailbox Microsoft / Google OAuth (separate from login)</li>
				<li>Google Calendar OAuth</li>
				<li>Cron secrets for mailbox sync, recurring invoices, and playbooks</li>
			</ul>
			<p>
				Bootstrap scripts do not overwrite secrets you have already set. Org AI providers use
				user-stored vault keys, not platform env vars.
			</p>
		</section>

		<section id="license" class="scroll-mt-24">
			<h2>License</h2>
			<p>
				Headquarters is <strong>source-available</strong> under the
				<a href={githubLicense} target="_blank" rel="noopener noreferrer">Elastic License 2.0</a>
				(not OSI “open source”).
			</p>
			<ul>
				<li>
					<strong>Allowed:</strong> use, modify, and self-host — including for your own internal
					business operations — as long as you keep copyright and license notices.
				</li>
				<li>
					<strong>Not allowed:</strong> offering Headquarters (or a substantial set of its features)
					to third parties as a hosted or managed service without a separate license.
				</li>
			</ul>
		</section>

		<section id="help" class="scroll-mt-24">
			<h2>Help</h2>
			<p>
				Source, issues, and deeper backend notes live in the
				<a href={githubRepo} target="_blank" rel="noopener noreferrer">GitHub repository</a>. Prefer
				issues for bugs and self-host snags so others can find the same fix.
			</p>
			<p>
				<a href={resolve('/#pricing')}>Compare self-host vs hosted pricing</a>
				·
				<a href={resolve('/')}>Back to Headquarters</a>
			</p>
		</section>
	</article>
</div>
