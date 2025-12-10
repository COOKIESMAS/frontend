// src/components/GoogleConnectingComponents.tsx
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { API_BASE_URL, setAccessToken } from '../utils/useApi'

const GoogleConnectingComponents: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')
    const status = searchParams.get('status') // "guest" | "verified"
    const userName = searchParams.get('user_name')

    // ✅ 1) 콜백 단계: token 이 존재하면, 로그인 완료 처리
    if (token) {
      // 토큰 저장
      setAccessToken(token)

      // 부가 정보 저장 (원하면 jotai 전역 상태로 빼도 됨)
      if (userName) {
        localStorage.setItem('userName', userName)
      }
      if (status) {
        localStorage.setItem('userStatus', status)
      }

    // 상태에 따라 다음 페이지로 라우팅
    if (status === 'guest') {
      // 처음 가입된 사람
      navigate('/api/v1/auth/ssafy', { replace: true })
    } else if (status === 'verified') {
      // 이미 가입된 사람
      navigate('/home', { replace: true })
    } else {
      // status가 없거나 알 수 없는 값이면 일단 홈으로
      navigate('/home', { replace: true })
    }
      return
    }

    // ✅ 2) 최초 진입 단계: token 이 없으면 OAuth 플로우 시작
    const loginUrl = `${API_BASE_URL}/auth/google/login`
    window.location.href = loginUrl
  }, [location.search, navigate])

  return (
    <PageWrapper>
      <ContentContainer>
        <TitleArea>
          <TitleEnglish>
            <span className="cookies">COOKIES</span>
            <span className="mas">MAS</span>
          </TitleEnglish>
        </TitleArea>

        <CookieImage src="/mainpageCookie_02.png" alt="쿠키" />

        <MessageMain>구글 계정 연결 중...</MessageMain>
        <MessageSub>잠시만 기다려주세요!</MessageSub>
      </ContentContainer>
    </PageWrapper>
  )
}

export default GoogleConnectingComponents

// ===== styled-components =====

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #e8c393;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 32px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleArea = styled.header`
  text-align: center;
  margin-bottom: 40px;
`

const TitleEnglish = styled.h1`
  font-size: 20px;
  letter-spacing: 0.3em;

  .cookies {
    color: #5b3a00;
  }

  .mas {
    color: #e83b40;
  }
`

const CookieImage = styled.img`
  width: 180px;
  margin-bottom: 40px;
`

const MessageMain = styled.p`
  font-size: 20px;
  margin-bottom: 8px;
  color: #2c231c;
`

const MessageSub = styled.p`
  font-size: 14px;
  color: #2c231c;
`
