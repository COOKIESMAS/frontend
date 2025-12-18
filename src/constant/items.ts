export const MAIN_CATEGORY = {
  FACE: 'face',
  CLOTHES: 'clothes',
  DECORATION: 'decoration',
} as const

export type MainCategoryKey = (typeof MAIN_CATEGORY)[keyof typeof MAIN_CATEGORY]

export const SELECTABLE_SUB_CATEGORY = {
  BODY: 'body',
  EYES: 'eyes',
  MOUTH: 'mouth',
  HAIR: 'hair',
  BLUSH: 'blush',
  HAT: 'hat',
  TOP: 'top',
  PANTS: 'pants',
  ONE_PIECE: 'onePiece',
  ACCESSORY: 'accessory',
} as const

export const MAIN_CATEGORY_SUBS = {
  [MAIN_CATEGORY.FACE]: [
    SELECTABLE_SUB_CATEGORY.BODY,
    SELECTABLE_SUB_CATEGORY.EYES,
    SELECTABLE_SUB_CATEGORY.MOUTH,
    SELECTABLE_SUB_CATEGORY.HAIR,
    SELECTABLE_SUB_CATEGORY.BLUSH,
  ],
  [MAIN_CATEGORY.CLOTHES]: [
    SELECTABLE_SUB_CATEGORY.HAT,
    SELECTABLE_SUB_CATEGORY.TOP,
    SELECTABLE_SUB_CATEGORY.PANTS,
    SELECTABLE_SUB_CATEGORY.ONE_PIECE,
  ],
  [MAIN_CATEGORY.DECORATION]: [SELECTABLE_SUB_CATEGORY.ACCESSORY],
} as const

export const MAIN_CATEGORY_LABEL: Record<MainCategoryKey, string> = {
  face: '얼굴',
  clothes: '옷',
  decoration: '장식',
}

export const SUB_CATEGORY_LABEL: Record<SelectableSubCategoryKey, string> = {
  body: '몸',
  eyes: '눈',
  hair: '머리',
  mouth: '입',
  blush: '홍조',

  hat: '모자',
  onePiece: '원피스',
  top: '상의',
  pants: '하의',

  accessory: '악세서리',
}

export type SelectableSubCategoryKey =
  (typeof SELECTABLE_SUB_CATEGORY)[keyof typeof SELECTABLE_SUB_CATEGORY]

export type SubCategoriesOf<M extends MainCategoryKey> =
  (typeof MAIN_CATEGORY_SUBS)[M][number]

export interface Item {
  name: string
  asset: string
}

export type SubCategory = {
  type: string
  data: Item[]
}

export type SelectedItems = {
  [key in SelectableSubCategoryKey]: number | null
}

type SubCategoryRecord<M extends MainCategoryKey> = {
  [S in SubCategoriesOf<M>]: SubCategory
}

export type ItemsData = {
  [M in MainCategoryKey]: {
    type: string
  } & SubCategoryRecord<M>
}

export function compactDesignData(
  items: SelectedItems,
): Partial<Record<SelectableSubCategoryKey, number>> {
  return Object.fromEntries(
    (Object.entries(items) as [SelectableSubCategoryKey, number | null][])
      .filter(
        (entry): entry is [SelectableSubCategoryKey, number] =>
          entry[1] !== null,
      )
      .map(([key, value]) => [key, value + 1]),
  )
}

// Accessory Imports
// import accessory_1 from '@/assets/image/accessory/accessory_1.svg'
// import accessory_2 from '@/assets/image/accessory/accessory_2.svg'

// Blush Imports
// import blush_1 from '@/assets/image/blush/blush_1.svg'
// import blush_2 from '@/assets/image/blush/blush_2.svg'
// import blush_3 from '@/assets/image/blush/blush_3.svg'
// import blush_4 from '@/assets/image/blush/blush_4.svg'
// import blush_5 from '@/assets/image/blush/blush_5.svg'

// // Body Imports
// import body_1 from '@/assets/image/body/body_1.svg'
// import body_2 from '@/assets/image/body/body_2.svg'
// import body_3 from '@/assets/image/body/body_3.svg'
// import body_4 from '@/assets/image/body/body_4.svg'
// import body_5 from '@/assets/image/body/body_5.svg'
// import body_6 from '@/assets/image/body/body_6.svg'
// import body_7 from '@/assets/image/body/body_7.svg'
// import body_8 from '@/assets/image/body/body_8.svg'
// import body_9 from '@/assets/image/body/body_9.svg'
// import body_10 from '@/assets/image/body/body_10.svg'

