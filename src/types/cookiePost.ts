import type { SelectedItems } from '@/constant/items'

export type ReceiverInfo = {
  campus: string
  class_number: number
  mm_id: string
  name: string
  role: 'STUDENT' | 'TEACHER'
}

export type CookiePostRequest = {
  content: string
  design_data: SelectedItems
  receiver_info: ReceiverInfo
}
