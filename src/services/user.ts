import { compactDesignData, type SelectedItems } from '@/constant/items'
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
  const filteredDesignData =
    body.designData && compactDesignData(body.designData as SelectedItems)

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
    ...(filteredDesignData && {
      design_data: filteredDesignData,
    }),
  }

  const response = await useApi.patch('/users/me', apiBody)
  return response.data
}
