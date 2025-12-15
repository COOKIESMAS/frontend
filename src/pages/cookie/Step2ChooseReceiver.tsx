// src/pages/cookie/Step2ChooseReceiver.tsx
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons' // Regular 아이콘 사용 유지
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { css } from 'styled-components'
import ProfileCard from '@/components/ProfileCard' // 경로가 다르면 수정하세요
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import {
  campusAtom,
  classAtom,
  nameAtom,
  mattermostAtom,
  receiverRoleAtom,
} from '@/store/atoms/receiverAtoms'
import {
  CAMPUS_ENTRIES,
  getClassesForCampus,
  // getStudentsForClass, // 학생 목록은 이제 사용하지 않음
  isDuplicatedUser,
} from '@/constant/user'

/* --- styled components (unchanged) --- */
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
  font-size: 20px;
  // font will Pretendard
  font-weight: bold;
  margin: 20px 0 16px;
`

// 토글 영역
const ToggleWrapper = styled.div`
  display: flex;
  background-color: rgba(118, 118, 128, 0.12);
  border: 1px solid #eeeeef;
  border-radius: 18px;
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
  font-weight: 500;
  line-height: 18px;
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  color: #000;
  // font will Pretendard
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
  font-weight: normal;
  // font will pretendard
  line-height: 24px;
  display: inline-block;
`

// Label과 아이콘 사이 간격 조정을 위한 styled component
const MattermostLabel = styled(Label)`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: help; /* 툴팁이 있음을 시각적으로 알림 */
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
  font-size: 18px;
  // font will Galmuri14
  line-height: 24px;
  background-color: inherit;
  color: #a3a3a3;
`

const Input = styled.input`
  width: 100%;
  padding: 14px;
  height: 56px; /* Select와 높이 맞춤 */
  border-radius: 16px;
  border: 1px solid #eee;
  font-size: 14px;
  box-sizing: border-box;
  background-color: inherit;
  // font will Galmuri14
  font-size: 18px;
  line-height: 24px;

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

/* Tooltip styles (unchanged) */
const LabelWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  /* LabelWrap 전체가 아닌 LabelAnchor에 hover/focus가 적용되어야 함 */
  &:focus-within {
    outline: none;
  }
`

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
          bottom: 100%;
          margin-bottom: 10px;
        `
      : css`
          top: 100%;
          margin-top: 10px;
        `}

  /* LabelAnchor에 hover/focus 시 툴팁 표시 */
  ${LabelAnchor}:hover &,
  ${LabelAnchor}:focus-within &,
  &:hover {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
    transition-delay: 0ms;
  }
`

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

const TooltipInner = styled.div`
  padding: 6px;
