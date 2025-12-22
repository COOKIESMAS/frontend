export type SignupStep = 'intro' | 'selectRole' | 'form' | 'code' | 'success'
export type SignupRole = 'student' | 'instructor'
export type RoleState = SignupRole | null

export type CampusKey = 'SEOUL' | 'DAEJEON' | 'GWANGJU' | 'GUMI' | 'BULG'

export interface CampusOption {
  key: CampusKey
  label: string
  maxClass: number
}

export const CAMPUS_OPTIONS: CampusOption[] = [
  { key: 'SEOUL', label: '서울', maxClass: 20 },
  { key: 'DAEJEON', label: '대전', maxClass: 6 },
  { key: 'GWANGJU', label: '광주', maxClass: 5 },
  { key: 'GUMI', label: '구미', maxClass: 6 },
  { key: 'BULG', label: '부울경', maxClass: 4 },
]
