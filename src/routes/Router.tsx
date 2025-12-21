// Router.tsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './RouteGuard' // 경로 확인 필요

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
import MyPage from '@/pages/mypage/MyPage'
import NoticePage from '@/pages/NoticePage'
import CookieStepGuard from './CookieStepGuard'
import EditCookiePage from '@/pages/mypage/edit/EditCookiePage'
import OvenPage from '@/pages/oven/OvenPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔒 로그인하지 않은 사용자만 접근 가능 구역 */}
        <Route element={<PublicRoute />}>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/auth/google/login" element={<GoogleConnectingPage />} />
          <Route path="/auth/callback" element={<GoogleConnectingPage />} />
        </Route>

        {/* 🛡️ 로그인한 사용자만 접근 가능 구역 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/api/v1/auth/ssafy" element={<SignupPage />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/myoven" element={<MyOvenPage />} />
            <Route path="/oven/:id" element={<OvenPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/edit/cookie" element={<EditCookiePage />} />

            <Route path="/notice" element={<NoticePage />} />

            <Route path="/cookie">
              <Route index element={<Navigate to="step1" replace />} />
              <Route path="step1" element={<Step1MakeCookie />} />
              {/*  접근 제한 */}
              <Route
                element={
                  <CookieStepGuard allow={['step2', 'step3', 'finish']} />
                }
              >
                <Route path="step2" element={<Step2ChooseReceiver />} />
                <Route path="step3" element={<Step3WriteLetter />} />
                <Route path="finish" element={<Finish />} />
              </Route>

              <Route path="send" element={<SendList />} />
              <Route path=":id" element={<CookieDetail />} />
            </Route>
          </Route>
        </Route>

        {/* 잘못된 경로 처리 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
