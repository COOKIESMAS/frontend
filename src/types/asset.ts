import type { SelectableSubCategoryKey } from '@/constant/items'

export type CookiePartsResponse = {
  [K in SelectableSubCategoryKey]: string[]
}
