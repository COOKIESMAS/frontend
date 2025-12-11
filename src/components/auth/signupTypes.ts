export type SignupStep = 'intro' | 'selectRole' | 'form' | 'code' | 'success'
export type SignupRole = 'student' | 'instructor'
export type RoleState = SignupRole | null

export type CampusKey = 'SEOUL' | 'DAEJEON' | 'GWANGJU' | 'GUMI' | 'BULG'

export interface CampusOption {
  key: CampusKey
  label: string
  maxClass: number
}

// TODO: 백엔드에서 로드하도록 변경 예정
export const CAMPUS_OPTIONS: CampusOption[] = [
  { key: 'SEOUL', label: '서울', maxClass: 22 },
  { key: 'DAEJEON', label: '대전', maxClass: 8 },
  { key: 'GWANGJU', label: '광주', maxClass: 6 },
  { key: 'GUMI', label: '구미', maxClass: 6 },
  { key: 'BULG', label: '부울경', maxClass: 4 },
]
