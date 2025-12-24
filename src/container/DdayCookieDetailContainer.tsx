/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApi, type ApiError } from '@/utils/useApi'
import type { CookieItem } from '@/types/cookie'
import { useAtom } from 'jotai'
import { dDayCookieListAtom } from '@/store/dDayCookieAtoms'
import { DdayCookieDetailComponent } from '@/components/DdayCookieDetailComponent'

interface LocationState {
  cookiePk?: number
}

const DdayCookieDetailContainer: React.FC = () => {
  const [cookies] = useAtom(dDayCookieListAtom)
  const [cookie, setCookie] = useState<CookieItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state || {}) as LocationState
  const cookiePk = state.cookiePk

  const loadCookie = async () => {
    try {
      setLoading(true)
      setErrorMessage(null)

      // 1) 먼저 store에서 찾기
      if (cookies.length && cookiePk != null) {
        const found = cookies.find((c) => c.cookie_pk === cookiePk)
        if (found) {
          setCookie(found)
          return
        }
      }

      // 2) 없으면 단일 쿠키 조회 API 사용
      if (cookiePk == null) {
        throw new Error('쿠키 ID가 전달되지 않았습니다.')
      }

      const response = await useApi.get<CookieItem[]>('/cookies/', {
        params: { cookie_id: cookiePk },
      })

      const list = response.data ?? []
      if (!list.length) {
        throw new Error('쿠키 정보를 찾을 수 없습니다.')
      }

      setCookie(list[0])
    } catch (err) {
      const apiError = err as ApiError
      const message =
        (apiError.response?.data as any)?.message ??
        (apiError.response?.data as any)?.detail ??
        apiError.message ??
        '쿠키 정보를 불러오는 중 오류가 발생했습니다.'
      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadCookie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookiePk])

  const handleClose = () => {
    // 1번 페이지로 복귀
    navigate('/d-day')
  }

  return (
    <DdayCookieDetailComponent
      loading={loading}
      errorMessage={errorMessage}
      cookie={cookie}
      onClickClose={handleClose}
      onRetry={loadCookie}
    />
  )
}

export default DdayCookieDetailContainer
