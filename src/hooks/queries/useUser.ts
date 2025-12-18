import { getUserApi } from '@/services/user'
import type { User, UserResponse } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export function useUser() {
  const userQuery = useQuery<UserResponse, AxiosError, User>({
    queryFn: () => getUserApi(),
    queryKey: ['user', 'me'],
    select: (data) => {
      const mapUserResponse = (res: UserResponse): User => ({
        userPk: res.user_pk,
        googleEmail: res.google_email,
        campus: res.campus,
        classNumber: res.class_number,
        name: res.name,
        mmId: res.mm_id,
        role: res.role as User['role'],
        isVerified: res.is_verified,
        isOvenOpen: res.is_oven_open,
        isTutorialCompleted: res.is_tutorial_completed,
        description: res.description,
        sentCookiesCount: res.sent_cookies_count,
        receivedCookiesCount: res.received_cookies_count,
      })
      return mapUserResponse(data)
    },
  })

  return userQuery
}
