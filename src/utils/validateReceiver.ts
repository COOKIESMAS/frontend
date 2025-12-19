import type { Receiver } from '@/store/atoms/receiverAtoms'

export const validateReceiver = (receiver: Receiver): string | null => {
  const name = receiver.name?.trim()
  const mattermost = receiver.mmId?.trim()

  if (receiver.role === 'STUDENT') {
    if (!receiver.campus) return '캠퍼스를 선택해주세요.'
    if (!receiver.classNumber) return '반을 선택해주세요.'
    if (!name) return '성함을 입력해주세요.'
  }

  if (receiver.role === 'TEACHER') {
    if (!name) return '성함을 입력해주세요.'
    if (!mattermost) return 'Mattermost 아이디를 입력해주세요.'
  }

  return null
}
