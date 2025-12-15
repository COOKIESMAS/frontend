import { atom } from 'jotai'
import { selectedItemsAtom } from '../atoms/cookieAtoms'
import { type SelectableSubCategoryKey } from '@/constant/items'

const REQUIRED_SUBCATEGORIES: SelectableSubCategoryKey[] = [
  'body',
  'eyes',
  'mouth',
]

export const selectCookiePartAtom = atom(
  null,
  (
    get,
    set,
    payload: {
      subCategory: SelectableSubCategoryKey
      index: number
    },
  ) => {
    const prev = get(selectedItemsAtom)
    const { subCategory, index } = payload

    const current = prev[subCategory]
    const next = current === index ? null : index

    // 필수 파츠 해제 방지
    if (next === null && REQUIRED_SUBCATEGORIES.includes(subCategory)) {
      return
    }

    const updated = { ...prev, [subCategory]: next }

    // 의상 상호 배타
    if (subCategory === 'onePiece' && next !== null) {
      updated.top = null
      updated.pants = null
    }

    if ((subCategory === 'top' || subCategory === 'pants') && next !== null) {
      updated.onePiece = null
    }

    set(selectedItemsAtom, updated)
  },
)
