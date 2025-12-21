import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi, type ApiError } from '../utils/useApi'
import type { CookieItem } from '../types/cookie'
import BottomNavigation from '@/components/BottomNavigation'
import { OvenComponent } from '@/components/OvenComponent'
import { useRequiredParam } from '@/hooks/useRequiredParam'

const OvenContainer: React.FC = () => {
  const [cookies, setCookies] = useState<CookieItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const targetId = useRequiredParam('id')

  const navigate = useNavigate()

  const fetchCookies = async () => {
    try {
      setIsLoading(true)
      setErrorMessage(null)

      // ✅ 쿼리 파라미터로 type=received 명시
      const response = await useApi.get<CookieItem[]>('/cookies/', {
        params: {
          type: 'received',
          target_id: targetId,
        },
      })

      console.log(response.data)

      setCookies(response.data ?? [])
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message =
        apiError.response?.data?.message ??
        apiError.response?.data?.detail ??
        '오븐 정보를 불러오는 중 오류가 발생했습니다.'

      setErrorMessage(message)

      if (apiError.response?.status === 401) {
        navigate('/', { replace: true })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchCookies()
  }, [])

  const handleClickBack = () => {
    navigate('/home', { replace: true })
  }

  return (
    <>
      <OvenComponent
        cookies={cookies}
        loading={isLoading}
        errorMessage={errorMessage}
        onRetry={() => navigate('/home')}
        onClickBack={handleClickBack}
      />
      <BottomNavigation />
    </>
  )
}

export default OvenContainer
