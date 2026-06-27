'use client'

interface StarRatingProps {
  value: number | null
  onChange?: (val: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 'text-sm', md: 'text-xl', lg: 'text-2xl' }

export default function StarRating({ value, onChange, readonly = false, size = 'md' }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`${sizes[size]} ${readonly ? 'cursor-default' : 'cursor-pointer star-btn'}`}
          style={{ color: (value ?? 0) >= star ? '#f5a623' : '#4a3520', background: 'none', border: 'none', padding: '0 1px' }}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
