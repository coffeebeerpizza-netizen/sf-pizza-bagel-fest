import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import StarRating from '@/components/StarRating'

export const revalidate = 60

export default async function LeaderboardPage() {
  const supabase = await createClient()

  const { data: vendors } = await supabase
    .from('vendors')
    .select(`*, ratings(overall), votes(id)`)
    .order('display_order')

  function buildLeaderboard(vlist: any[]) {
    return vlist
      .map(v => {
        const ratings = (v.ratings ?? []).map((r: any) => r.overall).filter(Boolean)
        const avg = ratings.length ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length : null
        return { ...v, avg_overall: avg, rating_count: ratings.length, vote_count: (v.votes ?? []).length }
      })
      .filter(v => v.rating_count > 0 || v.vote_count > 0)
      .sort((a, b) => {
        if (b.vote_count !== a.vote_count) return b.vote_count - a.vote_count
        return (b.avg_overall ?? 0) - (a.avg_overall ?? 0)
      })
  }

  const pizzaVendors = buildLeaderboard((vendors ?? []).filter((v: any) => v.category === 'pizza'))
  const bagelVendors = buildLeaderboard((vendors ?? []).filter((v: any) => v.category === 'bagel'))

  const Table = ({ title, emoji, items }: { title: string; emoji: string; items: any[] }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#f5a623' }}>{emoji} {title}</h2>
      {items.length === 0 ? (
        <p className="text-sm" style={{ color: '#8a6040' }}>No ratings yet — be the first to rate!</p>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #3a1800' }}>
          {items.map((v, i) => (
            <Link key={v.id} href={`/vendors/${v.id}`}>
              <div
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:opacity-90"
                style={{ backgroundColor: i % 2 === 0 ? '#1e0d00' : '#180a00', borderBottom: '1px solid #2a1000' }}
              >
                <span className="text-lg font-bold w-6 text-right" style={{ color: i < 3 ? '#f5a623' : '#4a3520' }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: '#fdf6e3' }}>{v.name}</p>
                  {v.city !== 'San Francisco' && (
                    <p className="text-xs" style={{ color: '#8a6040' }}>{v.city}, {v.state}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 text-right shrink-0">
                  <StarRating value={v.avg_overall ? Math.round(v.avg_overall) : null} readonly size="sm" />
                  <span className="text-xs w-6" style={{ color: '#f5a623' }}>{v.avg_overall ? v.avg_overall.toFixed(1) : '—'}</span>
                  {v.vote_count > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#d42b2b', color: '#fdf6e3' }}>
                      🏆 {v.vote_count}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-2" style={{ color: '#fdf6e3' }}>Leaderboard</h1>
      <p className="text-sm text-center mb-10" style={{ color: '#8a6040' }}>Ranked by community votes, then average rating · Updates every 60s</p>

      <Table title="Pizza" emoji="🍕" items={pizzaVendors} />
      <Table title="Bagels" emoji="🥯" items={bagelVendors} />
    </div>
  )
}
