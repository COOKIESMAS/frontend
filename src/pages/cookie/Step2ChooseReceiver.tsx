// src/pages/cookie/Step2ChooseReceiver.tsx
import { useState, useRef, useLayoutEffect } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { css } from 'styled-components'
import ProfileCard from '@/components/ProfileCard' // 경로가 다르면 수정하세요
import { useNavigate } from 'react-router-dom'

const FlexWrapper = styled.div<{
  direction?: 'row' | 'column'
  justify?: string
  align?: string
  gap?: string
  wrap?: string
  width?: string
  height?: string
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'start'};
  gap: ${(props) => props.gap || '0'};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`

const PageWrapper = styled.main`
  position: relative;
  max-width: 375px;
  width: 100%;
  height: 100%;
  background-color: #e8c7c7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 48px 12px;
`

const HeaderWrapper = styled(FlexWrapper)`
  align-items: end;
`

const HeaderLeftWrapper = styled(FlexWrapper)`
  align-items: center;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
`

const PageTitle = styled.h1`
  font-size: 18px;
  margin: 0;
`

const Title = styled.h1`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 16px;
`

// 토글 영역
const ToggleWrapper = styled.div`
  display: flex;
  background: #f7bfbf;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 24px;
`

const ToggleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  border: none;
  border-radius: 12px;
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  color: #000;
`

// 폼 영역
const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  position: relative;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: inline-block;
`

const LabelAnchor = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
`

const Select = styled.select`
  width: 100%;
  height: 56px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid #eee;
  font-size: 14px;
  background-color: inherit;
`

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid #eee;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #c7d6ff;
    box-shadow: 0 2px 8px rgba(15, 77, 255, 0.08);
  }
`

// 하단 버튼 영역
const BottomSection = styled.section`
  margin-top: auto;
  padding: 24px 0 8px;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 40px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  background: #e7b472;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

/* ===== tooltip 관련 스타일 (Label을 hover 또는 focus-within 했을 때 프로필 카드 노출) ===== */

/* LabelWrap: 툴팁의 기준점 (relative) */
const LabelWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  /* allow keyboard focus inside (input) to trigger :focus-within on parent */
  &:focus-within {
    outline: none;
  }
