import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import '../../styles/fonts.css'

const CookieFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'DNFBitBitv2';
    src: url('/DNFBitBitv2.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
`

export const Landing: React.FC = () => {
  const navigate = useNavigate()

  const [cookieImage] = useState(() => {
    const index = Math.floor(Math.random() * 4) + 1 // 1~4
    return `/mainpageCookie_0${index}.png`
  })

const handleGoogleLogin = () => {
  // 로딩 페이지로 이동
  navigate('/api/v1/auth/google/login')
}


  return (
    <>
      <CookieFontStyle />
      <PageWrapper>
        <ContentContainer>
          <TitleArea>
            <TitleText>
              <span className="cookies">COOKIES</span>
              <span className="mas">MAS</span>
            </TitleText>
            <TitleKorean>
              <span className="cookies">쿠키스</span>
              <span className="mas">마스</span>
            </TitleKorean>
          </TitleArea>

          <ImageArea>
            <BackgroundImage src="/mainpageback.png" alt="배경" />
            <CookieImage src={cookieImage} alt="쿠키" />
          </ImageArea>

          <Description>
            바쁘게 지나간 <HighlightSSAFY>SSAFY</HighlightSSAFY> 한 학기{'\n'}
            서로의 오븐에 마음을 구워 주는 시간
          </Description>

          <GoogleButton type="button" onClick={handleGoogleLogin}>
            <GoogleButtonInner>
              <GoogleLogo src="/googleLogo.png" alt="Google logo" />
              <ButtonText>Google 계정으로 로그인</ButtonText>
            </GoogleButtonInner>
          </GoogleButton>
        </ContentContainer>
      </PageWrapper>
    </>
  )
}

// ================= styled-components =================

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #e8c393;
  font-family: 'DNFBitBitv2', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
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
  margin-bottom: 2rem;
  margin-top: 2rem;
`

const TitleText = styled.h1`
  font-size: 20px;
  letter-spacing: 0.3em;
  margin-bottom: 8px;

  .cookies {
    color: #5b3a00;
  }

  .mas {
    color: #e83b40;
  }
`

const TitleKorean = styled.h2`
  font-size: 32px;
  letter-spacing: 0.1em;

  .cookies {
    color: #5b3a00;
  }

  .mas {
    color: #e83b40;
  }
`

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 260px;
  margin: 8px auto 24px;
`

const BackgroundImage = styled.img`
  width: 100%;
  display: block;
`

const CookieImage = styled.img`
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  width: 70%;
`

const Description = styled.p`
  white-space: pre-line;
  text-align: center;
  font-size: 14px;
  line-height: 1.6;
  color: #2c231c;
  margin-bottom: 32px;
`

const HighlightSSAFY = styled.span`
  color: #06bede;
`

const GoogleButton = styled.button`
  width: 100%;
  max-width: 320px;
  height: 52px;
  border-radius: 12px;
  background-color: #5b3a00;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: translateY(1px);
    opacity: 0.9;
  }
`

const GoogleButtonInner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const GoogleLogo = styled.img`
  height: 30px;
`

const ButtonText = styled.span`
  font-size: 14px;
  color: #ffffff;
`
