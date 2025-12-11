export interface CookieDesignData {
  accessory?: number
  hat?: number
  hair?: number
  eyes?: number
  mouth?: number
  blush?: number
  pants?: number
  top?: number
  body?: number
  onePiece?: number
}

export interface CookieItem {
  cookie_pk: number
  sender_name: string
  is_read: boolean
  created_at: string
  design_data: CookieDesignData
}
