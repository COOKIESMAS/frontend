import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import '../../styles/fonts.css'

export const Landing: React.FC = () => {
  const navigate = useNavigate()

  const [cookieImage] = useState(() => {
    const index = Math.floor(Math.random() * 4) + 1 // 1~4
    return `/mainpageCookie_0${index}.png`
  })

  const handleGoogleLogin = () => {
    // ✅ 프론트 라우트로 이동 → 여기서 백엔드 /auth/google/login 으로 redirect
    navigate('/auth/google/login')
  }

  return (
    <>
      <LandingFontStyle />
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
            <GlowCircle />
            <CookieImage src={cookieImage} alt="쿠키" />
          </ImageArea>

          <Description>
            바쁘게 지나간 <HighlightSSAFY>SSAFY</HighlightSSAFY> 한 학기{'\n'}
            서로의 오븐에 마음을 구워 주는 시간
          </Description>

          {/* 🔥 버튼을 맨 아래로 밀기 위해 margin-top: auto 적용됨 */}
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

//#region styled-components

/**
 * 랜딩 전용 폰트 로딩
 * - COOKIESMAS : Galmuri14, 25px
 * - 쿠키스마스 : DNFBitBitv2, 64px
 * - 설명 텍스트 : Galmuri14, 18px
 * - 버튼 텍스트 : MoneygraphyPixel, 16px
 */
const LandingFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Galmuri14';
    src: url('/fonts/Galmuri14.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'DNFBitBitv2';
    src: url('/fonts/DNFBitBitv2.otf') format('opentype');
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
 * width는 최대 375px, 높이는 100vh
 * 375px 초과일 경우 가운데 정렬
 */
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* 🔥 화면 세로 꽉 채우기 */
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: #e8c393;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh; /* 🔥 내부 컨테이너도 세로로 꽉 채우기 */
  padding: 32px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  gap: 24px;

  @media (min-height: 740px) {
    padding-top: 48px;
    padding-bottom: 56px;
    gap: 32px;
  }
`

const TitleArea = styled.header`
  text-align: center;
  margin-top: 16px;
`

/** COOKIESMAS - Galmuri14, 25px */
const TitleText = styled.h1`
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 25px;
  letter-spacing: 0.3em;
  margin-bottom: 8px;

  .cookies {
    color: #5b3a00;
  }

  .mas {
    color: #e83b40;
  }
`

/** 쿠키스마스 - DNFBitBitv2, 64px */
const TitleKorean = styled.h2`
  font-family: 'DNFBitBitv2', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 54px;
  letter-spacing: 0.1em;
  line-height: 1;

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
  margin: 8px auto 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`

// 후광
const GlowCircle = styled.div`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 120, 80, 0.8) 0%,
    rgba(255, 120, 80, 0.6) 50%,
    rgba(255, 160, 131, 0.6) 70%,
    rgba(255, 120, 80, 0) 80%
  );
  filter: blur(15px);
`

const CookieImage = styled.img`
  position: relative; /* 이제 absolute 말고 relative 로 가운데 올리기 */
  width: 180px;
  height: auto;
`


/** 설명 텍스트 - Galmuri14, 18px */
const Description = styled.p`
  white-space: pre-line;
  text-align: center;
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #2c231c;
  margin-bottom: 8px;
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

  /* 🔥 위의 요소들이 차지하고 남은 공간을 전부 먹고,
     버튼이 항상 아래쪽으로 붙는 효과 */
  margin-top: auto;

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

/** 버튼 텍스트 - MoneygraphyPixel, 16px */
const ButtonText = styled.span`
  font-family: 'MoneygraphyPixel', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  color: #ffffff;
`

//#endregion
