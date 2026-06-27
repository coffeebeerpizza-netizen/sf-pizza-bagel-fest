import { createClient } from '@/lib/supabase/server'
import VendorCard from '@/components/VendorCard'
import Link from 'next/link'
import type { VendorWithStats } from '@/lib/types'

export default async function BagelsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: vendors } = await supabase
    .from('vendors')
    .select(`
      *,
      ratings(overall, chew_texture, crust_bagel, schmear, freshness),
      votes(id, user_id)
    `)
    .eq('category', 'bagel')
    .order('display_order')

  const { data: userVotes } = user ? await supabase
    .from('votes')
    .select('vendor_id')
    .eq('user_id', user.id)
    .eq('category', 'bagel') : { data: [] }

  const userVotedVendorId = userVotes?.[0]?.vendor_id

  const vendorsWithStats: VendorWithStats[] = (vendors ?? []).map((v: any) => {
    const ratings = v.ratings ?? []
    const votes = v.votes ?? []
    const overall = ratings.map((r: any) => r.overall).filter(Boolean)
    return {
      ...v,
      avg_overall: overall.length ? overall.reduce((a: number, b: number) => a + b, 0) / overall.length : null,
      rating_count: ratings.length,
      vote_count: votes.length,
    }
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#fdf6e3' }}>🥯 Bagels</h1>
        <p className="text-sm" style={{ color: '#8a6040' }}>7 featured bagelries · Rate each on chew/texture, crust, schmear, freshness, and overall</p>
        {!user && (
          <p className="mt-3 text-sm" style={{ color: '#e8621a' }}>
            <Link href="/auth" className="underline">Sign in</Link> to rate vendors and cast your vote
          </p>
        )}
        {user && !userVotedVendorId && (
          <p className="mt-3 text-sm px-4 py-2 rounded inline-block" style={{ backgroundColor: '#2a1000', border: '1px solid #e8621a', color: '#f5a623' }}>
            🏆 Don't forget to cast your Best Bagel vote on a vendor's page!
          </p>
        )}
        {userVotedVendorId && (
          <p className="mt-3 text-sm" style={{ color: '#e8621a' }}>
            ✓ You voted for your best bagel
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendorsWithStats.map(v => <VendorCard key={v.id} vendor={v} userVoted={userVotedVendorId === v.id} />)}
      </div>
    </div>
  )
}
