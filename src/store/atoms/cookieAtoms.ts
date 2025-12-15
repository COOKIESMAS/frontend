// src/store/cookieAtoms.ts
import { atom } from 'jotai'
import {
  type SelectedItems,
  type SelectableSubCategoryKey,
  type MainCategoryKey,
  MAIN_CATEGORY,
  MAIN_CATEGORY_SUBS,
} from '@/constant/items'
import { makeDefaultSelected } from '@/utils/items-utils'

/** atoms */
export const mainCategoryAtom = atom<MainCategoryKey>(MAIN_CATEGORY.FACE)
export const subCategoryAtom = atom<SelectableSubCategoryKey>(
  MAIN_CATEGORY_SUBS[MAIN_CATEGORY.FACE][0],
)
export const selectedItemsAtom = atom<SelectedItems>(makeDefaultSelected())
