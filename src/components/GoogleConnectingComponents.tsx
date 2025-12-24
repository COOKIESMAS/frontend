// src/components/GoogleConnectingComponents.tsx
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { useSetAtom } from 'jotai'
import { API_BASE_URL, setAccessToken } from '../utils/useApi'
import { authTokenAtom, userNameAtom, userStatusAtom } from '@/store/auth'


const GoogleConnectingComponents: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // jotai atom setter
  const setAuthToken = useSetAtom(authTokenAtom)
  const setUserName = useSetAtom(userNameAtom)
  const setUserStatus = useSetAtom(userStatusAtom)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')
    const status = searchParams.get('status') // "guest" | "verified"
    const userName = searchParams.get('user_name')

    // ✅ 1) 콜백 단계: token 이 존재하면, 로그인 완료 처리
    if (token) {
      // 1-1) axios 헤더용 토큰 설정 (기존 유틸)
      setAccessToken(token)

      // 1-2) jotai 전역 상태에 토큰/유저 정보 저장
      setAuthToken(token)
      setUserName(userName ?? '')
      setUserStatus(
        (status === 'guest' || status === 'verified')
          ? status
          : 'guest',
      )

      // 1-3) 로컬스토리지에도 필요 시 보관
      if (userName) {
        localStorage.setItem('userName', userName)
      }
      if (status) {
        localStorage.setItem('userStatus', status)
      }
      localStorage.setItem('accessToken', token)

      // 1-4) 상태에 따라 다음 페이지로 라우팅
      if (status === 'guest') {
        // 처음 가입된 사람: SSAFY 인증 플로우로
        navigate('/api/v1/auth/ssafy', { replace: true })
      } else if (status === 'verified') {
        // 이미 정회원
        navigate('/', { replace: true })
      } else {
        // status가 없거나 알 수 없는 값이면 일단 홈으로
        navigate('/', { replace: true })
      }
      return
    }

    // ✅ 2) 최초 진입 단계: token 이 없으면 OAuth 플로우 시작
    const loginUrl = `${API_BASE_URL}/auth/google/login`
    window.location.href = loginUrl
  }, [
    location.search,
    navigate,
    setAuthToken,
    setUserName,
    setUserStatus,
  ])

  return (
    <>
      <ConnectingFontStyle />
      <PageWrapper>
        <ContentContainer>
          <TitleArea>
            <TitleEnglish>
              <span className="cookies">COOKIES</span>
              <span className="mas">MAS</span>
            </TitleEnglish>
          </TitleArea>

          <CookieImage
            src="/mainpageCookie_02.png"
            alt="쿠키"
          />

          <MessageMain>구글 계정 연결 중...</MessageMain>
          <MessageSub>잠시만 기다려주세요!</MessageSub>
        </ContentContainer>
      </PageWrapper>
    </>
  )
}

export default GoogleConnectingComponents

//#region styled-components


/** 폰트:
 * - COOKIESMAS : Galmuri14, 25px
 * - "구글 계정 연결 중..." : MoneygraphyPixel, 24px
 * - "잠시만 기다려주세요!" : Galmuri14, 16px
 */
const ConnectingFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Galmuri14';
    src: url('/fonts/Galmuri14.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'MoneygraphyPixel';
    src: url('/fonts/Moneygraphy-Pixel.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
`

/**
 * width: max 375px, height: 100vh
 * 화면이 넓으면 중앙에 정렬
 */
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: #e8c393;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  padding: 32px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const TitleArea = styled.header`
  text-align: center;
  margin-bottom: 40px;
`

/** COOKIESMAS - Galmuri14, 25px */
const TitleEnglish = styled.h1`
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 25px;
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

/** "구글 계정 연결 중..." - MoneygraphyPixel, 24px */
const MessageMain = styled.p`
  font-family: 'MoneygraphyPixel', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  margin-bottom: 8px;
  color: #2c231c;
`

/** "잠시만 기다려주세요!" - Galmuri14, 16px */
const MessageSub = styled.p`
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  color: #2c231c;
`
//#endregion
