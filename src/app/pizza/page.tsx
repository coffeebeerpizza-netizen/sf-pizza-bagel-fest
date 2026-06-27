import { createClient } from '@/lib/supabase/server'
import VendorCard from '@/components/VendorCard'
import Link from 'next/link'
import type { VendorWithStats } from '@/lib/types'

export default async function PizzaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: vendors } = await supabase
    .from('vendors')
    .select(`
      *,
      ratings(overall, crust, sauce, toppings, authenticity),
      votes(id, user_id)
    `)
    .eq('category', 'pizza')
    .order('display_order')

  const { data: userVotes } = user ? await supabase
    .from('votes')
    .select('vendor_id')
    .eq('user_id', user.id)
    .eq('category', 'pizza') : { data: [] }

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

  const sfVendors = vendorsWithStats.filter(v => v.city === 'San Francisco' && !v.is_notable)
  const womenInPizza = vendorsWithStats.filter(v => v.is_notable)
  const outOfState = vendorsWithStats.filter(v => v.city !== 'San Francisco' && !v.is_notable)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#fdf6e3' }}>🍕 Pizza</h1>
        <p className="text-sm" style={{ color: '#8a6040' }}>40+ pizzerias and pizza makers · Rate each on crust, sauce, toppings, authenticity, and overall</p>
        {!user && (
          <p className="mt-3 text-sm" style={{ color: '#e8621a' }}>
            <Link href="/auth" className="underline">Sign in</Link> to rate vendors and cast your vote
          </p>
        )}
        {user && !userVotedVendorId && (
          <p className="mt-3 text-sm px-4 py-2 rounded inline-block" style={{ backgroundColor: '#2a1000', border: '1px solid #d42b2b', color: '#f5a623' }}>
            🏆 Don't forget to cast your Best Pizza vote on a vendor's page!
          </p>
        )}
        {userVotedVendorId && (
          <p className="mt-3 text-sm" style={{ color: '#e8621a' }}>
            ✓ You voted for your best pizza
          </p>
        )}
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color: '#f5a623', borderBottom: '1px solid #3a1800' }}>Bay Area Pizzerias</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sfVendors.map(v => <VendorCard key={v.id} vendor={v} userVoted={userVotedVendorId === v.id} />)}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color: '#f5a623', borderBottom: '1px solid #3a1800' }}>Women in Pizza</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {womenInPizza.map(v => <VendorCard key={v.id} vendor={v} userVoted={userVotedVendorId === v.id} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color: '#f5a623', borderBottom: '1px solid #3a1800' }}>Out of State &amp; Southern California</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outOfState.map(v => <VendorCard key={v.id} vendor={v} userVoted={userVotedVendorId === v.id} />)}
        </div>
      </section>
    </div>
  )
}
