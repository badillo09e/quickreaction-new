"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const firstRef  = useRef<HTMLInputElement>(null);
  const lastRef   = useRef<HTMLInputElement>(null);
  const emailRef  = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const msgRef    = useRef<HTMLTextAreaElement>(null);
  const honeyRef  = useRef<HTMLInputElement>(null);

  /* Nav scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock scroll when drawer or modal open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen || modalOpen ? "hidden" : "";
  }, [drawerOpen, modalOpen]);

  /* Esc closes modal */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* IntersectionObserver reveals */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeDrawer = () => setDrawerOpen(false);
  const openModal   = () => setModalOpen(true);
  const closeModal  = () => setModalOpen(false);

  const handleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const submitForm = async () => {
    if (honeyRef.current?.value) return;
    const first  = firstRef.current?.value.trim() ?? "";
    const last   = lastRef.current?.value.trim() ?? "";
    const email  = emailRef.current?.value.trim() ?? "";
    const mobile = mobileRef.current?.value.trim() ?? "";
    const msg    = msgRef.current?.value.trim() ?? "";

    if (!first || !last || !email) {
      if (firstRef.current) firstRef.current.style.borderColor = !first ? "rgba(239,68,68,.6)" : "";
      if (lastRef.current)  lastRef.current.style.borderColor  = !last  ? "rgba(239,68,68,.6)" : "";
      if (emailRef.current) emailRef.current.style.borderColor = !email ? "rgba(239,68,68,.6)" : "";
      return;
    }

    setSubmitting(true);
    try {
      await fetch("https://formsubmit.co/ajax/eric.badillo@qrsolutions.org", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New inquiry from ${first} ${last} — QuickReaction`,
          _template: "table",
          _honey: "",
          "First Name": first,
          "Last Name": last,
          Email: email,
          Mobile: mobile || "—",
          Message: msg || "—",
        }),
      });
    } catch { /* FormSubmit sends the email even if CORS blocks the response */ }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <nav className={`qr-nav${scrolled ? " scrolled" : ""}`} id="nav">
        <a href="#hero" className="nav-logo">
          <Image src="/logo.png" alt="QuickReaction Solutions" width={120} height={30} priority style={{ height: 30, width: "auto" }} />
          <span className="nav-logo-text">QuickReaction Solutions</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#manifesto">About</a></li>
          <li><a href="#cta">Contact</a></li>
        </ul>
        <button className="nav-cta" onClick={openModal}>Let&apos;s Connect</button>
        <button
          className={`hamburger${drawerOpen ? " open" : ""}`}
          onClick={() => setDrawerOpen((d) => !d)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`drawer${drawerOpen ? " open" : ""}`}>
        <a href="#services" onClick={closeDrawer}>Services</a>
        <a href="#manifesto" onClick={closeDrawer}>About</a>
        <a href="#cta" onClick={closeDrawer}>Contact</a>
        <button onClick={() => { closeDrawer(); openModal(); }}>Let&apos;s Connect</button>
      </div>

      <section id="hero">
        <p className="hero-badge">Executive Search · AI-First · Founded 2025</p>
        <h1 className="hero-h1">
          We connect exceptional talent<br />to <em>what&apos;s&nbsp;next.</em>
        </h1>
        <p className="hero-sub">
          QuickReaction is a boutique executive search and advisory firm built for the era of AI. We place the strategists, builders, and leaders who define what technology organizations become.
        </p>
        <div className="hero-actions">
          <button className="btn-navy" onClick={openModal}>Let&apos;s Connect</button>
          <button
            className="btn-ring"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          >
            Our Services
          </button>
        </div>
        <div className="hero-scroll-cue" aria-hidden="true">Scroll</div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(2)].flatMap((_, group) =>
            ["Data & AI Solutions", "Technology Sales", "Executive Search", "Bespoke Advisory", "AI-First Methodology", "Outcome Accountability"]
              .map((label, i) => (
                <span key={`${group}-${i}`} className="ticker-item">{label} <span className="ticker-sep"></span></span>
              ))
          )}
        </div>
      </div>

      <section id="services">
        <p className="eyebrow">Practice Areas</p>
        <div className="svc-grid">
          {[
            { num: "01", name: "Data & AI Solutions",  tags: ["Analytics", "Engineering", "ML / LLM"], desc: "We source and place the specialists who build the pipelines, models, and platforms that turn raw data into competitive advantage — from data engineers to Chief AI Officers." },
            { num: "02", name: "Technology Sales",     tags: ["Revenue", "GTM", "SaaS"],               desc: "Elite commercial talent for high-growth technology companies. We understand enterprise sales cycles and match revenue leaders who consistently exceed targets." },
            { num: "03", name: "Executive Search",     tags: ["C-Suite", "VP", "Director"],            desc: "Senior leadership search conducted with precision and discretion. We access passive talent at the highest levels, delivering candidates who transform organizations." },
            { num: "04", name: "Bespoke Advisory",     tags: ["Strategy", "Structure", "Scale"],       desc: "For clients with mandates that require a custom approach. We design tailored talent strategies and organizational frameworks for situations standard playbooks can't address." },
          ].map((s) => (
            <div key={s.num} className="svc-card reveal" onClick={openModal}>
              <span className="svc-watermark">{s.num}</span>
              <p className="svc-num">{s.num}</p>
              <h3 className="svc-name">{s.name}</h3>
              <div className="svc-tags">
                {s.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}
              </div>
              <p className="svc-desc">{s.desc}</p>
              <span className="svc-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      <section id="stats">
        <div className="stat-cell reveal">
          <div className="stat-n">AI<em>-First</em></div>
          <p className="stat-lbl">Intelligence-driven search methodology. We use data to find talent your competitors can&apos;t.</p>
        </div>
        <div className="stat-cell reveal">
          <div className="stat-n">4<em>&nbsp;practices</em></div>
          <p className="stat-lbl">Spanning data, sales, executive leadership, and custom advisory engagements.</p>
        </div>
        <div className="stat-cell reveal">
          <div className="stat-n">100<em>%</em></div>
          <p className="stat-lbl">Outcome-focused. We track placement performance long after the offer is signed.</p>
        </div>
      </section>

      <section id="manifesto">
        <div className="manifesto-inner">
          <p className="manifesto-q reveal">
            &ldquo;We measure success by<br />
            <em>placement performance,</em><br />
            not placement volume.&rdquo;
          </p>
          <p className="manifesto-body reveal">
            Every engagement is an investment in your organization&apos;s trajectory. We&apos;re selective about who we work with — not because of exclusivity, but because genuine partnership requires alignment of values, ambition, and urgency.
          </p>
        </div>
      </section>

      <section id="cta">
        <p className="eyebrow">Start a Conversation</p>
        <h2 className="cta-h reveal">
          Ready to find your<br /><em>next great hire?</em>
        </h2>
        <button className="btn-white reveal" onClick={openModal}>Let&apos;s Connect</button>
      </section>

      <footer className="qr-footer">
        <div className="ftr-logo">
          <Image src="/logo.png" alt="QuickReaction Solutions" width={96} height={24} style={{ height: 24, width: "auto" }} />
          <span>QuickReaction Solutions</span>
        </div>
        <ul className="ftr-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#manifesto">About</a></li>
          <li><a href="mailto:eric.badillo@qrsolutions.org">Email</a></li>
        </ul>
        <span className="ftr-copy">&copy; 2025 QuickReaction Solutions</span>
      </footer>

      <button className="float-cta" onClick={openModal}>
        <span className="float-pulse"></span>
        Let&apos;s Connect
      </button>

      <div className={`overlay${modalOpen ? " open" : ""}`} onClick={handleOverlay}>
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-hd">
            <div>
              <div className="modal-title">Let&apos;s Connect</div>
              <div className="modal-sub">We&apos;ll be in touch within one business day.</div>
            </div>
            <button className="modal-x" onClick={closeModal} aria-label="Close">✕</button>
          </div>

          {!submitted ? (
            <div>
              <input ref={honeyRef} type="text" className="f-honey" name="_honey" tabIndex={-1} autoComplete="off" />
              <div className="f-row">
                <div className="f-grp">
                  <label className="f-lbl">First Name *</label>
                  <input ref={firstRef} className="f-inp" type="text" placeholder="Jane" autoComplete="given-name" />
                </div>
                <div className="f-grp">
                  <label className="f-lbl">Last Name *</label>
                  <input ref={lastRef} className="f-inp" type="text" placeholder="Smith" autoComplete="family-name" />
                </div>
              </div>
              <div className="f-grp">
                <label className="f-lbl">Email *</label>
                <input ref={emailRef} className="f-inp" type="email" placeholder="jane@company.com" autoComplete="email" />
              </div>
              <div className="f-grp">
                <label className="f-lbl">Mobile <span className="f-opt">(optional)</span></label>
                <input ref={mobileRef} className="f-inp" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" />
              </div>
              <div className="f-grp">
                <label className="f-lbl">How can we help?</label>
                <textarea ref={msgRef} className="f-ta" placeholder="I'm looking for..." />
              </div>
              <button className="f-submit" onClick={submitForm} disabled={submitting}>
                {submitting ? "Sending…" : "Send Message"}
              </button>
              <p className="f-note">Your information goes directly to Eric Badillo at QuickReaction.</p>
            </div>
          ) : (
            <div className="success-state">
              <div className="success-check">✓</div>
              <div className="success-hed">Message Sent</div>
              <p className="success-txt">Thank you. Eric will be in touch within one business day.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
