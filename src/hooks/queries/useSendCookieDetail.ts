import { getSendCookieDetailApi } from '@/services/cookie'
import type {
  SendCookieListResponse,
  SendCookieListResponseCamel,
} from '@/types/cookie'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export function useSendCookieDetail(id: string) {
  const userQuery = useQuery<
    SendCookieListResponse,
    AxiosError,
    SendCookieListResponseCamel
  >({
    queryFn: () => getSendCookieDetailApi(id),
    queryKey: ['user', 'me', 'cookie', 'send'],
  })

  return userQuery
}
