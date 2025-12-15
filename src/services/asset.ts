import { useApi } from '@/utils/useApi'

export async function getCookiePartsApi() {
  const response = await useApi.get('/assets/')

  return response.data
}
