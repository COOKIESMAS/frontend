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
  is_read: boolean
  created_at: string
  design_data: CookieDesignData
  receiver_id: number
  receiver_name: string
  sender_id: number
  sender_name: string
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

// 보낸 쿠키 관련

export interface CookieDesignImgData {
  accessory?: string
  blush?: string
  body?: string
  eyes?: string
  hair?: string
  hat?: string
  mouth?: string
  onePiece?: string
  pants?: string
  top?: string
}

export interface SendCookieItem {
  cookie_pk: number
  content: string
  created_at: string
  design_data: CookieDesignImgData
  is_read: boolean
  receiver_id: number
  receiver_name: string
  sender_id: number
  sender_name: string
}

export type SendCookieListResponse = SendCookieItem[]
export type SendCookieDetailResponse = SendCookieItem[]

export interface CookieDesignImgDataCamel {
  accessory?: string
  blush?: string
  body?: string
  eyes?: string
  hair?: string
  hat?: string
  mouth?: string
  onePiece?: string
  pants?: string
  top?: string
}

export interface SendCookieItemCamel {
  cookiePk: number
  content: string
  createdAt: string
  designData: CookieDesignImgDataCamel
  isRead: boolean
  receiverId: number
  receiverName: string
  senderId: number
  senderName: string
}

export type SendCookieListResponseCamel = SendCookieItemCamel[]
export type SendCookieDetailResponseCamel = SendCookieItemCamel[]
