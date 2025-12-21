// src/utils/apiClient.ts
import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

/**
 * 백엔드 Base URL
 * - 기본값: http://localhost:8000/api/v1
 * - Vite 환경변수로 덮어쓰고 싶으면 .env에 VITE_API_BASE_URL 추가
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://backend-production-acf4.up.railway.app/api/v1'

/**
 * localStorage 에서 액세스 토큰을 가져오는 헬퍼
 * (리다이렉트로 받은 token을 어디에 저장할지는 이후 로직에서 결정)
 */
const ACCESS_TOKEN_KEY = 'accessToken'
const USER_NAME_KEY = 'accessToken'
const USER_STATUS_KEY = 'accessToken'

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(USER_NAME_KEY)
  localStorage.removeItem(USER_STATUS_KEY)
}

/**
 * 공용 axios 인스턴스
 * useApi.post('/end-point', {
 * key:value,
 * key2:value2
 * })
 *
 * useApi.get('/end-point')
 */
export const useApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

/**
 * 요청 인터셉터
 * - localStorage 에 저장된 토큰이 있다면 Authorization 헤더에 자동 추가
 */
useApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()

    if (token) {
      // headers가 undefined일 수 있어서 기본값 보장
      config.headers = config.headers ?? {}
      // AxiosRequestHeaders 는 index signature라 바로 할당 가능
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 * 공통 에러 타입
 * - 백엔드에서 내려주는 message / detail 등을 포함하도록 확장
 */
export type ApiErrorResponse = {
  message?: string
  detail?: string
  [key: string]: unknown
}

export type ApiError = AxiosError<ApiErrorResponse>

/**
 * 응답 인터셉터
 * - 401 등 공통 에러 처리 훅을 추가할 수 있음
 */
useApi.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const status = error?.response?.status
    if (status === 401) {
      clearAccessToken()
      alert('로그인 만료. 로그인 페이지로 돌아갑니다.')
      window.location.href = '/landing'
    }
    if (status === 403) {
      alert('허용되지 않은 페이지입니다.')
      window.location.href = '/home'
    }

    return Promise.reject(error)
  },
)
