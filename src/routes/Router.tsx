import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import GoogleConnectingPage from '../pages/GoogleConnectingPage'
import SignupPage from '../pages/SignupPage'
import MyOvenPage from '../pages/MyOvenPage'
import Finish from '@/pages/cookie/Finish'
import Step1MakeCookie from '@/pages/cookie/Step1MakeCookie'
import Step2ChooseReceiver from '@/pages/cookie/Step2ChooseReceiver'
import Step3WriteLetter from '@/pages/cookie/Step3WriteLetter'
import Home from '@/pages/Home'
import Layout from '@/components/Layout'
import SendList from '@/pages/cookie/SendList'
import CookieDetail from '@/pages/cookie/CookieDetail'
import MyPage from '@/pages/MyPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        {/* 구글 로그인 진입 로딩 */}
        <Route
          path="/auth/google/login"
          element={<GoogleConnectingPage />}
        />
        {/* ✅ 백엔드에서 리다이렉트해 주는 콜백 URL */}
        <Route path="/auth/callback" element={<GoogleConnectingPage />} />
        {/* SSAFY 인증 페이지 */}
        <Route path="/api/v1/auth/ssafy" element={<SignupPage />} />
        {/* 내 오븐 페이지 */}
        <Route path="/myoven" element={<MyOvenPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myoven" element={<MyOvenPage />} />
          <Route path="/mypage" element={<MyPage />} />

          {/* cookie 관련은 Layout 내부에 중첩 */}
          <Route path="/cookie">
            <Route index element={<Navigate to="step1" replace />} />
            <Route path="step1" element={<Step1MakeCookie />} />
            <Route path="step2" element={<Step2ChooseReceiver />} />
            <Route path="step3" element={<Step3WriteLetter />} />
            <Route path="finish" element={<Finish />} />
            <Route path="send" element={<SendList />} />
            <Route path=":id" element={<CookieDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
