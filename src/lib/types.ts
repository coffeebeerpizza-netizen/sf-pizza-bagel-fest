export type Category = 'pizza' | 'bagel'

export interface Vendor {
  id: string
  name: string
  category: Category
  description: string | null
  location: string | null
  city: string
  state: string
  website: string | null
  is_notable: boolean
  notable_person: string | null
  display_order: number
  created_at: string
}

export interface Rating {
  id: string
  user_id: string
  vendor_id: string
  overall: number | null
  notes: string | null
  // pizza
  crust: number | null
  sauce: number | null
  toppings: number | null
  authenticity: number | null
  // bagel
  chew_texture: number | null
  crust_bagel: number | null
  schmear: number | null
  freshness: number | null
  created_at: string
  updated_at: string
}

export interface Vote {
  id: string
  user_id: string
  vendor_id: string
  category: Category
  created_at: string
}

export interface VendorWithStats extends Vendor {
  avg_overall: number | null
  rating_count: number
  avg_crust?: number | null
  avg_sauce?: number | null
  avg_toppings?: number | null
  avg_authenticity?: number | null
  avg_chew_texture?: number | null
  avg_crust_bagel?: number | null
  avg_schmear?: number | null
  avg_freshness?: number | null
  vote_count: number
}
