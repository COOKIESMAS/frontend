// src/store/effects/cookieRandomEffects.ts
import { atom } from 'jotai'
import {
  MAIN_CATEGORY_SUBS,
  itemsData,
  type SelectableSubCategoryKey,
  type MainCategoryKey,
  type SelectedItems,
} from '@/constant/items'
import { selectedItemsAtom } from '../atoms/cookieAtoms'
import { getAssetsForSub, makeDefaultSelected } from '@/utils/items-utils'

/**
 * write-only atom: 현재 상태(prev)를 기반으로 랜덤화한다.
 * - required: 항상 선택 (기본 ['body','eyes','mouth'])
 * - keepProbability: 각 비필수 파츠를 유지할 확률 (기본 0.5)
 */
export const randomizeSelectedItemsAtom = atom(
  null,
  (
    _get,
    set,
    payload?: {
      required?: SelectableSubCategoryKey[]
      keepProbability?: number
    },
  ) => {
    const required: SelectableSubCategoryKey[] = payload?.required ?? [
      'body',
      'eyes',
      'mouth',
    ]
    const keepProbability = payload?.keepProbability ?? 0.5

    // 이전 상태를 기반으로 시작 (이전 선택을 보존)
    const prev = (_get(selectedItemsAtom) ??
      makeDefaultSelected()) as SelectedItems
    const next: SelectedItems = { ...prev }

    // 모든 서브키를 배열로 수집 (타입이 정확하게 추론되도록)
    const mains = Object.keys(MAIN_CATEGORY_SUBS) as MainCategoryKey[]
    const allSubKeysArr: SelectableSubCategoryKey[] = []
    for (const m of mains) {
      for (const s of MAIN_CATEGORY_SUBS[m]) {
        allSubKeysArr.push(s)
      }
    }

    // 안전한 랜덤 픽 유틸
    const pickRandom = (arr: string[]): string | null =>
      arr.length ? arr[Math.floor(Math.random() * arr.length)] : null

    // 각 서브키를 순회하며 랜덤화 (required는 무조건 선택)
    for (const subKey of allSubKeysArr) {
      const assets = getAssetsForSub(subKey, itemsData)
      if (!assets.length) {
        next[subKey] = null
        continue
      }

      if (required.includes(subKey)) {
        next[subKey] = pickRandom(assets)
        continue
      }

      // 유지할지(이전 값 보존) vs 랜덤/비활성화 결정
      // 현재 동작: keepProbability 확률로 기존값(또는 랜덤값)을 유지
      // 구현: 확률로 '유지하지 않음'이면 랜덤 또는 null(50/50)으로 처리할 수도 있음.
      const keep = Math.random() < keepProbability
      if (keep) {
        // 유지하려면: 이전 값이 유효하면 그대로, 아니면 랜덤으로 채움
        next[subKey] = next[subKey] ?? pickRandom(assets)
      } else {
        // 유지하지 않는 경우: 랜덤으로 선택하거나 null로 할당(여기서는 랜덤 또는 null 50/50)
        const chooseAssetOrNull = Math.random() < 0.5
        next[subKey] = chooseAssetOrNull ? pickRandom(assets) : null
      }
    }

    // clothes 상호 배타 규칙: onePiece ↔ top/pants
    if (next.onePiece) {
      next.top = null
      next.pants = null
    } else if (next.top || next.pants) {
      next.onePiece = null
    }

    // 안전장치: 혹시 required가 비어있으면 채움
    for (const r of required) {
      if (!next[r]) {
        const assets = getAssetsForSub(r, itemsData)
        next[r] = assets.length
          ? assets[Math.floor(Math.random() * assets.length)]
          : null
      }
    }

    // 결과 반영
    set(selectedItemsAtom, next)
  },
)
