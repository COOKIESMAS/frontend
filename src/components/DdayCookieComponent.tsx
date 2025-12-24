/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type TouchEvent } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import type { CookieItem, CookieDesignImgDataCamel } from '@/types/cookie'
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

type VisibleCookie = {
  cookie: CookieItem
  angle: number
  isCenter: boolean
  sourceIndex: number
  slotIndex: number
}

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
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const hasCookies = cookies.length > 0
  const total = cookies.length
  const receivedCount = total

  const goPrev = () => {
    if (!total) return
    const nextIndex = (currentIndex - 1 + total) % total
    onChangeIndex(nextIndex)
  }

  const goNext = () => {
    if (!total) return
    const nextIndex = (currentIndex + 1) % total
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

  /** 원형 캐러셀에 표시할 쿠키 계산 (중복 렌더링 없이) */
  const getVisibleCookies = (): VisibleCookie[] => {
    if (!total) return []

    const BASE_ANGLE = 0 // 0도 = 위쪽

    // 1) 쿠키 5개 이하 → 전부를 원 위에 골고루 배치 (중복 X)
    if (total <= 5) {
      const STEP = 360 / total

      return cookies.map((cookie, idx) => {
        const offset = idx - currentIndex
        const angle = BASE_ANGLE + STEP * offset
        const isCenter = idx === currentIndex

        return {
          cookie,
          angle,
          isCenter,
          sourceIndex: idx,
          slotIndex: idx,
        }
      })
    }

    // 2) 5개 초과 → 8등분 중 위쪽 기준 5슬롯(-2,-1,0,1,2)만 사용
    const ANGLE_STEP = 45 // 360/8
    const offsets = [-2, -1, 0, 1, 2]

    return offsets.map((offset, slotIndex) => {
      const sourceIndex =
        ((currentIndex + offset) % total + total) % total
      const cookie = cookies[sourceIndex]
      const angle = BASE_ANGLE + ANGLE_STEP * offset
      const isCenter = offset === 0

      return {
        cookie,
        angle,
        isCenter,
        sourceIndex,
        slotIndex,
      }
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
    <>
      <LocalFontStyles />
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
            <WheelWrapper>
              {/* 접시 배경 */}
              <PlateImage src="/d_day_plate.png" alt="쿠키 접시" />

              {/* 쿠키 & 말풍선 레이어 */}
              <WheelInner>
                {visibleCookies.map(
                  ({
                    cookie,
                    angle,
                    isCenter,
                    sourceIndex,
                    slotIndex,
                  }) => {
                    const senderName =
                      (cookie as any).sender_name ??
                      (cookie as any).senderName ??
                      ''

                    // 캠퍼스 / 반 정보
                    const senderCampus =
                      (cookie as any).sender_campus ??
                      (cookie as any).senderCampus ??
                      ''

                    const senderClassNumber =
                      (cookie as any).sender_class_number ??
                      (cookie as any).senderClassNumber

                    // "대전 3반" 또는 데이터 없으면 "프로/강사님"
                    const line1Text =
                      senderCampus && senderClassNumber
                        ? `${senderCampus} ${senderClassNumber}반`
                        : '프로/강사님'
                    return (
                      <CookieOrbitItem
                        key={
                          (cookie as any).cookie_pk ??
                          `${sourceIndex}-${slotIndex}`
                        }
                        $angle={angle}
                        $isCenter={isCenter}
                        $slotIndex={slotIndex}
                        onClick={() => onClickCookie(sourceIndex)}
                      >
                        {isCenter && (
                          <SpeechBubble>
                            <SpeechLine1>{line1Text}</SpeechLine1>
                            <SpeechLine2>{senderName || 'SSAFY'}</SpeechLine2>
                          </SpeechBubble>
                        )}
                        <CookieCircle>
                          <CookieImageRenderer2
                            designData={
                              cookie
                                .design_data as unknown as CookieDesignImgDataCamel
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
    </>
  )
}

/* ───────────── styled-components ───────────── */

const LocalFontStyles = createGlobalStyle`
  /* DNF Bit Bit v2 */
  @font-face {
    font-family: 'DNFBitBitv2';
    src: url('/fonts/DNFBitBitv2.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  /* Galmuri14 */
  @font-face {
    font-family: 'Galmuri14';
    src: url('/fonts/Galmuri14.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  /* Nanum JangMiCe */
  @font-face {
    font-family: 'Nanum JangMiCe';
    src: url('/fonts/NanumJangMiCe.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`

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
  overflow: hidden;

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
  width: 280px;
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

const ReceivedCountBadge = styled.div`
  align-self: flex-start;
  min-width: 80px;
  padding: 6px 12px;
  border-radius: 12px;
  background-color: rgba(249, 163, 194, 0.4);
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
`

const WheelWrapper = styled.div`
  position: absolute;
  bottom: -500px;
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const PlateImage = styled.img`
  position: absolute;
  top: -100px;
  left: 50%;
  width: 900px;
  transform: translate(-50%, -10%);
  z-index: 0;
  pointer-events: none;
`

// ✅ 더 이상 방향 상태 안씀 – 고정 컨테이너
const WheelInner = styled.div`
  position: absolute;
  inset: 0;
`

const ROTATION_BY_SLOT = [-25, -12, 0, 12, 25] as const

const CookieOrbitItem = styled.div<{
  $angle: number
  $isCenter: boolean
  $slotIndex: number
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  pointer-events: auto;
  cursor: pointer;

  ${({ $angle, $isCenter, $slotIndex }) => {
    const R = 350
    const rad = ($angle * Math.PI) / 180

    const x = R * Math.sin(rad)
    const y = -R * Math.cos(rad)

    const scale = $isCenter ? 1.1 : 0.8
    const opacity = $isCenter ? 1 : 0.5
    const rotateDeg = $isCenter
      ? 0
      : ROTATION_BY_SLOT[$slotIndex] ?? 0

    return css`
      transform:
        translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
        rotate(${rotateDeg}deg)
        scale(${scale});
      opacity: ${opacity};
      z-index: ${$isCenter ? 10 : 5};
      transition: transform 0.35s ease-out, opacity 0.35s ease-out;
    `
  }}
`

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 140px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  white-space: nowrap;

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::after {
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
  width: 300px;
  height: 300px;
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
  top: 60%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;

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
