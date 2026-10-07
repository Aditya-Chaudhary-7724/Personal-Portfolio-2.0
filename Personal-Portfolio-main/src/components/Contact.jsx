import { useState } from 'react';
import { contactLinks, links } from '../data/content';
import SectionHeader from './SectionHeader';
import Magnetic from './Magnetic';

// Web3Forms public access key (safe to ship; it only allows sending to the owner's inbox).
const WEB3FORMS_KEY = 'c5683c98-7591-42b2-87d4-25f6277d43fe';

const field =
  'block w-full border-0 border-b border-rule-strong bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-0';

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="min-h-[44px] font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink"
      aria-live="polite"
    >
      {copied ? 'copied ✓' : 'copy address'}
    </button>
  );
}

function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const sending = status.state === 'sending';

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append('access_key', WEB3FORMS_KEY);
    data.append('subject', 'New message from your portfolio');
    setStatus({ state: 'sending', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await response.json().catch(() => ({}));
      if (response.ok && json.success) {
        form.reset();
        setStatus({ state: 'sent', message: 'Sent. I’ll reply from my own address.' });
      } else {
        setStatus({ state: 'error', message: json.message || `The form service answered ${response.status}. Email me directly instead.` });
      }
    } catch {
      setStatus({ state: 'error', message: 'Couldn’t reach the form service. Check your connection, or email me directly.' });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" aria-describedby="form-status">
      {/* honeypot for bots, as supported by Web3Forms */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="label">Name</span>
          <input name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
      </div>
      <label className="block">
        <span className="label">Message</span>
        <textarea name="message" rows={4} required className={`${field} resize-y`} placeholder="What are you working on?" />
      </label>
      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={sending}
          className="min-h-[48px] bg-ink px-6 font-mono text-[12px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent hover:text-[#0f0e0c] disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <p
          id="form-status"
          role="status"
          className={`font-mono text-[12px] ${status.state === 'error' ? 'text-accent-ink' : 'text-ink-2'}`}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="page pb-20 pt-20 lg:pb-28 lg:pt-28">
      <SectionHeader
        id="contact-title"
        index="06"
        label="Contact"
        title={['If you’re building with LLMs,', <em key="e">I’d like to hear about it.</em>]}
        aside="I graduate in 2027 and I’m looking for engineering roles: LLM systems, backend, developer tooling. Email is the fastest way to reach me."
      />

      <div className="grid-12 gap-y-16">
        <div className="col-span-4 sm:col-span-8 lg:col-span-6">
          <Magnetic
            href={`mailto:${links.email}`}
            strength={0.12}
            className="inline-block font-serif text-[clamp(1.55rem,3.1vw,2.8rem)] leading-tight text-ink decoration-accent decoration-1 underline-offset-[10px] hover:underline"
          >
            {/* break only at the @, never inside a word */}
            <span className="whitespace-nowrap">{links.email.split('@')[0]}</span>
            <wbr />
            <span className="whitespace-nowrap">@{links.email.split('@')[1]}</span>
          </Magnetic>
          <div className="mt-2">
            <CopyEmail />
          </div>

          <ul className="mt-10 border-b border-rule">
            {contactLinks
              .filter((l) => l.label !== 'Email')
              .map((l) => (
                <li key={l.label} className="border-t border-rule">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid min-h-[52px] grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-3"
                  >
                    <span className="label">{l.label}</span>
                    <span className="truncate text-[15.5px] text-ink-2 transition-colors group-hover:text-ink">{l.handle}</span>
                    <span aria-hidden="true" className="font-mono text-[12px] text-ink-3 transition-colors group-hover:text-accent-ink">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8">
          <p className="label mb-8">Or leave a note here</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
