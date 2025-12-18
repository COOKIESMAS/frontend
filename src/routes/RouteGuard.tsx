import { Navigate, Outlet } from 'react-router-dom'

/**
 * 로그인한 사용자만 접근 가능
 */
export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    // 로그인 안 되어 있으면 랜딩으로 리다이렉트
    return <Navigate to="/landing" replace />
  }

  return <Outlet />
}

/**
 * 로그인 안 한 사용자만 접근 가능 (랜딩, 로그인 페이지 등)
 */
export const PublicRoute = () => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    // 이미 로그인 되어 있으면 홈으로 리다이렉트
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
