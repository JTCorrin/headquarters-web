# Headquarters (marketing)

Public marketing site for **Headquarters** — the CRM command room.

## Stack

- SvelteKit 2 + Svelte 5 + Vite 8
- Tailwind CSS 4 + shadcn-svelte (luma / neutral)
- zod + sveltekit-superforms (ready for forms phase)
- `@xyflow/svelte` for the interactive playbook demo

## Develop

```sh
pnpm install
pnpm dev
```

```sh
pnpm build
pnpm preview
```

Static adapter (`@sveltejs/adapter-static`) with prerendered routes.

## Design

- **Marketing chrome:** Syne (display) + Source Sans 3, warm paper / ink / teal accent (`src/routes/layout.css`)
- **Product demos:** Inter + neutral tokens scoped under `.product-demo`

## Product demos

Interactive UI under `src/lib/product-demos/`:

| Demo | Path |
|------|------|
| Playbook graph | `playbook/PlaybookDemo.svelte` (ported from CRM canvas) |
| Pipeline | `pipeline/PipelineDemo.svelte` |
| Email + AI draft | `email/EmailDemo.svelte` |
| Campaigns / mail-shots | `campaigns/CampaignDemo.svelte` |
| Timeline | `timeline/TimelineDemo.svelte` |
| Quotes / invoices | `money/QuoteInvoiceDemo.svelte` |

To refresh the playbook canvas from the CRM app, copy from `crm-project`:

- `src/lib/components/crm/playbook-workflow-canvas.svelte`
- `src/lib/components/crm/playbook-nodes/*`
- `src/lib/playbook/*`
- `src/lib/schemas/playbook-graph.ts`

…into `src/lib/product-demos/playbook/` and re-point imports (see existing relative paths).

## Pricing (marketing copy)

- **Self-host** — free, source-available (Elastic License 2.0) → `/docs`
- **Hosted** — £10 / license / month (3 seats included, £3 / seat after) → Stripe Checkout via billing API

**Product app** (login / signup / CRM): https://app.headquarters-crm.com

Set `PUBLIC_BILLING_API_URL` (see `.env.example`) to the Railway `headquarters-billing` origin.
Stripe catalog lives on the **Corrin AI** Stripe account (`Headquarters Hosted` / `hq_hosted_monthly`).
