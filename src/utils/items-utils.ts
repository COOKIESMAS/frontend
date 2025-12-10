import {
  MAIN_CATEGORY_SUBS,
  type Item,
  type ItemsData,
  type MainCategoryKey,
  type SelectableSubCategoryKey,
  type SubCategoriesOf,
} from '@/constant/items'

function isSubCategoryOf<M extends MainCategoryKey>(
  main: M,
  sub: SelectableSubCategoryKey,
): sub is SubCategoriesOf<M> {
  return (
    MAIN_CATEGORY_SUBS[main] as readonly SelectableSubCategoryKey[]
  ).includes(sub)
}

function getItemsFor<M extends MainCategoryKey>(
  main: M,
  sub: SelectableSubCategoryKey,
  itemsData: ItemsData,
): Item[] {
  // 타입 가드: sub가 main의 서브카테고리인지 검사
  if (!isSubCategoryOf(main, sub)) return []

  // 여기서 TS는 sub 타입이 좁혀짐 → SubCategoriesOf<M>
  // 그럼 itemsData[main]도 SubCategoryRecord<M>으로 자동 좁혀짐
  const category = itemsData[main]

  // 이제 category[sub]는 무조건 존재하는 key로 간주됨
  const subObj = category[sub]

  if (!subObj) return []
  return subObj.data
}

export { isSubCategoryOf, getItemsFor }
