import { useApi } from '@/utils/useApi'

export async function getUserApi() {
  const response = await useApi.get('/users/me')

  return response.data
}

type EditUserBody = Partial<{
  isOvenOpen: boolean
  isTutorialCompleted: boolean
  description: string
}>

type EditUserApiBody = Partial<{
  is_oven_open: boolean
  is_tutorial_completed: boolean
  description: string
}>

export async function editUserApi(body: EditUserBody) {
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
  }

  const response = await useApi.patch('/users/me', apiBody)
  return response.data
}
