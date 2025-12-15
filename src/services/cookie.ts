import type { SendCookieRequest } from '@/types/cookie'
import { useApi } from '@/utils/useApi'

export async function bakeCookieApi(body: SendCookieRequest) {
  const response = await useApi.post('/cookies/', body)

  return response.data
}
