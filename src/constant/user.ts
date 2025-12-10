// src/constants/user.ts
export const CAMPUS = {
  SEOUL: 'seoul',
  DAEJEON: 'daejeon',
  GWANGJU: 'gwangju',
  GUMI: 'gumi',
  BUSAN: 'busan',
} as const

export const CAMPUS_LABELS: Record<CampusKey, string> = {
  seoul: '서울',
  daejeon: '대전',
  gwangju: '광주',
  gumi: '구미',
  busan: '부산',
}

export type CampusKey = (typeof CAMPUS)[keyof typeof CAMPUS]

// 반 수: 서울 1~18반, 나머지 1~6반
export const CLASS_COUNTS: Record<CampusKey, number> = {
  seoul: 18,
  daejeon: 6,
  gwangju: 6,
  gumi: 6,
  busan: 6,
}

/**
 * duplicatedUserData: "특정(이미 등록된) 수신자" 예시 데이터
 * region은 CAMPUS 값(예: 'seoul')로 통일해서 비교를 쉽게 합니다.
 */
export const duplicatedUserData: Array<{
  name: string
  region: CampusKey
  class: number
}> = [
  { name: '이준영', region: 'seoul', class: 18 },
  { name: '김민재', region: 'gumi', class: 3 },
  { name: '강지석', region: 'gumi', class: 4 },
]

/**
 * getClassesForCampus: 주어진 캠퍼스의 반 목록을 반환 (1-based)
 */
export function getClassesForCampus(campus: CampusKey): number[] {
  const count = CLASS_COUNTS[campus] ?? 0
  return Array.from({ length: count }, (_, i) => i + 1)
}

/**
 * helper: duplicatedUserData에 해당 조합이 실제로 있는지 체크
 */
export function isDuplicatedUser(
  campus: CampusKey,
  classNum: number,
  name: string,
) {
  return duplicatedUserData.some(
    (d) => d.region === campus && d.class === classNum && d.name === name,
  )
}
