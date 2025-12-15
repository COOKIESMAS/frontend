import { atom } from 'jotai'
import { MAIN_CATEGORY, MAIN_CATEGORY_SUBS } from '@/constant/items'
import {
  mainCategoryAtom,
  subCategoryAtom,
  selectedItemsAtom,
} from '@/store/atoms/cookieAtoms'
import {
  receiverRoleAtom,
  campusAtom,
  classAtom,
  nameAtom,
  mattermostAtom,
} from '@/store/atoms/receiverAtoms'
import { letterAtom } from '@/store/atoms/letterAtoms'
import { makeDefaultSelected } from '@/utils/items-utils'

/**
 * 전체 상태 초기화용 effect atom
 */
export const resetAllCookieMakeAtom = atom(null, (_get, set) => {
  /* ===== 쿠키 관련 ===== */
  set(mainCategoryAtom, MAIN_CATEGORY.FACE)
  set(subCategoryAtom, MAIN_CATEGORY_SUBS[MAIN_CATEGORY.FACE][0])
  set(selectedItemsAtom, makeDefaultSelected())

  /* ===== 수신자 관련 ===== */
  set(receiverRoleAtom, 'STUDENT')
  set(campusAtom, null)
  set(classAtom, null)
  set(nameAtom, null)
  set(mattermostAtom, null)

  /* ===== 편지 ===== */
  set(letterAtom, '')
})
