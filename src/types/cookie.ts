export interface CookieDesignData {
  accessory?: number | null
  hat?: number | null
  hair?: number | null
  eyes?: number | null
  mouth?: number | null
  blush?: number | null
  pants?: number | null
  top?: number | null
  body?: number | null
  onePiece?: number | null
}

export interface CookieItem {
  cookie_pk: number
  sender_name: string
  is_read: boolean
  created_at: string
  design_data: CookieDesignData
}

export interface SendCookieRequest {
  content: string
  design_data: CookieDesignData
  receiver_info: ReceiverInfo
}

export type ReceiverRole = 'STUDENT' | 'TEACHER'

export interface ReceiverInfo {
  campus: string
  class_number: number
  mm_id: string
  name: string
  role: ReceiverRole
}
