// src/components/myoven/MyOvenComponent.tsx
import React, {
  useMemo,
  useState,
  type TouchEvent,
} from 'react'
import styled, { css, keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import OvenCookieImageRenderer from './OvenCookieImageRenderer'
import type { CookieItem } from '@/types/cookie'

const PAN_SIZE = 4
type SlideDirection = 'left' | 'right' | null

// 🔴 모달에 사용할 랜덤 문구들
const OVEN_MESSAGES: string[] = [
  '크리스마스까지 맛있게 구워지는 중...⏲️',
  '누가 만들어준 쿠키일까?',
  '어떤 비밀이 담겨있을지 몰라🙈',
  '선물같은 마음을 배달하는 중...🎁',
]

// 🔴 2025-12-25까지 남은 날짜를 D-day 문자열로 계산
const getDDayLabel = () => {
  const today = new Date()
  const target = new Date(2025, 11, 25) // 12월(11) 25일

  // 시·분·초 제거해서 순수 날짜 차이만 계산
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)

  const diffMs = target.getTime() - today.getTime()
  const diffDays = Math.max(
    0,
    Math.ceil(diffMs / (1000 * 60 * 60 * 24)),
  )
  const padded = String(diffDays).padStart(2, '0')
  return `D - ${padded}`
}

interface MyOvenComponentProps {
  loading: boolean
  errorMessage?: string | null
  cookies: CookieItem[]
  /** 크리스마스 이전 화면인지 여부 (1, 2번 케이스용) */
  isBeforeXmas: boolean
  /** 상단 "< 내 오븐" 버튼 클릭 시 */
  onClickBack: () => void
  /** "내 오븐 링크 공유하기" 버튼 클릭 시 */
  onClickShareLink: () => void
  /** 에러 시 재시도 버튼 클릭 핸들러 (선택) */
  onRetry?: () => void
  /** 쿠키 클릭 시 (읽음 처리 + 상세 보기 등) */
  onClickCookie: (cookie: CookieItem) => void
}

export const MyOvenComponent: React.FC<MyOvenComponentProps> = ({
  loading,
  errorMessage,
  cookies,
  isBeforeXmas,
  onClickBack,
  onClickShareLink,
  onRetry,
  onClickCookie,
}) => {
  const hasCookies = cookies.length > 0
  const [currentPanIndex, setCurrentPanIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] =
    useState<SlideDirection>(null)

  // 🔴 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState<string>('')

  // D-day는 한 번만 계산해두면 됨
  const ddayLabel = useMemo(() => getDDayLabel(), [])

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

  // 🔴 쿠키 클릭 시: 읽음 처리 + 모달 열기
  const handleCookieClick = (cookie: CookieItem) => {
    // 기존 로직 유지 (읽음 처리 API 호출)
    onClickCookie(cookie)

    // 랜덤 문구 선택
    const randomIndex = Math.floor(
      // eslint-disable-next-line react-hooks/purity
      Math  .random() * OVEN_MESSAGES.length,
    )
    setModalMessage(OVEN_MESSAGES[randomIndex])

    // 모달 오픈
    // setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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
            <span>내 오븐</span>
          </BackButton>

          <ReceivedCountBadge>
            <span>받은 쿠키</span>
            <strong>{receivedCount}개</strong>
          </ReceivedCountBadge>
        </HeaderRow>

        {/* 메인 컨텐츠 */}
        {!hasCookies ? (
          <EmptyOvenCard>
            <EmptyTitle>오븐이 아직 차가워요 ❄️</EmptyTitle>

            <WorryCookieImage
              src="/WorryCookie.png"
              alt="걱정하는 쿠키"
            />

            <EmptyDescription>
              친구들에게 내 오븐을 공유하고
              <br />
              마음이 담긴 쿠키를 받아보세요!
            </EmptyDescription>

            <ShareButton type="button" onClick={onClickShareLink}>
              <ShareIcon>🔗</ShareIcon>
              <ShareButtonText>내 오븐 링크 공유하기</ShareButtonText>
            </ShareButton>
          </EmptyOvenCard>
        ) : (
          <PanArea
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isBeforeXmas && (
              <PanCaption>맛있게 구워지는 중...♥</PanCaption>
            )}

            <PanWrapper $direction={slideDirection}>
              <OvenPanImage src="/ovenpan.png" alt="오븐 팬" />

              {/* 쿠키 배치 영역 */}
              <CookiesGrid>
                {cookiesInCurrentPan.map((cookie) => (
                  <OvenCookieImageRenderer
                    key={cookie.cookie_pk}
                    designData={cookie.design_data}
                    isRead={cookie.is_read}
                    onClick={() => handleCookieClick(cookie)} // 🔴 변경
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

        {/* 🔴 쿠키 모달 (OvenRectangle) */}
        {isModalOpen && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalCard onClick={handleCloseModal}>
              <ModalMessage>{modalMessage}</ModalMessage>
              <DdayText>{ddayLabel}</DdayText>
            </ModalCard>
          </ModalOverlay>
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
  background-color: #e8C696; /* 바깥 여백 배경색 */
`

/**
 * 실제 화면 박스:
 * - width: 100%, max-width: 375px
 * - min-height: 100vh
 * - background-image 가 여기만 적용됨
 */
const ContentContainer = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  max-width: 375px;   /* ✅ 폭 제한 */
  min-height: 100vh;  /* ✅ 세로 100vh */
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

  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;

  svg {
    font-size: 18px;
  }
`

const ReceivedCountBadge = styled.div`
  min-width: 80px;
  padding: 6px 12px;
  border-radius: 12px;
  background-color: rgba(91, 58, 0, 0.9);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

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
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 16px;
`

const WorryCookieImage = styled.img`
  width: 140px;
  height: auto;
  margin-bottom: 16px;
`

const EmptyDescription = styled.p`
  font-family: 'Pretendard-Medium', 'Pretendard', system-ui,
    -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-line;
  color: #ffffff;
`

const ShareButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 16px;
  border: none;
  background-color: #f1b56a;
  color: #5b3a00;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
    opacity: 0.95;
  }
`

const ShareIcon = styled.span`
  font-size: 16px;
`

const ShareButtonText = styled.span`
  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 17px;
`

/* ───────────── 쿠키가 있는 경우의 팬 영역 ───────────── */

const PanArea = styled.section`
  margin-top: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PanCaption = styled.div`
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 17px;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 14px;
  background-color: rgba(91, 58, 0, 0.9);
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
  font-family: 'DNFBitBitv2', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

// 🔴 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`

const ModalCard = styled.div`
  width: 280px;
  height: 210px;
  background-image: url('/OvenRectangle.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
`

// IM_Hyemin, Bold, 22px
const ModalMessage = styled.p`
  font-family: 'IM_Hyemin-Bold', 'IM_Hyemin', system-ui,
    -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 22px;
  margin: 0 0 12px;
  color: #2c231c;
  white-space: pre-line;
`

// DNF Bit Bit v2, 40px + 크리스마스 스트라이프 색상
const DdayText = styled.div`
  font-family: 'DNFBitBitv2', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 40px;
  -webkit-text-stroke: 1px black;
  line-height: 1.1;

  background-image: repeating-linear-gradient(
    45deg,
    #ffffff 0px,
    #ffffff 16px,
    #00a84f 16px,
    #00a84f 32px,
    #ff2b2b 32px,
    #ff2b2b 48px
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

//endregion
