import { editUserApi } from '@/services/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useEditUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editUserApi,
    onSuccess: () => {
      // 유저 정보 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
    },
  })
}
