import { bakeCookieApi } from '@/services/cookie'
import { useMutation } from '@tanstack/react-query'

export function useBakeCookie() {
  const checkEmailCodeMutation = useMutation({
    mutationFn: bakeCookieApi,
  })

  return checkEmailCodeMutation
}
