import { getSendCookieListApi } from '@/services/cookie'
import type {
  SendCookieListResponse,
  SendCookieListResponseCamel,
} from '@/types/cookie'
import { mapSendCookieListToCamel } from '@/utils/cookieMapper'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export function useSendCookieList() {
  const userQuery = useQuery<
    SendCookieListResponse,
    AxiosError,
    SendCookieListResponseCamel
  >({
    queryFn: getSendCookieListApi,
    queryKey: ['user', 'me', 'cookie', 'send'],
    select: mapSendCookieListToCamel,
  })

  return userQuery
}
