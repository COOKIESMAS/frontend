import type {
  CookieDesignImgDataCamel,
  SendCookieItemCamel,
} from '@/types/cookie'

export type SendItem = {
  id: string
  toName: string
  toMeta?: string
  messagePreview: string
  date: string
  status: 'done' | 'sending' | 'failed'
  thumb?: CookieDesignImgDataCamel
}

export function mapSendCookieToSendItem(item: SendCookieItemCamel): SendItem {
  return {
    id: String(item.cookiePk),
    toName: item.receiverName,
    toMeta: undefined, // ❗ 캠퍼스/반 정보는 API에 없으므로 일단 비워둠
    messagePreview: item.content,
    date: formatDate(item.createdAt),
    status: 'done', // 서버에서 상태 안 주면 기본 완료
    thumb: item.designData,
  }
}

/** 날짜 포맷 (2025.12.15) */
function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate(),
  ).padStart(2, '0')}`
}
