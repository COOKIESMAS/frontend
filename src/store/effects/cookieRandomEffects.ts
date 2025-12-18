import { atom } from 'jotai'
import type { SelectableSubCategoryKey, SelectedItems } from '@/constant/items'
import { selectedItemsAtom } from '../atoms/cookieAtoms'
import type { CookiePartsResponse } from '@/types/asset'

export const randomizeSelectedItemsAtom = atom(
  null,
  (
    get,
    set,
    payload: {
      partsData: CookiePartsResponse
      keepProbability?: number
    },
  ) => {
    const { partsData } = payload
    const required: readonly SelectableSubCategoryKey[] = [
      'body',
      'eyes',
      'mouth',
    ]
    const keepProbability = payload.keepProbability ?? 0.5

    const prev = get(selectedItemsAtom)
    const next: SelectedItems = { ...prev }

    const subKeys = Object.keys(partsData) as SelectableSubCategoryKey[]

    const pickRandomIndex = (len: number): number | null =>
      len > 0 ? Math.floor(Math.random() * len) : null

    for (const subKey of subKeys) {
      const assets = partsData[subKey]
      if (!assets?.length) {
        next[subKey] = null
        continue
      }

      if (required.includes(subKey)) {
        next[subKey] = pickRandomIndex(assets.length)
        continue
      }

      const keep = Math.random() < keepProbability

      if (keep) {
        next[subKey] = next[subKey] ?? pickRandomIndex(assets.length)
      } else {
        next[subKey] =
          Math.random() < 0.5 ? pickRandomIndex(assets.length) : null
      }
    }

    // 👗 의상 상호 배타
    if (next.onePiece !== null) {
      next.top = null
      next.pants = null
    } else if (next.top !== null || next.pants !== null) {
      next.onePiece = null
    }

    // 🔒 필수 파츠 보정
    for (const r of required) {
      if (next[r] === null) {
        const assets = partsData[r]
        next[r] = assets?.length
          ? Math.floor(Math.random() * assets.length)
          : null
      }
    }
    set(selectedItemsAtom, next)
  },
)
