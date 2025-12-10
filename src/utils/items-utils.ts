import {
  MAIN_CATEGORY_SUBS,
  type MainCategoryKey,
  type SelectableSubCategoryKey,
  type SubCategoriesOf,
  type ItemsData,
  type Item,
  type SelectedItems,
  itemsData,
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
    body: itemsData.face.body.data[0].asset,
    eyes: itemsData.face.eyes.data[0].asset,
    mouth: itemsData.face.mouth.data[0].asset,
    hair: null,
    blush: null,
    hat: null,
    top: null,
    pants: null,
    onePiece: null,
    accessory: null,
  }
}
