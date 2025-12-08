import { atom } from 'jotai'

interface DialogState {
  isOpen: boolean
  title: string
  onConfirm: () => void
  onCancel: () => void
  message?: string
  confirmText?: string
  cancelText?: string
}

export const dialogAtom = atom<DialogState>({
  isOpen: false,
  title: '',
  message: '',
  onConfirm: () => {},
  onCancel: () => {},
})
