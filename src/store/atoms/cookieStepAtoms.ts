import { atom } from 'jotai'

export type CookieStep = 'step1' | 'step2' | 'step3' | 'finish'

export const cookieStepAtom = atom<CookieStep | null>(null)
