import Link from 'next/link'

const beneficiaries = [
  'John Arena Foundation',
  'Salesian Boys & Girls Club',
  'SF Italian Athletic Club Foundation',
  'Saints Peter & Paul School',
  'North Beach Business Association',
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-center py-20 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #2a0800 0%, #120600 100%)' }}>
        <div className="absolute inset-0 opacity-5 text-[20rem] flex items-center justify-center pointer-events-none select-none">🍕</div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#e8621a' }}>San Francisco · North Beach</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ color: '#fdf6e3', fontFamily: 'Georgia, serif' }}>
            Pizza, Bagel &amp;<br />
            <span style={{ color: '#f5a623' }}>Beer Festival</span>
          </h1>
          <p className="text-lg mb-2" style={{ color: '#c8a880' }}>Stockton &amp; Filbert Streets · Washington Square</p>
          <p className="text-sm mb-8" style={{ color: '#8a6040' }}>Hosted by Tony Gemignani &amp; the SF Italian Athletic Club Foundation</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pizza"
              className="w-full sm:w-auto px-8 py-3 rounded-full text-lg font-bold text-center transition-all hover:scale-105"
              style={{ backgroundColor: '#d42b2b', color: '#fdf6e3' }}
            >
              🍕 Rate Pizza
            </Link>
            <Link
              href="/bagels"
              className="w-full sm:w-auto px-8 py-3 rounded-full text-lg font-bold text-center transition-all hover:scale-105"
              style={{ backgroundColor: '#e8621a', color: '#fdf6e3' }}
            >
              🥯 Rate Bagels
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6" style={{ backgroundColor: '#1e0d00', borderTop: '1px solid #3a1800', borderBottom: '1px solid #3a1800' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { num: '40+', label: 'Pizzerias' },
            { num: '7', label: 'Bagelries' },
            { num: '$140K+', label: 'Raised Last 2 Years' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold" style={{ color: '#f5a623' }}>{num}</div>
              <div className="text-sm mt-1" style={{ color: '#8a6040' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="py-14 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#f5a623' }}>How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📝', title: 'Register', desc: 'Create a free account to rate and vote.' },
            { icon: '⭐', title: 'Rate', desc: 'Score each vendor on specific criteria like crust, sauce, and freshness.' },
            { icon: '🏆', title: 'Vote', desc: 'Cast one vote each for your favorite pizza AND your favorite bagel.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center p-6 rounded-xl" style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800' }}>
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#fdf6e3' }}>{title}</h3>
              <p className="text-sm" style={{ color: '#8a6040' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="py-10 px-6" style={{ backgroundColor: '#1e0d00', borderTop: '1px solid #3a1800' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#f5a623' }}>2025 Beneficiaries</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {beneficiaries.map((b) => (
              <span key={b} className="px-4 py-1.5 rounded-full text-sm" style={{ backgroundColor: '#2a1000', border: '1px solid #d42b2b', color: '#fdf6e3' }}>
                {b}
              </span>
            ))}
          </div>
          <Link href="/about" className="inline-block mt-6 text-sm underline" style={{ color: '#e8621a' }}>
            Learn more about the festival →
          </Link>
        </div>
      </section>
    </div>
  )
}
