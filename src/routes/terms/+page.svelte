<script lang="ts">
	import { resolve } from '$app/paths';
	import LegalPage from '$lib/components/marketing/legal-page.svelte';
	import { legal } from '$lib/marketing/legal.js';
</script>

<LegalPage
	title="Terms of service"
	description="The terms for using Headquarters Hosted, including subscriptions, your data, cancellation and support."
>
	<h2>1. The agreement</h2>
	<p>
		Headquarters Hosted is provided by {legal.operator}, at {legal.address} ("we", "us"). Contact us at
		<a href={`mailto:${legal.email}`}>{legal.email}</a>. These Terms apply when you purchase or use
		our hosted service. If you act for an organisation, you confirm you have authority to accept
		them on its behalf.
	</p>
	<p>
		The hosted service is intended for business and professional use by people aged 18 or over.
		These Terms do not remove rights or remedies that applicable law does not allow us to exclude.
		Our <a href={resolve('/privacy')}>Privacy notice</a> explains how information is handled.
	</p>

	<h2>2. Accounts and your organisation</h2>
	<p>
		Provide accurate account and billing information, keep your password and API keys secure, and
		tell us promptly about suspected unauthorised access. You are responsible for the users you
		invite, the permissions you grant, and actions carried out through integrations or agents you
		authorise.
	</p>
	<p>
		The initial hosted plan covers one organisation with up to three seats, including capacity
		reserved by pending invitations. Additional-seat purchases are not currently offered. The person
		who purchases the subscription controls its billing; changing the organisation owner in the app
		does not automatically transfer the Stripe subscription.
	</p>

	<h2>3. Subscription, price and payment</h2>
	<p>
		The current standard plan is £10 per organisation per month. The total, currency and any
		applicable taxes are shown at checkout before you pay. Your subscription renews monthly until
		canceled, and you authorise Stripe to collect recurring payments using your selected payment
		method.
	</p>
	<p>
		We may restrict hosted access if payment remains unpaid or the subscription ends. If a payment
		or signup link appears to be missing, use the email recovery option in the app or contact
		support before purchasing again.
	</p>
	<p>
		We will give existing customers at least 30 days' notice of a price increase. A new price
		applies no earlier than the next renewal after that notice period, and you can cancel before it
		applies.
	</p>

	<h2>4. Cancellation and refunds</h2>
	<p>
		You can cancel renewal through the app's Manage subscription link to the Stripe customer portal.
		Cancellation normally takes effect at the end of the period already paid for, and access
		continues until then unless another provision of these Terms permits suspension. You can also
		contact <a href={`mailto:${legal.email}`}>{legal.email}</a> for help with cancellation, invoices or
		payment recovery.
	</p>
	<p>
		Canceling does not automatically refund the current billing period. We do not normally provide
		prorated refunds for unused time or a change of mind. Contact us about duplicate charges,
		billing errors or a service problem; we will investigate and provide any refund required by law
		or otherwise agreed with you. This policy does not limit mandatory rights.
	</p>
	<p>
		Canceling a subscription does not automatically delete your data. Request any data copy you need
		before access ends. For help with export or permanent deletion, contact support from an
		authorised account.
	</p>

	<h2>5. Acceptable use</h2>
	<p>
		Use Headquarters lawfully and only with data and accounts you are authorised to access. You must
		not:
	</p>
	<ul>
		<li>
			send unlawful or unsolicited bulk messages, ignore unsubscribe requests, or use misleading
			sender identities;
		</li>
		<li>upload unlawful content, malware or material that infringes another person's rights;</li>
		<li>
			attempt to access another organisation's data, bypass access controls or subscription limits,
			or misuse credentials;
		</li>
		<li>
			disrupt the service, overload it through abusive automation, or use it to attack another
			system.
		</li>
	</ul>
	<p>
		You are responsible for the lawful basis, notices and permissions needed for your CRM records,
		connected mailboxes and campaigns. Do not use Headquarters to store payment-card security codes
		or data requiring a specialist regulated hosting arrangement we have not agreed to provide.
	</p>

	<h2>6. Your content and connected services</h2>
	<p>
		You retain ownership of your content. You grant us permission to host, copy, transmit and
		otherwise process it only as needed to provide, secure and support the service, follow your
		instructions and meet legal obligations. You confirm you have the rights needed to give those
		instructions.
	</p>
	<p>
		Mailbox, calendar, payment and AI integrations depend on third-party services and their terms.
		You are responsible for their accounts, fees and permissions. Review AI-generated drafts and
		automated actions before relying on them; outputs can be inaccurate. Headquarters does not
		provide accounting, legal or other professional advice.
	</p>

	<h2>7. Customer personal data</h2>
	<p>
		Where we process personal data in your CRM on your behalf, you are the controller (or a
		processor authorised by the controller) and we are your processor. The following processing
		terms form part of this agreement:
	</p>
	<ul>
		<li>
			<strong>Scope and instructions:</strong> processing lasts for the provision and wind-down of the
			service and covers storage, organisation, retrieval, transmission and deletion of the CRM information
			described in our Privacy notice. Data subjects include your users, prospects, contacts, customers,
			suppliers and correspondents. We process this data only on documented instructions, including your
			use of the service, unless law requires otherwise; we inform you of such a requirement unless prohibited.
		</li>
		<li>
			<strong>Confidentiality and security:</strong> we limit access to authorised people under confidentiality
			obligations and maintain technical and organisational measures appropriate to the risk, including
			access controls and protection of credentials. We will inform you if we believe an instruction infringes
			applicable data protection law.
		</li>
		<li>
			<strong>Providers:</strong> you authorise the service providers described in our Privacy notice
			as necessary to deliver the service. We require appropriate data protection obligations from subprocessors
			and remain responsible for their processing on our behalf. We will give notice of intended additions
			or replacements before they process customer data, so you can raise a reasonable data protection
			objection with support. We will work to resolve it; if we cannot, you may end the affected service
			and receive a refund for its unused prepaid period.
		</li>
		<li>
			<strong>Assistance:</strong> taking account of the processing and information available to us, we
			assist with individual rights requests, security obligations, breach notifications, impact assessments
			and regulator consultations. We notify you without undue delay after becoming aware of a personal
			data breach affecting your customer data.
		</li>
		<li>
			<strong>Demonstrating compliance:</strong> on request, we provide information reasonably needed
			to demonstrate these obligations and allow proportionate audits, including inspections, by you or
			an auditor you appoint, with arrangements that protect other customers' data and service security.
		</li>
		<li>
			<strong>End of service:</strong> at your choice we return or delete customer personal data after
			the service ends and delete existing copies unless retention is required by law. Contact support
			to arrange this. Backup copies are isolated from ordinary use and expire through the backup lifecycle;
			if restored for recovery, applicable deletion instructions are reapplied.
		</li>
		<li>
			<strong>Transfers:</strong> international transfers must be supported by the safeguards required
			by applicable data protection law. Contact support for the arrangements relevant to your organisation.
		</li>
	</ul>
	<p>
		These processing terms take priority over conflicting general terms for customer personal data.
		They do not cover our independent processing of account, billing and security information
		described in the Privacy notice.
	</p>

	<h2>8. Availability, support and backups</h2>
	<p>
		We aim to provide a reliable service and reasonable care in operating it. Maintenance, faults
		and third-party outages can cause interruptions. The standard plan does not include a guaranteed
		uptime percentage, response time or recovery time. Support is available at <a
			href={`mailto:${legal.email}`}>{legal.email}</a
		>.
	</p>
	<p>
		We use infrastructure-provider database backups for operational recovery. They are not a
		customer-controlled archive, do not guarantee restoration to any chosen moment and do not
		automatically include every uploaded file. Keep copies of records and files that are important
		to your business. Contact us promptly about accidental loss so we can assess available recovery
		options.
	</p>

	<h2>9. Suspension and ending the service</h2>
	<p>
		We may suspend access where reasonably necessary to address non-payment, a material breach, a
		security threat or a legal requirement. Where practical, we explain the reason and give you an
		opportunity to resolve it before suspension. Urgent risks may require immediate action.
	</p>
	<p>
		If we discontinue your paid service for reasons other than your breach, we will give reasonable
		notice, help you arrange a data copy and refund any prepaid period we cannot provide. Ending
		access does not remove payment obligations already incurred or the data protection obligations
		above.
	</p>

	<h2>10. Responsibility and liability</h2>
	<p>
		Nothing in these Terms excludes or limits liability for fraud, fraudulent misrepresentation,
		death or personal injury caused by negligence, or any other liability that cannot lawfully be
		excluded or limited.
	</p>
	<p>
		Subject to that protection and to the extent permitted by law, we are not liable for indirect or
		consequential losses, lost profits or lost business opportunities. Our total liability arising
		from the hosted service in any 12-month period is limited to the fees you paid or owe for that
		service during that period. These limits do not restrict any individual's rights against us
		under applicable data protection law.
	</p>

	<h2>11. Software and the source-available license</h2>
	<p>
		The Headquarters source code is available under the <a
			href="https://github.com/JTCorrin/Headquarters/blob/main/LICENSE">Elastic License 2.0</a
		>. Your rights to copy, modify, distribute or self-host that code are governed by that license.
		It is source-available software. A hosted subscription buys access to our operated service and
		does not change the code's license.
	</p>

	<h2>12. Changes and questions</h2>
	<p>
		We may update these Terms as the service develops. We will notify existing customers before a
		material change takes effect, normally at least 30 days in advance, except where a faster change
		is required by law or to address an urgent security issue. If you do not agree, you may cancel
		before the change takes effect; a change will not remove rights already accrued.
	</p>
	<p>
		Contact <a href={`mailto:${legal.email}`}>{legal.email}</a> about questions, complaints or a dispute.
		We will try to resolve it directly. Nothing in these Terms prevents either party from exercising rights
		or bringing proceedings available under applicable law.
	</p>
</LegalPage>
