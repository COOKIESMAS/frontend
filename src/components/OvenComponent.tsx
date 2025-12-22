import React, { useMemo, useState, type TouchEvent } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import OvenCookieImageRenderer from '@/components/myoven/OvenCookieImageRenderer'
import type { CookieItem } from '@/types/cookie'

const PAN_SIZE = 4
type SlideDirection = 'left' | 'right' | null

interface MyOvenComponentProps {
  loading: boolean
  errorMessage?: string | null
  cookies: CookieItem[]
  /** 상단 "< 내 오븐" 버튼 클릭 시 */
  onClickBack: () => void
  /** 에러 시 재시도 버튼 클릭 핸들러 (선택) */
  onRetry?: () => void
}

export const OvenComponent: React.FC<MyOvenComponentProps> = ({
  loading,
  errorMessage,
  cookies,
  onClickBack,
  onRetry,
}) => {
  const hasCookies = cookies.length > 0
  const [currentPanIndex, setCurrentPanIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null)

  const backgroundImage = hasCookies
    ? '/ovenbackgroundfire.png'
    : '/ovenbackground.png'

  /** 쿠키들을 4개씩 잘라 팬 단위로 묶기 */
  const cookiePans: CookieItem[][] = useMemo(() => {
    if (!hasCookies) return []
    const result: CookieItem[][] = []
    for (let i = 0; i < cookies.length; i += PAN_SIZE) {
      result.push(cookies.slice(i, i + PAN_SIZE))
    }
    return result
  }, [cookies, hasCookies])

  const totalPans = cookiePans.length || 1
  const safePanIndex = totalPans === 0 ? 0 : currentPanIndex % totalPans
  const cookiesInCurrentPan = cookiePans[safePanIndex] ?? []

  /** 같은 방향으로 여러 번 넘겨도 매번 애니메이션이 재생되도록 하는 헬퍼 */
  const triggerSlide = (
    dir: Exclude<SlideDirection, null>,
    updateIndex: () => void,
  ) => {
    setSlideDirection(null) // 애니메이션 초기화
    updateIndex()
    setTimeout(() => {
      // 다음 렌더 사이클에서 다시 방향을 넣어 애니메이션 재시작
      setSlideDirection(dir)
    }, 0)
  }

  const goPrevPan = () => {
    if (!hasCookies) return
    triggerSlide('right', () => {
      setCurrentPanIndex((prev) => (prev - 1 + totalPans) % totalPans)
    })
  }

  const goNextPan = () => {
    if (!hasCookies) return
    triggerSlide('left', () => {
      setCurrentPanIndex((prev) => (prev + 1) % totalPans)
    })
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasCookies) return
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasCookies || touchStartX === null) return

    const endX = e.changedTouches[0].clientX
    const diff = endX - touchStartX
    const THRESHOLD = 40 // 스와이프 최소 거리

    if (Math.abs(diff) > THRESHOLD) {
      if (diff > 0) {
        // 오른쪽으로 스와이프 => 이전 팬
        goPrevPan()
      } else {
        // 왼쪽으로 스와이프 => 다음 팬
        goNextPan()
      }
    }

    setTouchStartX(null)
  }

  const receivedCount = cookies.length

  // ───────────── 로딩 화면 ─────────────
  if (loading) {
    return (
      <PageWrapper>
        <ContentContainer $backgroundImage={backgroundImage}>
          <CenterBody>
            <LoadingText>내 오븐을 데우는 중...</LoadingText>
          </CenterBody>
        </ContentContainer>
      </PageWrapper>
    )
  }

  // ───────────── 에러 화면 ─────────────
  if (errorMessage) {
    return (
      <PageWrapper>
        <ContentContainer $backgroundImage={backgroundImage}>
          <CenterBody>
            <ErrorCard>
              <ErrorTitle>오븐 연결에 실패했어요</ErrorTitle>
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
      <ContentContainer $backgroundImage={backgroundImage}>
        {/* 헤더 영역 */}
        <HeaderRow>
          <BackButton type="button" onClick={onClickBack}>
            <FontAwesomeIcon icon={faAngleLeft} />
            <span>친구 오븐</span>
          </BackButton>

          <CountBadge>
            <CountLabel style={{ fontSize: 12 }}>받은 쿠키</CountLabel>
            <CountValue style={{ fontSize: 20, lineHeight: 1.4 }}>
              {receivedCount}개
            </CountValue>
          </CountBadge>
        </HeaderRow>

        {/* 메인 컨텐츠 */}
        {!hasCookies ? (
          <EmptyOvenCard>
            <EmptyTitle>오븐이 아직 차가워요 ❄️</EmptyTitle>

            <WorryCookieImage src="/WorryCookie.png" alt="걱정하는 쿠키" />
          </EmptyOvenCard>
        ) : (
          <PanArea onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <ReceiverInfo>
              <span style={{ color: 'red' }}>{cookies[0].receiver_name}</span>
              <span>의 오븐</span>
            </ReceiverInfo>

            <PanWrapper $direction={slideDirection}>
              <OvenPanImage src="/ovenpan.png" alt="오븐 팬" />

              {/* 쿠키 배치 영역 */}
              <CookiesGrid>
                {cookiesInCurrentPan.map((cookie) => (
                  <OvenCookieImageRenderer
                    key={cookie.cookie_pk}
                    designData={cookie.design_data}
                    isRead={cookie.is_read}
                  />
                ))}

                {/* 4개 미만이면 빈칸 채우기 */}
                {Array.from({
                  length: PAN_SIZE - cookiesInCurrentPan.length,
                }).map((_, idx) => (
                  <CookiePlaceholderEmpty key={`empty-${idx}`} />
                ))}
              </CookiesGrid>

              {/* 좌우 이동 버튼 */}
              {totalPans > 1 && (
                <>
                  <ArrowButtonLeft type="button" onClick={goPrevPan}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </ArrowButtonLeft>
                  <ArrowButtonRight type="button" onClick={goNextPan}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </ArrowButtonRight>
                </>
              )}
            </PanWrapper>

            {/* 페이지 표시: 1 / 3 */}
            {totalPans > 1 && (
              <PanPageIndicator>
                {safePanIndex + 1} / {totalPans}
              </PanPageIndicator>
            )}
          </PanArea>
        )}
      </ContentContainer>
    </PageWrapper>
  )
}

