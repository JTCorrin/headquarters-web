<script lang="ts">
	import { resolve } from '$app/paths';
	import LegalPage from '$lib/components/marketing/legal-page.svelte';
	import { legal } from '$lib/marketing/legal.js';
</script>

<LegalPage
	title="Privacy notice"
	description="What information Headquarters uses, why we use it, and how to exercise your privacy rights."
>
	<h2>Who we are</h2>
	<p>
		Headquarters is operated by {legal.operator}, at {legal.address}. For privacy questions, access
		requests or deletion requests, email <a href={`mailto:${legal.email}`}>{legal.email}</a>.
	</p>
	<p>
		This notice covers our marketing website and hosted service. We are the controller for account
		administration, subscription billing, support and service security information. When an
		organisation stores its contacts, messages and other CRM records in Headquarters, that
		organisation normally controls the data and we process it on its instructions. Contact that
		organisation first about records it holds about you; we can help route a request.
	</p>
	<p>
		If you self-host the source-available software, your installation is controlled by its operator.
		This notice does not make us responsible for its data handling. Our <a href={resolve('/terms')}
			>Terms</a
		> explain the hosted service and customer responsibilities.
	</p>

	<h2>Information we use</h2>
	<ul>
		<li>
			<strong>Account and organisation information:</strong> your email, profile details, organisation
			name, membership and permissions, and authentication records. We receive these from you or the person
			inviting you.
		</li>
		<li>
			<strong>Subscription information:</strong> billing contact details, Stripe customer and subscription
			references, payment status and invoice records. Stripe collects and processes card details; Headquarters
			does not store full payment card numbers.
		</li>
		<li>
			<strong>CRM content:</strong> information you or your team enter, import or connect, such as contacts,
			leads, notes, messages, attachments, documents, financial records, tasks and activity history. This
			can include information about people who do not have a Headquarters account.
		</li>
		<li>
			<strong>Connected services:</strong> access tokens or credentials and the information needed for
			mailbox, calendar, AI or other integrations you enable. Mailbox features can process message content,
			recipients and attachments.
		</li>
		<li>
			<strong>Support and security information:</strong> correspondence you send us, IP addresses, browser
			and request information, timestamps, errors and authentication or audit events.
		</li>
	</ul>
	<p>
		An email address and the required account and payment information are necessary to provide the
		hosted service. Other content depends on the features you choose to use.
	</p>

	<h2>How and why we use information</h2>
	<ul>
		<li>
			<strong>Provide the service:</strong> create accounts, authenticate users, host organisation data,
			run requested features, manage subscriptions and answer support requests. For our own account administration,
			we rely on performing our contract with you; where you act for an organisation, we rely on our legitimate
			interest in providing its service.
		</li>
		<li>
			<strong>Protect and maintain the service:</strong> diagnose errors, prevent abuse, enforce permissions
			and investigate incidents. We rely on our legitimate interests in running a reliable, secure service
			and protecting users.
		</li>
		<li>
			<strong>Meet legal obligations:</strong> keep required accounting records and respond to valid legal
			requests.
		</li>
		<li>
			<strong>Optional communications:</strong> where consent is required for marketing, we ask for it
			separately. You can withdraw it at any time. Essential account, billing and security messages are
			part of operating your service.
		</li>
	</ul>
	<p>
		We process customer CRM content to provide the features requested by the customer, not to build
		advertising profiles or sell contact lists. We do not sell personal information.
	</p>

	<h2>Service providers and integrations</h2>
	<p>We use the following providers to operate the hosted service:</p>
	<ul>
		<li>
			<strong>Supabase:</strong> database, authentication, file storage and backend processing.
		</li>
		<li><strong>Railway:</strong> application, marketing website and billing-service hosting.</li>
		<li>
			<strong>Stripe:</strong> hosted checkout, subscription payments, customer portal and
			payment-fraud prevention. Stripe also processes some information for its own purposes under
			its <a href="https://stripe.com/privacy">privacy policy</a>.
		</li>
		<li>
			<strong>Our email hosting provider:</strong> delivery and storage of support correspondence and
			account emails sent using our corrin.ai mail service.
		</li>
	</ul>
	<p>
		Connecting a mailbox, calendar, AI provider or external agent allows the relevant information to
		be sent to that service to perform the requested action. AI features may send prompts and
		relevant CRM content to the provider selected by your organisation, including OpenAI, Anthropic,
		Google or OpenRouter. External agents using an organisation API key can access the data
		permitted by that key. Only connect services you are authorised to use and review their own
		terms and privacy settings.
	</p>
	<p>
		Access by our team and providers is limited to what is needed for their work. We may also
		disclose information where required by law, to protect legal rights, or in connection with a
		business transfer subject to appropriate confidentiality and privacy protections.
	</p>

	<h2>Where information is processed</h2>
	<p>
		Our production Supabase database is in the EU (Stockholm). This does not mean all processing
		stays in the EU: hosting, payments, support and connected providers may process information in
		other countries, including the United States. Where data protection law requires safeguards for
		international transfers, the relevant provider arrangements must include an applicable adequacy
		mechanism or contractual safeguards. Contact us for information about the safeguards relevant to
		your data.
	</p>

	<h2>Cookies and browser storage</h2>
	<p>
		The hosted app uses cookies and browser storage to keep you signed in, protect authentication
		and payment-recovery flows, and remember application preferences. Blocking essential storage can
		prevent these features from working. Our marketing website does not currently include
		advertising trackers or third-party audience analytics. Stripe and services you visit through
		external links apply their own cookie notices.
	</p>

	<h2>Retention, cancellation and deletion</h2>
	<p>
		We retain account and CRM information while it is needed to provide the service. Canceling a
		subscription stops its renewal; it does not itself request deletion of your account or
		organisation's records. Some in-app deletions remove records from normal views without
		immediately erasing all stored copies.
	</p>
	<p>
		To request a data copy, account closure or permanent deletion, contact <a
			href={`mailto:${legal.email}`}>{legal.email}</a
		>. We verify the requester's identity and authority over the organisation before acting. We
		assess retention by the purpose of the record, whether the service or support request is still
		active, security needs, and applicable accounting, legal and dispute requirements. Information
		no longer needed for those purposes is deleted or anonymised.
	</p>
	<p>
		Backup copies may remain until the provider's backup retention cycle expires and are used for
		recovery rather than normal service access. Billing or security records may need to be retained
		separately where required by law or necessary to resolve a dispute. We explain any relevant
		exception when handling your request.
	</p>

	<h2>Your rights</h2>
	<p>
		Depending on the law that applies and the circumstances, you can request access, correction,
		deletion, restriction of processing or a portable copy of your personal information. You may
		withdraw consent without affecting earlier lawful processing.
	</p>
	<p>
		<strong
			>You can object to processing based on legitimate interests, and you can always object to use
			of your information for direct marketing.</strong
		>
		Email <a href={`mailto:${legal.email}`}>{legal.email}</a> to exercise these rights. We may request
		proportionate identity verification and will respond within the period required by applicable law.
	</p>
	<p>
		You can complain to your local data protection authority. In the UK, contact the <a
			href="https://ico.org.uk/make-a-complaint/">Information Commissioner's Office</a
		>. In the EEA, you can contact the authority where you live or work. You do not have to contact
		us before making a complaint.
	</p>

	<h2>Automation and children</h2>
	<p>
		Headquarters provides customer-configured automations and optional AI assistance. We do not use
		your account information to make solely automated decisions about you that have legal or
		similarly significant effects. Customers are responsible for how they use automation with their
		CRM records. The hosted service is intended for adults using it for business purposes, not
		children.
	</p>

	<h2>Changes to this notice</h2>
	<p>
		We update this page when our practices change and show the revision date above. We will bring
		material changes to customers' attention through the service or email where appropriate.
	</p>
</LegalPage>
