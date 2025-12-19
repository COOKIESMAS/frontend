import type { SendCookieRequest } from '@/types/cookie'
import { useApi } from '@/utils/useApi'

export async function bakeCookieApi(body: SendCookieRequest) {
  const response = await useApi.post('/cookies/', body)

  return response.data
}

export async function getSendCookieListApi() {
  const response = await useApi.get('/cookies/?type=sent')

  return response.data
}

export async function getSendCookieDetailApi(cookieId: string) {
  const response = await useApi.get(`/cookies/?cookie_id=${cookieId}`)

  console.log(response.data)

  return response.data
}