`

/* --------------------------------------- */

function Step2ChooseReceiver() {
  const navigate = useNavigate()

  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>(
    'top',
  )

  // jotai atoms
  const [role, setRole] = useAtom(receiverRoleAtom)
  const [campus, setCampus] = useAtom(campusAtom)
  const [classNum, setClassNum] = useAtom(classAtom)
  const [name, setName] = useAtom(nameAtom) // 이제 Input 값으로 사용
  const [mattermostId, setMattermostId] = useAtom(mattermostAtom)

  const labelWrapRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const computePosition = () => {
    if (!labelWrapRef.current) return

    const labelRect = labelWrapRef.current.getBoundingClientRect()
    const spaceAbove = labelRect.top
    const spaceBelow = window.innerHeight - labelRect.bottom

    let tooltipHeight = 300
    if (tooltipRef.current) {
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
  }, [isOpen, role])

  const openTooltip = () => setIsOpen(true)
  const closeTooltip = () => setIsOpen(false)

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoNext = () => {
    // name이 빈 문자열일 경우 null로 처리
    const finalName = name?.trim() || null
    setName(finalName)

    if (finalName) {
      navigate('/cookie/step3')
    } else {
      alert('성명을 입력해주세요.') // 간단한 유효성 검사 예시
    }
  }

  /**
   * Mattermost input 표시 조건:
   * 1. 교육생 모드(student)일 때
   * 2. 캠퍼스, 반, 이름이 모두 유효한 값으로 설정되었고
   * 3. 해당 조합이 user.ts의 duplicatedUserData에 있을 경우
   */
  const shouldShowMattermost =
    role === 'STUDENT' &&
    Boolean(campus && classNum && name && name.trim()) &&
    campus &&
    isDuplicatedUser(campus.key!, classNum as number, name!.trim() as string)

  // clear dependent fields if parent changes
  useEffect(() => {
    // campus 변경 시, class & name & mattermost 초기화
    setClassNum(null)
    setName(null)
    setMattermostId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campus])

  useEffect(() => {
    // class 변경 시, name & mattermost 초기화
    setName(null)
    setMattermostId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classNum])

  // activeToggle이 변경될 때 campus, classNum, name, mattermostId 초기화
  useEffect(() => {
    setCampus(null) // 기본 캠퍼스('seoul')로 초기화
    setClassNum(null)
    setName(null)
    setMattermostId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  return (
    <AppContainer>
      <PageWrapper>
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

        <Title>누구의 오븐에 넣을까요?</Title>

        <ToggleWrapper>
          <ToggleButton
            active={role === 'STUDENT'}
            onClick={() => setRole('STUDENT')}
          >
            교육생
          </ToggleButton>

          <ToggleButton
            active={role === 'TEACHER'}
            onClick={() => setRole('TEACHER')}
          >
            프로님 / 강사님
          </ToggleButton>
        </ToggleWrapper>

        <FormSection>
          {/* 교육생 선택 시 캠퍼스 및 반 선택 */}
          {role === 'STUDENT' && (
            <>
              <div>
                <Label>캠퍼스</Label>
                <Select
                  value={campus?.key ?? ''}
                  onChange={(e) => {
                    const selected = CAMPUS_ENTRIES.find(
                      (c) => c.key === e.target.value,
                    )
                    setCampus(selected ?? null)
                  }}
                >
                  <option value="">선택</option>
                  {CAMPUS_ENTRIES.map(({ key, label }) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label>반</Label>
                <Select
                  value={classNum ?? ''}
                  onChange={(e) =>
                    setClassNum(e.target.value ? Number(e.target.value) : null)
                  }
                  disabled={!campus} // campus가 선택되지 않으면 disabled
                >
                  <option value="">선택</option>
                  {/* campus가 null이 아닐 때만 반 목록을 가져옴 */}
                  {campus &&
                    getClassesForCampus(campus.key).map((num) => (
                      <option key={num} value={num}>
                        {num}반
                      </option>
                    ))}
                </Select>
              </div>
            </>
          )}

          {/* 성명 입력 (Input) */}
          <div>
            <Label htmlFor="receiver-name">성함</Label>
            <Input
              id="receiver-name"
              placeholder="입력"
              value={name ?? ''}
              onChange={(e) => setName(e.target.value || null)}
            />
          </div>

          <LabelWrap ref={labelWrapRef}>
            {/* Mattermost input: shouldShowMattermost 조건에 따라 표시/숨김 */}
            {shouldShowMattermost ? (
              <>
                <LabelAnchor
                  // LabelAnchor가 마우스 이벤트 및 포커스 이벤트를 처리하여 툴팁을 띄웁니다.
                  onMouseEnter={openTooltip}
                  onMouseLeave={closeTooltip}
                  onFocus={openTooltip}
                  onBlur={(e) => {
                    const related = (e as React.FocusEvent)
                      .relatedTarget as Node | null
                    if (
                      tooltipRef.current &&
                      tooltipRef.current.contains(related)
                    )
                      return
                    closeTooltip()
                  }}
                >
                  {/* MattermostLabel: 레이블 텍스트와 아이콘을 포함 */}
                  <MattermostLabel htmlFor="mattermost-id">
                    Mattermost 아이디
                    <FontAwesomeIcon icon={faCircleQuestion} />
                  </MattermostLabel>

                  {/* 툴팁 컨테이너 */}
                  <TooltipContainer
                    ref={tooltipRef}
                    position={tooltipPosition}
                    role="dialog"
                    aria-hidden={!isOpen}
                    // 툴팁 자체에 마우스를 올렸을 때 툴팁이 닫히지 않도록 이벤트 처리
                    onMouseEnter={openTooltip}
                    onMouseLeave={closeTooltip}
                    onFocus={openTooltip}
                    onBlur={closeTooltip}
                  >
                    <TooltipInner>
                      <ProfileCard />
                    </TooltipInner>
                    <TooltipArrow position={tooltipPosition} />
                  </TooltipContainer>
                </LabelAnchor>

                {/* 실제 Mattermost Input 필드 */}
                <Input
                  id="mattermost-id"
                  placeholder="@를 제외한 아이디를 입력해주세요"
                  value={mattermostId ?? ''}
                  onChange={(e) => setMattermostId(e.target.value || null)}
                  aria-describedby="mattermost-help"
                />
              </>
            ) : (
              // shouldShowMattermost가 false일 때의 Input (숨김/비활성화)
              <Input
                id="mattermost-id"
                placeholder="수신자 목록에 없으면 아이디 입력란이 보이지 않습니다."
                value=""
                readOnly
                disabled // disabled로 비활성화하여 포커스 방지
                style={{ display: 'none' }} // 아예 보이지 않도록 처리 (자리 차지 방지)
              />
            )}
          </LabelWrap>
        </FormSection>
        <BottomSection>
          <SubmitButton
            onClick={handleGoNext}
            aria-disabled={!name || name.trim() === ''}
          >
            편지 쓰러 가기
            <span>→</span>
          </SubmitButton>
        </BottomSection>
      </PageWrapper>
    </AppContainer>
  )
}

export default Step2ChooseReceiver
