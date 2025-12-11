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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        {/* 구글 로그인 진입 로딩 */}
        <Route path="/api/v1/auth/google/login" element={<GoogleConnectingPage />} />
        {/* ✅ 백엔드에서 리다이렉트해 주는 콜백 URL */}
        <Route path="/auth/callback" element={<GoogleConnectingPage />} />
        {/* SSAFY 인증 페이지 */}
        <Route path="/api/v1/auth/ssafy" element={<SignupPage />} />
        {/* 내 오븐 페이지 */}
        <Route path="/myoven" element={<MyOvenPage />} />

        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/cookie">
          {/* /cookie로 들어오면 /cookie/step1로 리다이렉트 */}
          <Route index element={<Navigate to="step1" replace />} />
          <Route path="step1" element={<Step1MakeCookie />} />
          <Route path="step2" element={<Step2ChooseReceiver />} />
          <Route path="step3" element={<Step3WriteLetter />} />
          <Route path="finish" element={<Finish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
