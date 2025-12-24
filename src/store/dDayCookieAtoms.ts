import { atom } from 'jotai'
import type { CookieItem } from '@/types/cookie'

/** D-Day 페이지에서 사용할 쿠키 전체 목록 */
export const dDayCookieListAtom = atom<CookieItem[]>([])

/** 현재 가운데에 보여지는 쿠키의 인덱스(0-based) */
export const dDayCurrentIndexAtom = atom(0)

/** 현재 선택된(가운데) 쿠키 편의 selector */
export const dDaySelectedCookieAtom = atom((get) => {
  const list = get(dDayCookieListAtom)
  const index = get(dDayCurrentIndexAtom)

  if (!list.length) return null
  const safeIndex = ((index % list.length) + list.length) % list.length
  return list[safeIndex]
})
