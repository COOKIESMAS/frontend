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
    triggerSlide('right')
    onChangeIndex(currentIndex - 1)
  }

  const goNext = () => {
    if (!total) return
    triggerSlide('left')
    onChangeIndex(currentIndex + 1)
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

    if (total <= 5) {
      // 전체를 원 형태로 배치 (단순)
      const step = 360 / total
      return cookies.map((cookie, idx) => ({
        cookie,
        angle: -90 + step * idx,
        isCenter: idx === currentIndex,
        sourceIndex: idx,
      }))
    }

    // total > 5 인 경우: 8등분 중 5개 슬롯(-2,-1,0,1,2)만 사용
    const ANGLE_STEP = 45
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

        {/* 원형 쿠키 캐러셀 영역 */}
        <CarouselArea
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <CarouselCaption>쿠키를 좌우로 넘겨보세요</CarouselCaption>

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
  margin-top: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CarouselCaption = styled.div`
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`

/** 원형 영역 (양옆 쿠키는 살짝 잘리도록 overflow hidden) */
const WheelWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  overflow: hidden;
`

const PlateImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  transform: translate(-50%, -50%);
  z-index: 0;
`

const WheelInner = styled.div<{ $direction: SlideDirection }>`
  position: absolute;
  inset: 0;
  pointer-events: auto;

  ${() => css`
    transition:
      transform 0.35s ease-out,
      opacity 0.35s ease-out;
  `}

  ${({ $direction }) =>
    $direction === 'left' &&
    css`
      transform: translateX(-4%);
    `}

  ${({ $direction }) =>
    $direction === 'right' &&
    css`
      transform: translateX(4%);
    `}
`

/** 원 위의 각 쿠키+말풍선 한 세트 */
const CookieOrbitItem = styled.div<{
  $angle: number
  $isCenter: boolean
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;

  ${({ $angle, $isCenter }) => {
    const radius = 58 // 원 반지름 (%)
    const rad = (($angle - 90) * Math.PI) / 180
    const x = 50 + radius * Math.cos(rad)
    const y = 50 + radius * Math.sin(rad)

    const scale = $isCenter ? 1 : 0.85
    const opacity = $isCenter ? 1 : 0.85

    return css`
      top: ${y}%;
      left: ${x}%;
      transform: translate(-50%, -50%) scale(${scale});
      opacity: ${opacity};
      transition:
        transform 0.35s ease-out,
        opacity 0.35s ease-out;
      z-index: ${$isCenter ? 3 : 2};
    `
  }}
`

const CookieCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background-color: transparent;
`

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 100%;
  transform: translateY(-8px);
  padding: 8px 14px;
  border-radius: 18px;
  background-color: #ffffff;
  color: #000000;
  text-align: center;
  white-space: pre-line;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
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