// // Eyes Imports
// import eye_1 from '@/assets/image/eyes/eye_1.svg'
// import eye_2 from '@/assets/image/eyes/eye_2.svg'
// import eye_3 from '@/assets/image/eyes/eye_3.svg'
// import eye_4 from '@/assets/image/eyes/eye_4.svg'
// import eye_5 from '@/assets/image/eyes/eye_5.svg'
// import eye_6 from '@/assets/image/eyes/eye_6.svg'
// import eye_7 from '@/assets/image/eyes/eye_7.svg'
// import eye_8 from '@/assets/image/eyes/eye_8.svg'
// import eye_9 from '@/assets/image/eyes/eye_9.svg'
// import eye_10 from '@/assets/image/eyes/eye_10.svg'
// import eye_11 from '@/assets/image/eyes/eye_11.svg'
// import eye_12 from '@/assets/image/eyes/eye_12.svg'
// import eye_13 from '@/assets/image/eyes/eye_13.svg'
// import eye_14 from '@/assets/image/eyes/eye_14.svg'
// import eye_15 from '@/assets/image/eyes/eye_15.svg'

// // Hair Imports
// import hair_1 from '@/assets/image/hair/hair_1.svg'
// import hair_2 from '@/assets/image/hair/hair_2.svg'
// import hair_3 from '@/assets/image/hair/hair_3.svg'
// import hair_4 from '@/assets/image/hair/hair_4.svg'
// import hair_5 from '@/assets/image/hair/hair_5.svg'
// import hair_6 from '@/assets/image/hair/hair_6.svg'
// import hair_7 from '@/assets/image/hair/hair_7.svg'

// // Hat Imports
// import hat_1 from '@/assets/image/hat/hat_1.svg'
// import hat_2 from '@/assets/image/hat/hat_2.svg'
// import hat_3 from '@/assets/image/hat/hat_3.svg'
// import hat_4 from '@/assets/image/hat/hat_4.svg'
// import hat_5 from '@/assets/image/hat/hat_5.svg'
// import hat_6 from '@/assets/image/hat/hat_6.svg'
// import hat_7 from '@/assets/image/hat/hat_7.svg'
// import hat_8 from '@/assets/image/hat/hat_8.svg'

// // Mouth Imports
// import mouth_1 from '@/assets/image/mouth/mouth_1.svg'
// import mouth_2 from '@/assets/image/mouth/mouth_2.svg'
// import mouth_3 from '@/assets/image/mouth/mouth_3.svg'
// import mouth_4 from '@/assets/image/mouth/mouth_4.svg'
// import mouth_5 from '@/assets/image/mouth/mouth_5.svg'
// import mouth_6 from '@/assets/image/mouth/mouth_6.svg'
// import mouth_7 from '@/assets/image/mouth/mouth_7.svg'
// import mouth_8 from '@/assets/image/mouth/mouth_8.svg'
// import mouth_9 from '@/assets/image/mouth/mouth_9.svg'
// import mouth_10 from '@/assets/image/mouth/mouth_10.svg'
// import mouth_11 from '@/assets/image/mouth/mouth_11.svg'
// import mouth_12 from '@/assets/image/mouth/mouth_12.svg'
// import mouth_13 from '@/assets/image/mouth/mouth_13.svg'
// import mouth_14 from '@/assets/image/mouth/mouth_14.svg'
// import mouth_15 from '@/assets/image/mouth/mouth_15.svg'
// import mouth_16 from '@/assets/image/mouth/mouth_16.svg'
// import mouth_17 from '@/assets/image/mouth/mouth_17.svg'
// import mouth_18 from '@/assets/image/mouth/mouth_18.svg'
// import mouth_19 from '@/assets/image/mouth/mouth_19.svg'
// import mouth_20 from '@/assets/image/mouth/mouth_20.svg'

// // OnePiece Imports
// import onePiece_1 from '@/assets/image/onePiece/onePiece_1.svg'
// import onePiece_2 from '@/assets/image/onePiece/onePiece_2.svg'
// import onePiece_3 from '@/assets/image/onePiece/onePiece_3.svg'
// import onePiece_4 from '@/assets/image/onePiece/onePiece_4.svg'

// // Pants Imports
// import pants_1 from '@/assets/image/pants/pants_1.svg'
// import pants_2 from '@/assets/image/pants/pants_2.svg'
// import pants_3 from '@/assets/image/pants/pants_3.svg'
// import pants_4 from '@/assets/image/pants/pants_4.svg'
// import pants_5 from '@/assets/image/pants/pants_5.svg'

// // Top Imports
// import top_1 from '@/assets/image/top/top_1.svg'
// import top_2 from '@/assets/image/top/top_2.svg'
// import top_3 from '@/assets/image/top/top_3.svg'
// import top_4 from '@/assets/image/top/top_4.svg'
// import top_5 from '@/assets/image/top/top_5.svg'

