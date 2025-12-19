// src/store/atoms/receiverAtoms.ts
import { atom } from 'jotai'
import type { CampusValue } from '@/constant/user'
import type { ReceiverRole } from '@/types/cookie'

// 초기값: null로 설정하여 '선택 안 됨' 상태를 나타냅니다.
// CampusKey 타입에 CAMPUS 객체의 모든 키가 포함되어 있다고 가정합니다.
export const receiverRoleAtom = atom<ReceiverRole>('STUDENT')
export const campusAtom = atom<CampusValue | null>(null)
export const classAtom = atom<number | null>(null)
export const nameAtom = atom<string | null>(null)
export const mattermostAtom = atom<string | null>(null)

export type Receiver = {
  role: ReceiverRole
  campus: CampusValue | null
  classNumber: number | null
  name: string | null
  mmId: string | null
}

/**
 * 하나의 객체로 묶어 가져오고 싶을 때 사용 가능한 derived atom
 */
export const receiverAtom = atom((get) => ({
  role: get(receiverRoleAtom),
  campus: get(campusAtom),
  classNumber: get(classAtom),
  name: get(nameAtom),
  mmId: get(mattermostAtom),
}))
