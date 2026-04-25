export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#0a1a2f] to-[#0d2a4d] text-white px-8 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Smart Solutions.
              <br />
              <span className="text-blue-500">Stronger Futures.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-300">
              QuickReaction Solutions is a boutique IT firm delivering data, AI,
              and technology solutions to help businesses scale and succeed.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
                Explore Solutions →
              </button>
              <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-white hover:text-black">
                Let's Connect
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              Founded 2025 • Built for today. Ready for tomorrow.
            </p>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="w-72 h-72 bg-blue-900/30 rounded-3xl"></div>
          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-600 font-semibold uppercase text-sm">
            What We Do
          </p>
          <h2 className="text-3xl font-bold mt-2">
            Solutions That Drive Impact
          </h2>
          <p className="mt-4 text-gray-600">
            We partner with organizations to deliver expert IT solutions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg">Data & AI Solutions</h3>
              <p className="mt-2 text-gray-600">
                Unlock the power of data to drive smarter decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg">Technology Sales</h3>
              <p className="mt-2 text-gray-600">
                Connect innovative tech with real business needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg">Executive Search</h3>
              <p className="mt-2 text-gray-600">
                Find leaders that move your business forward.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
