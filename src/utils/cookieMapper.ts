import type {
  SendCookieItem,
  SendCookieItemCamel,
  SendCookieListResponseCamel,
} from '@/types/cookie'

export function mapSendCookieItemToCamel(
  item: SendCookieItem,
): SendCookieItemCamel {
  return {
    cookiePk: item.cookie_pk,
    content: item.content,
    createdAt: item.created_at,
    designData: item.design_data,
    isRead: item.is_read,
    receiverId: item.receiver_id,
    receiverName: item.receiver_name,
    senderId: item.sender_id,
    senderName: item.sender_name,
  }
}

export function mapSendCookieListToCamel(
  list: SendCookieItem[],
): SendCookieListResponseCamel {
  return list.map(mapSendCookieItemToCamel)
}
