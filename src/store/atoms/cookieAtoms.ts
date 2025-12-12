// src/store/cookieAtoms.ts
import { atom } from 'jotai'
import {
  type SelectedItems,
  type SelectableSubCategoryKey,
  type MainCategoryKey,
} from '@/constant/items'
import { makeDefaultSelected } from '@/utils/items-utils'

/** atoms */
export const mainCategoryAtom = atom<MainCategoryKey>('face')
export const subCategoryAtom = atom<SelectableSubCategoryKey>('body')
export const selectedItemsAtom = atom<SelectedItems>(makeDefaultSelected())
