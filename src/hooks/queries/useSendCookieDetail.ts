import { getSendCookieDetailApi } from '@/services/cookie'
import type {
  SendCookieDetailResponse,
  SendCookieDetailResponseCamel,
} from '@/types/cookie'
import { mapSendCookieListToCamel } from '@/utils/cookieMapper'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export function useSendCookieDetail(id: string) {
  const userQuery = useQuery<
    SendCookieDetailResponse,
    AxiosError,
    SendCookieDetailResponseCamel
  >({
    queryFn: () => getSendCookieDetailApi(id),
    queryKey: ['user', 'me', 'cookie', 'send', id],
    select: mapSendCookieListToCamel,
  })

  return userQuery
}
