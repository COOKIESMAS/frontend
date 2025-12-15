import { getCookiePartsApi } from '@/services/asset'
import type { CookiePartsResponse } from '@/types/asset'
import { useQuery } from '@tanstack/react-query'

export function useCookieParts() {
  const userQuery = useQuery<CookiePartsResponse>({
    queryFn: () => getCookiePartsApi(),
    queryKey: ['asset', 'cookie', 'part'],
  })

  return userQuery
}
