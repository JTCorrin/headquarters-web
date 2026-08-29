import type { Edge, Node } from '@xyflow/svelte';
import { playbookGraphToFlow } from './playbook-flow.js';
import type { PlaybookGraph } from './playbook-graph-schema.js';

const DEMO_GRAPH: PlaybookGraph = {
	nodes: [
		{
			id: 'demo-trigger',
			type: 'trigger',
			position: { x: 40, y: 200 },
			data: {
				kind: 'invoice.outstanding_days',
				config: { days: 7, basis: 'due_on' }
			}
		},
		{
			id: 'demo-wait',
			type: 'wait',
			position: { x: 320, y: 200 },
			data: { duration: 3, unit: 'days' }
		},
		{
			id: 'demo-email',
			type: 'emailSend',
			position: { x: 600, y: 200 },
			data: {
				templateId: 'invoice-reminder',
				mailboxId: '',
				to: 'entity_primary'
			}
		},
		{
			id: 'demo-task',
			type: 'taskCreate',
			position: { x: 880, y: 200 },
			data: {
				title: 'Follow up on overdue invoice',
				description: 'Call client if no payment received',
				assigneeMembershipId: '',
				priority: 'p2',
				dueOffsetDays: 2
			}
		},
		{
			id: 'demo-note',
			type: 'timelineNote',
			position: { x: 1160, y: 200 },
			data: {
				kind: 'note',
				body: 'Automated reminder sequence completed for this invoice.'
			}
		},
		{
			id: 'demo-stop',
			type: 'playbookStop',
			position: { x: 1440, y: 200 },
			data: { reason: 'Sequence finished' }
		}
	],
	edges: [
		{ id: 'demo-e1', source: 'demo-trigger', target: 'demo-wait' },
		{ id: 'demo-e2', source: 'demo-wait', target: 'demo-email' },
		{ id: 'demo-e3', source: 'demo-email', target: 'demo-task' },
		{ id: 'demo-e4', source: 'demo-task', target: 'demo-note' },
		{ id: 'demo-e5', source: 'demo-note', target: 'demo-stop' }
	]
};

/** Pre-built marketing demo flow: trigger → wait → email → task → note → stop. */
export function createMarketingPlaybookFlow(): { nodes: Node[]; edges: Edge[] } {
	return playbookGraphToFlow(DEMO_GRAPH);
}
