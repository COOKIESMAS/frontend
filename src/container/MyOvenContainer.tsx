// src/containers/MyOvenContainer.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi, type ApiError } from '../utils/useApi'
import type { CookieItem } from '../types/cookie'
import { MyOvenComponent } from '../components/myoven/MyOvenComponent'

const MyOvenContainer: React.FC = () => {
  const [cookies, setCookies] = useState<CookieItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()

  // 올해 크리스마스 이전인지 판단 (1, 2번 케이스)
  const isBeforeXmas = (() => {
    const now = new Date()
    const year = now.getFullYear()
    const xmas = new Date(year, 11, 25) // 12월(11) 25일
    return now < xmas
  })()

  
const fetchCookies = async () => {
  try {
    setIsLoading(true)
    setErrorMessage(null)

    // ✅ 쿼리 파라미터로 type=received 명시
    const response = await useApi.get<CookieItem[]>('/cookies/', {
      params: {
        type: 'received',
      },
    })

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

  const handleClickShareLink = () => {
    const shareUrl = `${window.location.origin}`

    if (navigator.share) {
      // 모바일 공유 API
      navigator
        .share({
          title: '쿠키스마스 내 오븐',
          text: '내 오븐 링크를 공유할게요 🎄',
          url: shareUrl,
        })
        .catch(() => {})
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          window.alert('내 오븐 링크를 클립보드에 복사했어요!')
        })
        .catch(() => {
          window.alert('링크 복사에 실패했어요. 다시 시도해주세요.')
        })
    } else {
      window.prompt('아래 링크를 복사해서 공유해주세요:', shareUrl)
    }
  }

  return (
    <MyOvenComponent
      cookies={cookies}
      loading={isLoading}
      errorMessage={errorMessage}
      isBeforeXmas={isBeforeXmas}
      onRetry={fetchCookies}
      onClickBack={handleClickBack}
      onClickShareLink={handleClickShareLink}
    />
  )
}

export default MyOvenContainer