//region CSS
const CookiePlaceholderEmpty = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background-color: transparent;
`

/* ───────────── 공통 레이아웃 ───────────── */

/** 전체 뷰포트 담당: 가운데에 375px짜리 화면을 배치 */
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center; /* 가로 중앙 */
  align-items: stretch;
  background-color: #e8c696; /* 바깥 여백 배경색 */
`

/**
 * 실제 화면 박스:
 * - width: 100%, max-width: 375px
 * - min-height: 100vh
 * - background-image 가 여기만 적용됨
 */
const ContentContainer = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  max-width: 375px; /* ✅ 폭 제한 */
  min-height: 100vh; /* ✅ 세로 100vh */
  margin: 0 auto;
  padding: 24px 16px 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: #ffffff;

  background-image: url(${(p) => p.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

/** 로딩/에러에서 가운데 정렬용 */
const CenterBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

/* ───────────── 헤더 ───────────── */

const HeaderRow = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 4px 0;

  font-family:
    'Galmuri14',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-size: 15px;

  svg {
    font-size: 18px;
  }
`

const CountBadge = styled.div`
  min-width: 64px;
  background: linear-gradient(
    180deg,
    rgba(125, 58, 15, 0.8),
    rgba(125, 58, 15, 0.5) /* 50% 불투명도 (끝) */
  );
  color: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  box-shadow: 0 6px 12px rgba(138, 75, 35, 0.25);
  font-weight: 700;
`

const CountLabel = styled.div`
  font-family: 'Galmuri14';
  font-size: 13px;
`

const CountValue = styled.div`
  font-family: 'DNFBitBitv2';
  font-size: 24px;
  line-height: 24px;
`

/* ───────────── 비어 있는 오븐 카드 ───────────── */

const EmptyOvenCard = styled.div`
  margin-top: 48px;
  margin-inline: auto;
  width: 100%;
  max-width: 345px;
  padding: 28px 24px 24px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  text-align: center;
`

const EmptyTitle = styled.h2`
  font-family:
    'Galmuri14',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 16px;
`

const WorryCookieImage = styled.img`
  width: 140px;
  height: auto;
  margin-bottom: 16px;
`

/* ───────────── 쿠키가 있는 경우의 팬 영역 ───────────── */

const PanArea = styled.section`
  margin-top: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ReceiverInfo = styled.div`
  font-family: 'DNFBitBitv2';
  font-size: 25px;
  color: black;
  padding: 6px 14px;
  border-radius: 14px;
  background-color: #ffffff;
  margin-bottom: 16px;
`

// 슬라이드 애니메이션
const slideFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const PanWrapper = styled.div<{ $direction: SlideDirection }>`
  position: relative;
  width: 90%;
  max-width: 360px;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;

  ${({ $direction }) =>
    $direction === 'left' &&
    css`
      animation: ${slideFromRight} 0.3s ease-out;
    `}

  ${({ $direction }) =>
    $direction === 'right' &&
    css`
      animation: ${slideFromLeft} 0.3s ease-out;
    `}
`

const OvenPanImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`

const CookiesGrid = styled.div`
  position: relative;
  width: 65%;
  height: 65%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  z-index: 1;
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
    font-size: 38px;
    color: #ffffff;
  }
`

// 팬의 양 옆, 바깥쪽에 위치
const ArrowButtonLeft = styled(ArrowButtonBase)`
  left: -32px;
`

const ArrowButtonRight = styled(ArrowButtonBase)`
  right: -32px;
`

const PanPageIndicator = styled.div`
  margin-top: 12px;
  font-family:
    'DNFBitBitv2',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-size: 16px;
  color: #ffffff;
`

/* ───────────── 로딩 / 에러 텍스트 ───────────── */

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
