/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/DdayCookieComponent.tsx
import React, { useState, type TouchEvent } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import type { CookieDesignImgDataCamel, CookieItem } from '@/types/cookie'
import CookieImageRenderer2 from './cookie/CookieImageRenderer2'

interface DdayCookieComponentProps {
  loading: boolean
  errorMessage: string | null
  cookies: CookieItem[]
  currentIndex: number
  onRetry?: () => void
  onClickBack: () => void
  onChangeIndex: (nextIndex: number) => void
  /** 쿠키 + 말풍선 세트를 클릭했을 때 (인덱스 기반) */
  onClickCookie: (cookieIndex: number) => void
}

type SlideDirection = 'left' | 'right' | null

export const DdayCookieComponent: React.FC<DdayCookieComponentProps> = ({
  loading,
  errorMessage,
  cookies,
  currentIndex,
  onRetry,
  onClickBack,
  onChangeIndex,
  onClickCookie,
}) => {
  const [slideDirection, setSlideDirection] =
    useState<SlideDirection>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const hasCookies = cookies.length > 0
  const total = cookies.length
  const receivedCount = total

  const triggerSlide = (dir: Exclude<SlideDirection, null>) => {
    setSlideDirection(null)
    // 다음 render 사이클 이후 방향을 넣어 애니메이션 재시작
    requestAnimationFrame(() => setSlideDirection(dir))
  }

  const goPrev = () => {
    if (!total) return
    const nextIndex = (currentIndex - 1 + total) % total
    triggerSlide('right')
    onChangeIndex(nextIndex)
  }

  const goNext = () => {
    if (!total) return
    const nextIndex = (currentIndex + 1) % total
    triggerSlide('left')
    onChangeIndex(nextIndex)
  }


  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasCookies) return
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasCookies || touchStartX === null) return
    const endX = e.changedTouches[0].clientX
    const diff = endX - touchStartX
    const THRESHOLD = 40

    if (Math.abs(diff) > THRESHOLD) {
      if (diff > 0) {
        goPrev()
      } else {
        goNext()
      }
    }
    setTouchStartX(null)
  }

  /** 원형 캐러셀에 표시할 쿠키 5개(또는 그 이하) 계산 */
  const getVisibleCookies = () => {
    if (!total) return []

    // 항상 8등분 기준으로 5슬롯(-2, -1, 0, 1, 2)만 사용
    const ANGLE_STEP = 45 // 360 / 8
    const BASE_ANGLE = -90
    const offsets = [-2, -1, 0, 1, 2]

    return offsets.map((offset) => {
      const sourceIndex =
        ((currentIndex + offset) % total + total) % total
      const cookie = cookies[sourceIndex]
      const angle = BASE_ANGLE + offset * ANGLE_STEP
      const isCenter = offset === 0

      return { cookie, angle, isCenter, sourceIndex }
    })
  }


  const visibleCookies = getVisibleCookies()

  // ───────────── 로딩 ─────────────
  if (loading) {
    return (
      <PageWrapper>
        <ContentContainer>
          <CenterBody>
            <LoadingText>쿠키를 준비하는 중입니다...</LoadingText>
          </CenterBody>
        </ContentContainer>
      </PageWrapper>
    )
  }

  // ───────────── 에러 ─────────────
  if (errorMessage) {
    return (
      <PageWrapper>
        <ContentContainer>
          <CenterBody>
            <ErrorCard>
              <ErrorTitle>쿠키를 불러오지 못했어요</ErrorTitle>
              <ErrorMessage>{errorMessage}</ErrorMessage>
              {onRetry && (
                <RetryButton type="button" onClick={onRetry}>
                  다시 시도하기
                </RetryButton>
              )}
            </ErrorCard>
          </CenterBody>
        </ContentContainer>
      </PageWrapper>
    )
  }

  // ───────────── 일반 화면 ─────────────
  return (
    <PageWrapper>
      <ContentContainer>
        {/* 상단 헤더 영역 */}
        <HeaderRow>
          <BackButton type="button" onClick={onClickBack}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </BackButton>

          <Logo src="/d_day_logo.svg" alt="메리 쿠키스마스 D-Day" />
        </HeaderRow>

        <Subtitle>
          마음이 담긴 쿠키와 메세지를 확인해보세요🤍
        </Subtitle>

        <ReceivedCountBadge>
          <span>받은 쿠키</span>
          <strong>{receivedCount}개</strong>
        </ReceivedCountBadge>

        {/* 좌우 화살표 버튼 */}
            {hasCookies && (
              <>
                <ArrowButtonLeft type="button" onClick={goPrev}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </ArrowButtonLeft>
                <ArrowButtonRight type="button" onClick={goNext}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </ArrowButtonRight>
              </>
            )}

        {/* 원형 쿠키 캐러셀 영역 */}
        <CarouselArea
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          <WheelWrapper>
            {/* 접시 배경 */}
            <PlateImage src="/d_day_plate.png" alt="쿠키 접시" />

            {/* 쿠키 & 말풍선 레이어 */}
            <WheelInner $direction={slideDirection}>
              {visibleCookies.map(
                ({ cookie, angle, isCenter, sourceIndex }) => {
                  // 소속/이름 텍스트 (서버 스펙 확장 대비, 없으면 sender_name만 사용)
                  const senderName =
                    (cookie as any).sender_name ??
                    (cookie as any).senderName ??
                    ''
                  const senderAffiliation =
                    (cookie as any).sender_affiliation ??
                    (cookie as any).senderAffiliation ??
                    ''

                  return (
                    <CookieOrbitItem
                      key={`${sourceIndex}-${cookie.cookie_pk}`}
                      $angle={angle}
                      $isCenter={isCenter}
                      onClick={() => onClickCookie(sourceIndex)}
                    >
                      <SpeechBubble>
                        <SpeechLine1>
                          {senderAffiliation || 'SSAFY'}
                        </SpeechLine1>
                        <SpeechLine2>
                          {senderName || '싸피'}
                        </SpeechLine2>
                      </SpeechBubble>

                      <CookieCircle>
                        <CookieImageRenderer2
                            designData={
                            cookie.design_data as unknown as CookieDesignImgDataCamel
                            }
                            isPen={false}
                            isRound
                        />
                        </CookieCircle>
                    </CookieOrbitItem>
                  )
                },
              )}
            </WheelInner>
          </WheelWrapper>
        </CarouselArea>
      </ContentContainer>
    </PageWrapper>
  )
}

