import {
  MAIN_CATEGORY_SUBS,
  type MainCategoryKey,
  type SelectableSubCategoryKey,
  type SubCategoriesOf,
  type ItemsData,
  type Item,
  type SelectedItems,
} from '@/constant/items'

/**
 * 타입 가드: 주어진 main에 sub가 포함되는지 검사
 */
export function isSubCategoryOf<M extends MainCategoryKey>(
  main: M,
  sub: SelectableSubCategoryKey,
): sub is SubCategoriesOf<M> {
  return (
    MAIN_CATEGORY_SUBS[main] as readonly SelectableSubCategoryKey[]
  ).includes(sub)
}

/**
 * 타입 안전한 조회 유틸: main, sub, itemsData 를 받아 Item[] 반환
 */
export function getItemsFor<M extends MainCategoryKey>(
  main: M,
  sub: SelectableSubCategoryKey,
  itemsData: ItemsData,
): Item[] {
  if (!isSubCategoryOf(main, sub)) return []
  const category = itemsData[main] // TS가 여기서 추론 가능
  const subObj = category[sub]
  if (!subObj) return []
  return subObj.data
}

/**
 * mainCategoryKey 를 찾아 반환 (없으면 null)
 */
export function findMainForSub(
  sub: SelectableSubCategoryKey,
): MainCategoryKey | null {
  const mains = Object.keys(MAIN_CATEGORY_SUBS) as MainCategoryKey[]
  for (const m of mains) {
    if (
      (MAIN_CATEGORY_SUBS[m] as readonly SelectableSubCategoryKey[]).includes(
        sub,
      )
    ) {
      return m
    }
  }
  return null
}

/**
 * 특정 sub 에 대해 itemsData에서 asset 문자열 목록을 반환
 */
export function getAssetsForSub(
  sub: SelectableSubCategoryKey,
  itemsData: ItemsData,
): string[] {
  const main = findMainForSub(sub)
  if (!main) return []
  const items = getItemsFor(main, sub, itemsData)
  return items.map((i) => i.asset).filter(Boolean)
}

// makeDefaultSelected: 초기 SelectedItems 생성 함수 (face 기본값 보장)
export function makeDefaultSelected(): SelectedItems {
  return {
    accessory: null,
    blush: null,
    body: 0, // 필수는 기본값
    eyes: 0,
    mouth: 0,
    hair: null,
    hat: null,
    onePiece: null,
    top: null,
    pants: null,
  }
}
