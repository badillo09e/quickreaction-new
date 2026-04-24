"use client";

import React, { useState } from "react";

export default function Website() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#061326] text-white">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-10" />
          <span className="font-semibold tracking-wide text-lg">QuickReaction Solutions</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#" className="text-blue-400">Home</a>
          <a href="#">About</a>
          <a href="#">Solutions</a>
          <a href="#">Industries</a>
          <a href="#">Why QRS</a>
          <a href="#">Contact</a>
        </nav>

        <button className="bg-transparent border border-blue-500 text-blue-400 px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
          Let's Connect
        </button>
      </header>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center px-8 py-24 max-w-7xl mx-auto gap-10">
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Smart Solutions. <br />
            <span className="text-blue-500">Stronger</span> Futures.
          </h1>

          <p className="text-gray-300 mb-6 max-w-lg">
            Quickreaction Solutions is a boutique IT solutions firm providing data & AI expertise, technology sales, and executive search services to help organizations build, scale, and lead.
          </p>

          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded">Explore Solutions →</button>
            <button className="border border-gray-500 px-5 py-2 rounded">Let's Connect</button>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            <span className="font-semibold text-white">Founded May 2025</span><br />
            Built for today. Ready for tomorrow.
          </p>
        </div>

        {/* BIG LOGO VISUAL */}
        <div className="relative flex justify-center">
          <img src="/logo.png" className="w-[500px] opacity-20" />
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="bg-gray-100 text-gray-900 py-20 px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-wide">WHAT WE DO</p>
          <h2 className="text-3xl font-bold">Solutions That Drive Impact</h2>
          <p className="text-gray-600 mt-2">
            We partner with organizations across industries to deliver expert solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Data & AI Solutions",
              desc: "Unlock the power of data to drive smarter decisions and automation.",
            },
            {
              title: "Technology Sales",
              desc: "Connect innovative solutions with the right organizations.",
            },
            {
              title: "Executive Search",
              desc: "Place transformative leaders that drive real business outcomes.",
            },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 border">
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

        {submitted && <p className="text-green-400 mb-4">Message sent successfully!</p>}

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />

          <button className="w-full bg-blue-600 py-3 rounded">
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 py-6 border-t border-white/10">
        © 2025 QuickReaction Solutions
      </footer>
    </div>
  );
}