/* ───────────── styled-components ───────────── */

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: #e8c696;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px 16px 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: #ffffff;

  background-image: url('/home.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const CenterBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderRow = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 22px;
`

const Logo = styled.img`
  height: 60px;
  width: auto;
`

const Subtitle = styled.div`
  margin: 4px 0 12px;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.35);
  text-align: center;

  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #ffffff;
`

/* 기존 ReceivedCountBadge와 동일 + 색상만 변경 */
const ReceivedCountBadge = styled.div`
  align-self: flex-end;
  min-width: 80px;
  padding: 6px 12px;
  border-radius: 12px;
  background-color: rgba(249, 163, 194, 0.4); /* #F9A3C2 40% */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 16px;

  span {
    font-family: 'Galmuri14', system-ui, -apple-system,
      BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    color: #ffffff;
  }

  strong {
    font-family: 'DNFBitBitv2', system-ui, -apple-system,
      BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 24px;
    color: #ffffff;
  }
`

const CarouselArea = styled.section`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: hidden; 화면 밖으로 나가는 거대 원을 숨김 */
`

const WheelWrapper = styled.div`
  position: absolute;
  bottom: -280px; /* 원의 중심을 화면 아래로 푹 내림 (조절 필요) */
  width: 600px;   /* 가상의 큰 원 지름 */
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const PlateImage = styled.img`
  position: absolute;
  top: 0; /* 원의 꼭대기 근처에 접시 배치 */
  left: 50%;
  width: 500px; /* 접시 크기를 키워 화면을 꽉 채우게 */
  transform: translate(-50%, -10%); 
  z-index: 0;
  pointer-events: none;
`

const WheelInner = styled.div<{ $direction: SlideDirection }>`
  position: absolute;
  inset: 0;
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  
  /* 인덱스 변경 시 부드러운 회전 효과를 위해 (선택 사항) */
  ${({ $direction }) =>
    $direction === 'left' && css`animation: rotateLeft 0.4s ease-out;`}
  ${({ $direction }) =>
    $direction === 'right' && css`animation: rotateRight 0.4s ease-out;`}
`

const CookieOrbitItem = styled.div<{
  $angle: number;
  $isCenter: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  pointer-events: auto;
  cursor: pointer;

  ${({ $angle, $isCenter }) => {
    // R: 원의 반지름
    const R = 320; 
    // 각도 변환 (0도가 정중앙 상단이 되도록 계산)
    // 현재 코드의 offsets [-2, -1, 0, 1, 2]에 맞춘 간격 조정
    const adjustedAngle = $angle + 90; // -90도가 0(상단)이 되도록
    const rad = (adjustedAngle * Math.PI) / 180;

    const x = R * Math.sin(rad);
    const y = -R * Math.cos(rad); // 위쪽으로 배치

    const scale = $isCenter ? 1.1 : 0.7;
    const opacity = $isCenter ? 1 : 0.4; // 양옆 쿠키는 흐릿하게
    const blur = $isCenter ? 0 : 2;

    return css`
      transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale});
      opacity: ${opacity};
      filter: blur(${blur}px);
      z-index: ${$isCenter ? 10 : 5};
      transition: all 0.4s ease-out;
    `;
  }}
`

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 110%; /* 쿠키 위로 띄움 */
  left: 50%;
  transform: translateX(-50%);
  min-width: 140px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  white-space: nowrap;

  &::after { /* 말풍선 꼬리 */
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`
const CookieCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background-color: transparent;
`

const SpeechLine1 = styled.div`
  font-family: 'Nanum JangMiCe', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.1;
`

const SpeechLine2 = styled.div`
  font-family: 'Nanum JangMiCe', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 48px;
  line-height: 1.1;
`

const ArrowButtonBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 36px;
    color: #ffffff;
  }
`

const ArrowButtonLeft = styled(ArrowButtonBase)`
  left: 4px;
`

const ArrowButtonRight = styled(ArrowButtonBase)`
  right: 4px;
`

const LoadingText = styled.div`
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 15px;
`

const ErrorCard = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 24px 18px;
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #ffffff;
`

const ErrorTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`

const ErrorMessage = styled.p`
  font-size: 13px;
  line-height: 1.4;
`

const RetryButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  background-color: #f1b56a;
  color: #5b3a00;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`