`

/* Tooltip container is absolutely positioned above or below the label/input */
const TooltipContainer = styled.div<{ position: 'top' | 'bottom' }>`
  position: absolute;
  left: 0;
  transform: translateY(6px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 160ms ease,
    transform 160ms ease,
    visibility 0ms linear 160ms;
  z-index: 999;
  min-width: 260px;
  max-width: 360px;

  ${({ position }) =>
    position === 'top'
      ? css`
          bottom: 100%; /* 라벨 기준 바로 위 */
          margin-bottom: 10px;
        `
      : css`
          top: 100%; /* 라벨 기준 바로 아래 */
          margin-top: 10px;
        `}

  /* show when parent LabelWrap is hovered or focused (input inside), or when tooltip itself is hovered */
  ${LabelWrap}:hover &,
  ${LabelWrap}:focus-within &,
  &:hover {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
    transition-delay: 0ms;
  }
`

/* optional arrow below tooltip */
const TooltipArrow = styled.div<{ position: 'top' | 'bottom' }>`
  position: absolute;
  left: 24px;
  width: 0;
  height: 0;
  z-index: 998;

  ${({ position }) =>
    position === 'top'
      ? css`
          top: 100%;
          margin-top: 6px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(0, 0, 0, 0.06);
        `
      : css`
          bottom: 100%;
          margin-bottom: 6px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid rgba(0, 0, 0, 0.06);
        `}
`

/* small helper text inside tooltip wrapper if needed */
const TooltipInner = styled.div`
  padding: 6px;
`

/* ================================================ */

function Step2ChooseReceiver() {
  const navigate = useNavigate()

  const [activeToggle, setActiveToggle] = useState<'student' | 'pro'>('student')
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>(
    'top',
  )

  const labelWrapRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const computePosition = () => {
    if (!labelWrapRef.current) return

    const labelRect = labelWrapRef.current.getBoundingClientRect()
    const spaceAbove = labelRect.top
    const spaceBelow = window.innerHeight - labelRect.bottom

    // try to measure tooltip actual height if rendered
    let tooltipHeight = 300 // fallback
    if (tooltipRef.current) {
      // offsetHeight works even if visibility: hidden for positioned elements
      const h = tooltipRef.current.offsetHeight
      if (h && !Number.isNaN(h)) tooltipHeight = h
    }

    if (spaceAbove > tooltipHeight) {
      setTooltipPosition('top')
    } else if (spaceBelow > tooltipHeight) {
      setTooltipPosition('bottom')
    } else {
      setTooltipPosition(spaceAbove > spaceBelow ? 'top' : 'bottom')
    }
  }

  // Recompute when tooltip is opened, on resize/scroll and when toggle changes
  useLayoutEffect(() => {
    if (!isOpen) return
    computePosition()

    const onResize = () => computePosition()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeToggle])

  // Handlers to keep tooltip open when moving between trigger and tooltip
  const openTooltip = () => setIsOpen(true)
  const closeTooltip = () => setIsOpen(false)

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoNext = () => {
    navigate('/cookie/step3')
  }

  return (
    <AppContainer>
      <PageWrapper>
        {/* 상단 헤더 */}
        <HeaderWrapper
          justify="space-between"
          align="start"
          width="100%"
          style={{ padding: '10px' }}
        >
          <HeaderLeftWrapper>
            <BackButton onClick={handleGoBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </BackButton>
            <PageTitle>보낼 사람 선택</PageTitle>
          </HeaderLeftWrapper>
        </HeaderWrapper>

        {/* 타이틀 */}
        <Title>누구의 오븐에 넣을까요?</Title>

        {/* 토글 */}
        <ToggleWrapper>
          <ToggleButton
            active={activeToggle === 'student'}
            onClick={() => setActiveToggle('student')}
          >
            교육생
          </ToggleButton>
          <ToggleButton
            active={activeToggle === 'pro'}
            onClick={() => setActiveToggle('pro')}
          >
            프로님 / 강사님
          </ToggleButton>
        </ToggleWrapper>

        {/* 입력폼 */}
        <FormSection>
          {activeToggle === 'student' && (
            <>
              <div>
                <Label>캠퍼스</Label>
                <Select>
                  <option>선택</option>
                </Select>
              </div>

              <div>
                <Label>반</Label>
                <Select>
                  <option>선택</option>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label>성명</Label>
            <Input placeholder="입력" />
          </div>

          {/* Mattermost 아이디 필드: Label + Input을 같은 LabelWrap 안에 넣어 포커스 시에도 툴팁이 보이게 함 */}
          <LabelWrap
            ref={labelWrapRef}
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            onFocus={openTooltip}
            onBlur={(e) => {
              // If focus moved into tooltip, keep open
              const related = (e as React.FocusEvent)
                .relatedTarget as Node | null
              if (tooltipRef.current && tooltipRef.current.contains(related))
                return
              closeTooltip()
            }}
          >
            <LabelAnchor>
              <Label htmlFor="mattermost-id">Mattermost 아이디</Label>

              {/* Tooltip (ProfileCard) - 라벨 기준으로 위치 */}
              <TooltipContainer
                ref={tooltipRef}
                position={tooltipPosition}
                role="dialog"
                aria-hidden={!isOpen}
                style={{
                  // If not open, keep CSS-driven hidden; when open ensure visibility for measurement
                  visibility: isOpen ? 'visible' : undefined,
                  opacity: isOpen ? 1 : undefined,
                  pointerEvents: isOpen ? 'auto' : undefined,
                  transform: isOpen ? 'translateY(0)' : undefined,
                }}
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
                onFocus={openTooltip}
                onBlur={(e) => {
                  const related = (e as React.FocusEvent)
                    .relatedTarget as Node | null
                  if (
                    labelWrapRef.current &&
                    labelWrapRef.current.contains(related)
                  )
                    return
                  closeTooltip()
                }}
              >
                <TooltipInner>
                  <ProfileCard />
                </TooltipInner>
                <TooltipArrow position={tooltipPosition} />
              </TooltipContainer>
            </LabelAnchor>
            <Input
              id="mattermost-id"
              placeholder="@를 제외한 아이디를 입력해주세요"
              aria-describedby="mattermost-help"
            />
          </LabelWrap>
        </FormSection>

        {/* 하단 버튼 */}
        <BottomSection>
          <SubmitButton onClick={handleGoNext}>
            편지 쓰러 가기
            <span>→</span>
          </SubmitButton>
        </BottomSection>
      </PageWrapper>
    </AppContainer>
  )
}

export default Step2ChooseReceiver
