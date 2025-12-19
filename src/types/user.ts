import type { CookieDesignImgData, CookieDesignImgDataCamel } from './cookie'

export interface User {
  userPk: number
  googleEmail: string
  campus: string
  classNumber: number
  name: string
  mmId: string
  role: UserRole
  isVerified: boolean
  isOvenOpen: boolean
  isTutorialCompleted: boolean
  description: string
  designData: CookieDesignImgDataCamel
  sentCookiesCount: number
  receivedCookiesCount: number
}

export type UserRole = 'USER' | 'ADMIN' | 'MASTER'

export interface UserResponse {
  user_pk: number
  google_email: string
  campus: string
  class_number: number
  name: string
  mm_id: string
  role: string
  is_verified: boolean
  is_oven_open: boolean
  is_tutorial_completed: boolean
  description: string
  design_data: CookieDesignImgData
  sent_cookies_count: number
  received_cookies_count: number
}
