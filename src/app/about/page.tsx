export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: '#fdf6e3' }}>About the Festival</h1>
      <p className="text-center text-sm mb-12" style={{ color: '#8a6040' }}>San Francisco's Premier Pizza, Bagel &amp; Beer Celebration</p>

      {/* Origin */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#f5a623' }}>The Story</h2>
        <div className="rounded-xl p-6 text-sm leading-relaxed space-y-3" style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800', color: '#c8a880' }}>
          <p>
            Award-winning pizzaiolo and legendary restaurateur <strong style={{ color: '#fdf6e3' }}>Tony Gemignani</strong>, in collaboration with the <strong style={{ color: '#fdf6e3' }}>San Francisco Italian Athletic Club Foundation</strong>, hosts San Francisco's annual Pizza, Bagel &amp; Beer Festival in the heart of historic North Beach.
          </p>
          <p>
            The event covers two blocks of North Beach on Stockton and Filbert Streets along Washington Square — one of the city's most beloved neighborhoods and the historic center of San Francisco's Italian community.
          </p>
          <p>
            Over the last two years, the event raised over <strong style={{ color: '#f5a623' }}>$140,000</strong> with proceeds benefiting local causes including youth programs, schools, and neighborhood organizations.
          </p>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#f5a623' }}>2025 Beneficiaries</h2>
        <div className="space-y-3">
          {[
            { name: 'John Arena Foundation', desc: 'Supporting pizza education and community programs led by legendary pizzaiolo John Arena.' },
            { name: 'Salesian Boys & Girls Club', desc: 'Providing North Beach youth with after-school programs, sports, and mentorship since 1901.' },
            { name: 'SF Italian Athletic Club Foundation', desc: 'Preserving the heritage and community of San Francisco\'s Italian American community.' },
            { name: 'Saints Peter & Paul School', desc: 'A cornerstone of North Beach education, serving the community since 1911.' },
            { name: 'North Beach Business Association', desc: 'Supporting the vibrant small businesses that make North Beach a world-class neighborhood.' },
          ].map(({ name, desc }) => (
            <div key={name} className="rounded-xl p-4" style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800' }}>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#fdf6e3' }}>{name}</h3>
              <p className="text-xs" style={{ color: '#8a6040' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Event Info */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#f5a623' }}>Event Details</h2>
        <div className="rounded-xl p-6 space-y-4 text-sm" style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800' }}>
          {[
            { q: 'How big are the portions?', a: 'Expect cocktail napkin-sized portions so you can sample the wide variety of styles. There is no limit to the number of slices you consume. Please do not ask for food to-go.' },
            { q: 'What is the Ooni Competition?', a: 'The SF Ooni Pizza Championship gives pizza enthusiasts and home chefs the chance to compete, moderated by pizzaiolos Eidref Laxa and Adam Sachs.' },
            { q: 'What\'s in the VIP ticket?', a: '1 hour early access, VIP section on the third floor of the SFIAC overlooking the festival, open bar, charcuterie stations, Spritz by Mommenpop, curated wine, and a gift bag.' },
            { q: 'Is beer included?', a: 'Four beers (16oz) are included with General Admission. Additional drinks can be purchased. Must be 21+ with ID.' },
            { q: 'What about parking?', a: 'Public transportation or rideshare is strongly recommended. Nearby garages: Stockton/Vallejo (2), Powell/Union (2), and 721 Filbert Street.' },
            { q: 'Age policy?', a: 'Children 5 and under are free. Different ticket tiers are available depending on age.' },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: '1px solid #2a1000', paddingBottom: '1rem' }}>
              <p className="font-bold mb-1" style={{ color: '#fdf6e3' }}>{q}</p>
              <p style={{ color: '#8a6040' }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIP */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#f5a623' }}>VIP Experience</h2>
        <div className="rounded-xl p-6 text-sm" style={{ backgroundColor: '#1e0d00', border: '1px solid #d42b2b' }}>
          <ul className="space-y-2" style={{ color: '#c8a880' }}>
            {[
              '1 hour early entry to the festival',
              'Exclusive VIP lounge on the 3rd floor of SFIAC overlooking the festival',
              'Open bar throughout the event',
              'Spritz by Mommenpop',
              'Curated wine selection featuring Capo Isetta',
              'Columbus Craft Meats charcuterie stations',
              'Exclusive gift bag',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span style={{ color: '#f5a623' }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