// export const itemsData: ItemsData = {
//   face: {
//     type: '얼굴',
//     body: {
//       type: '몸',
//       data: [
//         { name: 'body_1', asset: body_1 },
//         { name: 'body_2', asset: body_2 },
//         { name: 'body_3', asset: body_3 },
//         { name: 'body_4', asset: body_4 },
//         { name: 'body_5', asset: body_5 },
//         { name: 'body_6', asset: body_6 },
//         { name: 'body_7', asset: body_7 },
//         { name: 'body_8', asset: body_8 },
//         { name: 'body_9', asset: body_9 },
//         { name: 'body_10', asset: body_10 },
//       ],
//     },
//     eyes: {
//       type: '눈',
//       data: [
//         { name: 'eye_1', asset: eye_1 },
//         { name: 'eye_2', asset: eye_2 },
//         { name: 'eye_3', asset: eye_3 },
//         { name: 'eye_4', asset: eye_4 },
//         { name: 'eye_5', asset: eye_5 },
//         { name: 'eye_6', asset: eye_6 },
//         { name: 'eye_7', asset: eye_7 },
//         { name: 'eye_8', asset: eye_8 },
//         { name: 'eye_9', asset: eye_9 },
//         { name: 'eye_10', asset: eye_10 },
//         { name: 'eye_11', asset: eye_11 },
//         { name: 'eye_12', asset: eye_12 },
//         { name: 'eye_13', asset: eye_13 },
//         { name: 'eye_14', asset: eye_14 },
//         { name: 'eye_15', asset: eye_15 },
//       ],
//     },
//     hair: {
//       type: '머리',
//       data: [
//         { name: 'hair_1', asset: hair_1 },
//         { name: 'hair_2', asset: hair_2 },
//         { name: 'hair_3', asset: hair_3 },
//         { name: 'hair_4', asset: hair_4 },
//         { name: 'hair_5', asset: hair_5 },
//         { name: 'hair_6', asset: hair_6 },
//         { name: 'hair_7', asset: hair_7 },
//       ],
//     },
//     mouth: {
//       type: '입',
//       data: [
//         { name: 'mouth_1', asset: mouth_1 },
//         { name: 'mouth_2', asset: mouth_2 },
//         { name: 'mouth_3', asset: mouth_3 },
//         { name: 'mouth_4', asset: mouth_4 },
//         { name: 'mouth_5', asset: mouth_5 },
//         { name: 'mouth_6', asset: mouth_6 },
//         { name: 'mouth_7', asset: mouth_7 },
//         { name: 'mouth_8', asset: mouth_8 },
//         { name: 'mouth_9', asset: mouth_9 },
//         { name: 'mouth_10', asset: mouth_10 },
//         { name: 'mouth_11', asset: mouth_11 },
//         { name: 'mouth_12', asset: mouth_12 },
//         { name: 'mouth_13', asset: mouth_13 },
//         { name: 'mouth_14', asset: mouth_14 },
//         { name: 'mouth_15', asset: mouth_15 },
//         { name: 'mouth_16', asset: mouth_16 },
//         { name: 'mouth_17', asset: mouth_17 },
//         { name: 'mouth_18', asset: mouth_18 },
//         { name: 'mouth_19', asset: mouth_19 },
//         { name: 'mouth_20', asset: mouth_20 },
//       ],
//     },
//     blush: {
//       type: '홍조',
//       data: [
//         { name: 'blush_1', asset: blush_1 },
//         { name: 'blush_2', asset: blush_2 },
//         { name: 'blush_3', asset: blush_3 },
//         { name: 'blush_4', asset: blush_4 },
//         { name: 'blush_5', asset: blush_5 },
//       ],
//     },
//   },
//   clothes: {
//     type: '옷',
//     hat: {
//       type: '모자',
//       data: [
//         { name: 'hat_1', asset: hat_1 },
//         { name: 'hat_2', asset: hat_2 },
//         { name: 'hat_3', asset: hat_3 },
//         { name: 'hat_4', asset: hat_4 },
//         { name: 'hat_5', asset: hat_5 },
//         { name: 'hat_6', asset: hat_6 },
//         { name: 'hat_7', asset: hat_7 },
//         { name: 'hat_8', asset: hat_8 },
//       ],
//     },
//     onePiece: {
//       type: '원피스',
//       data: [
//         { name: 'onePiece_1', asset: onePiece_1 },
//         { name: 'onePiece_2', asset: onePiece_2 },
//         { name: 'onePiece_3', asset: onePiece_3 },
//         { name: 'onePiece_4', asset: onePiece_4 },
//       ],
//     },
//     pants: {
//       type: '하의',
//       data: [
//         { name: 'pants_1', asset: pants_1 },
//         { name: 'pants_2', asset: pants_2 },
//         { name: 'pants_3', asset: pants_3 },
//         { name: 'pants_4', asset: pants_4 },
//         { name: 'pants_5', asset: pants_5 },
//       ],
//     },
//     top: {
//       type: '상의',
//       data: [
//         { name: 'top_1', asset: top_1 },
//         { name: 'top_2', asset: top_2 },
//         { name: 'top_3', asset: top_3 },
//         { name: 'top_4', asset: top_4 },
//         { name: 'top_5', asset: top_5 },
//       ],
//     },
//   },
//   decoration: {
//     type: '장식',
//     accessory: {
//       type: '악세서리',
//       data: [
//         { name: 'accessory_1', asset: accessory_1 },
//         { name: 'accessory_2', asset: accessory_2 },
//       ],
//     },
//   },
// }
