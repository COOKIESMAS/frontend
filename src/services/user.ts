import { useApi } from '@/utils/useApi'

export async function getUserApi() {
  const response = await useApi.get('/users/me')

  return response.data
}
