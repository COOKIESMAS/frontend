import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import GoogleConnectingPage from '../pages/GoogleConnectingPage'
import SignupPage from '../pages/SignupPage'
import MyOvenPage from '../pages/MyOvenPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* 구글 로그인 진입 로딩 */}
        <Route path="/api/v1/auth/google/login" element={<GoogleConnectingPage />} />
        {/* ✅ 백엔드에서 리다이렉트해 주는 콜백 URL */}
        <Route path="/auth/callback" element={<GoogleConnectingPage />} />
        {/* SSAFY 인증 페이지 */}
        <Route path="/api/v1/auth/ssafy" element={<SignupPage />} />
        {/* 내 오븐 페이지 */}
        <Route path="/myoven" element={<MyOvenPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
