import { atom } from 'jotai'

export const authTokenAtom = atom<string | null>(null)
export const userNameAtom = atom<string>('')
export const userStatusAtom = atom<'guest' | 'verified' | null>(
  null,
)
