import Link from 'next/link'
import StarRating from './StarRating'
import type { VendorWithStats } from '@/lib/types'

interface VendorCardProps {
  vendor: VendorWithStats
  userVoted?: boolean
}

export default function VendorCard({ vendor, userVoted }: VendorCardProps) {
  const locationStr = vendor.city === 'San Francisco'
    ? null
    : `${vendor.city}, ${vendor.state}`

  return (
    <Link href={`/vendors/${vendor.id}`}>
      <div
        className="rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] cursor-pointer relative"
        style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
      >
        {userVoted && (
          <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#d42b2b', color: '#fdf6e3' }}>
            Your Vote
          </span>
        )}

        <div className="flex items-start justify-between pr-16">
          <div>
            <h3 className="font-bold text-base leading-tight" style={{ color: '#fdf6e3' }}>{vendor.name}</h3>
            {vendor.is_notable && vendor.notable_person && (
              <p className="text-xs mt-0.5" style={{ color: '#f5a623' }}>{vendor.notable_person}</p>
            )}
            {locationStr && (
              <p className="text-xs mt-0.5" style={{ color: '#8a6040' }}>{locationStr}</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <StarRating value={Math.round(vendor.avg_overall ?? 0)} readonly size="sm" />
          <span className="text-xs" style={{ color: '#8a6040' }}>
            {vendor.avg_overall ? vendor.avg_overall.toFixed(1) : '—'}
            {vendor.rating_count > 0 && ` · ${vendor.rating_count} rating${vendor.rating_count !== 1 ? 's' : ''}`}
          </span>
        </div>

        {vendor.vote_count > 0 && (
          <p className="text-xs mt-1" style={{ color: '#e8621a' }}>
            🏆 {vendor.vote_count} best vote{vendor.vote_count !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </Link>
  )
}
