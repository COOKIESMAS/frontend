/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi, type ApiError } from '@/utils/useApi'
import type { CookieItem } from '@/types/cookie'
import { useAtom } from 'jotai'
import {
  dDayCookieListAtom,
  dDayCurrentIndexAtom,
} from '@/store/dDayCookieAtoms'
import { DdayCookieComponent } from '@/components/DdayCookieComponent'

const DdayCookieContainer: React.FC = () => {
  const [cookies, setCookies] = useAtom(dDayCookieListAtom)
  const [currentIndex, setCurrentIndex] = useAtom(dDayCurrentIndexAtom)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()

  const fetchCookies = async () => {
    try {
      setIsLoading(true)
      setErrorMessage(null)

      const response = await useApi.get<CookieItem[]>('/cookies/', {
        params: { type: 'received' },
      })

      const data = response.data ?? []
      setCookies(data)

      if (data.length > 0) {
        setCurrentIndex((prev) => {
          const safe =
            ((prev % data.length) + data.length) % data.length
          return safe
        })
      } else {
        setCurrentIndex(0)
      }
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message =
        (apiError.response?.data as any)?.message ??
        (apiError.response?.data as any)?.detail ??
        '쿠키 목록을 불러오는 중 오류가 발생했습니다.'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeIndex = (nextIndex: number) => {
    if (!cookies.length) return
    const total = cookies.length
    const safe = ((nextIndex % total) + total) % total
    setCurrentIndex(safe)
  }

  /** 쿠키+말풍선 세트를 클릭했을 때 */
  const handleClickCookie = (cookieIndex: number) => {
    if (!cookies.length) return
    const total = cookies.length
    const safe = ((cookieIndex % total) + total) % total
    setCurrentIndex(safe)

    const cookie = cookies[safe]

    navigate('/d-day/detail', {
      state: { cookiePk: cookie.cookie_pk },
    })
  }

  const handleClickBack = () => {
    navigate('/home', { replace: true })
  }

  return (
    <DdayCookieComponent
      loading={isLoading}
      errorMessage={errorMessage}
      cookies={cookies}
      currentIndex={currentIndex}
      onRetry={fetchCookies}
      onClickBack={handleClickBack}
      onChangeIndex={handleChangeIndex}
      onClickCookie={handleClickCookie}
    />
  )
}

export default DdayCookieContainer
