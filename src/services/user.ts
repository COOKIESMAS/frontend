import type { CookieDesignData } from '@/types/cookie'
import { useApi } from '@/utils/useApi'

export async function getUserApi() {
  const response = await useApi.get('/users/me')

  return response.data
}

type EditUserBody = Partial<{
  isOvenOpen: boolean
  isTutorialCompleted: boolean
  description: string
  designData: CookieDesignData
}>

type EditUserApiBody = Partial<{
  is_oven_open: boolean
  is_tutorial_completed: boolean
  description: string
  design_data: CookieDesignData
}>

export async function editUserApi(body: EditUserBody) {
  console.log(body)
  const filteredDesignData: CookieDesignData = Object.fromEntries(
    Object.entries(body.designData || {})
      .map(([key, value]) => [
        key,
        value === null ? value : value === 0 ? 1 : value, // 0이면 +1을 하고, null이면 그대로 두기
      ])
      .filter(([, value]) => value !== null), // null인 값은 마지막에 필터링
  ) as CookieDesignData

  console.log(filteredDesignData)

  const apiBody: EditUserApiBody = {
    ...(body.isOvenOpen !== undefined && {
      is_oven_open: body.isOvenOpen,
    }),
    ...(body.isTutorialCompleted !== undefined && {
      is_tutorial_completed: body.isTutorialCompleted,
    }),
    ...(body.description !== undefined && {
      description: body.description,
    }),
    ...(Object.keys(filteredDesignData).length > 0 && {
      design_data: filteredDesignData,
    }),
  }

  const response = await useApi.patch('/users/me', apiBody)
  return response.data
}
