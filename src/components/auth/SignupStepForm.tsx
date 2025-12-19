// src/components/auth/SignupStepForm.tsx
import React, {
  type ChangeEvent,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react'
import styled, { css } from 'styled-components'
import { Button } from '@chakra-ui/react'
import {
  BottomButtonContainer,
  FieldGroup,
  FieldLabel,
  FormContainer,
  NoticeText,
  SelectField,
  TextField,
  StepFormHeader,
  StepFormBackButton,
} from './SignupFlow.styles'
import type { CampusKey, CampusOption } from './signupTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import ProfileCard from '@/components/ProfileCard'

interface SignupStepFormProps {
  isStudent: boolean
  campus: CampusKey | ''
  classNumber: string
  name: string
  mmId: string
  campusOptions: CampusOption[]
  classOptions: string[]
  canRequestCode: boolean
  onChangeCampus: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeClass: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeMmId: (event: ChangeEvent<HTMLInputElement>) => void
  onClickRequestCode: () => void
  onClickBack: () => void
}

export const SignupStepForm: React.FC<SignupStepFormProps> = ({
  isStudent,
  campus,
  classNumber,
  name,
  mmId,
  campusOptions,
  classOptions,
  canRequestCode,
  onChangeCampus,
  onChangeClass,
  onChangeName,
  onChangeMmId,
  onClickRequestCode,
  onClickBack,
}) => {
  // ───── Mattermost 툴팁 상태/위치 계산 ─────
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>(
    'top',
  )
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const labelWrapRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const computePosition = useCallback(() => {
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
  }, [])

  useLayoutEffect(() => {
    if (!isTooltipOpen) return

    const handleUpdate = () => {
      computePosition()
    }

    window.addEventListener('resize', handleUpdate)
    window.addEventListener('scroll', handleUpdate, true)

    return () => {
      window.removeEventListener('resize', handleUpdate)
      window.removeEventListener('scroll', handleUpdate, true)
    }
  }, [isTooltipOpen, computePosition])

  const openTooltip = () => {
    setIsTooltipOpen(true)
    // DOM 업데이트 이후에 위치 계산 (rAF로 비동기 처리)
    requestAnimationFrame(() => {
      computePosition()
    })
  }

  const closeTooltip = () => setIsTooltipOpen(false)

  return (
    <>
      <StepFormHeader>
        <StepFormBackButton type="button" onClick={onClickBack}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </StepFormBackButton>
      </StepFormHeader>

      <FormContainer>
        {isStudent && (
          <>
            <FieldGroup>
              <FieldLabel htmlFor="campus">캠퍼스</FieldLabel>
              <SelectField
                id="campus"
                value={campus}
                onChange={onChangeCampus}
              >
                <option value="">캠퍼스를 선택해주세요</option>
                {campusOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="classNumber">반</FieldLabel>
              <SelectField
                id="classNumber"
                value={classNumber}
                onChange={onChangeClass}
                disabled={!campus}
              >
                <option value="">반을 선택해주세요</option>
                {classOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}반
                  </option>
                ))}
              </SelectField>
            </FieldGroup>
          </>
        )}

        <FieldGroup>
          <FieldLabel htmlFor="name">성명</FieldLabel>
          <TextField
            id="name"
            value={name}
            onChange={onChangeName}
            placeholder="이름을 입력해주세요"
          />
        </FieldGroup>

        {/* Mattermost 아이디 + ? 아이콘 툴팁 */}
        <FieldGroup>
          <LabelWrap ref={labelWrapRef}>
            <LabelAnchor>
              <MattermostLabel htmlFor="mmId">
                Mattermost 아이디
                {/* ✅ 아이콘에만 hover/focus 이벤트 연결 */}
                <IconWrapper
                  tabIndex={0}
                  onMouseEnter={openTooltip}
                  onMouseLeave={closeTooltip}
                  onFocus={openTooltip}
                  onBlur={closeTooltip}
                >
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </IconWrapper>
              </MattermostLabel>

              <TooltipContainer
                ref={tooltipRef}
                position={tooltipPosition}
                $open={isTooltipOpen}
                role="dialog"
                aria-hidden={!isTooltipOpen}
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
              >
                <TooltipInner>
                  <ProfileCard />
                </TooltipInner>
                <TooltipArrow position={tooltipPosition} />
              </TooltipContainer>
            </LabelAnchor>

            <TextField
              id="mmId"
              value={mmId}
              onChange={onChangeMmId}
              placeholder="@ 없이 아이디만 입력해주세요"
            />
          </LabelWrap>
        </FieldGroup>


        <NoticeText>
          입력하신 정보로 Mattermost DM을 전송합니다
        </NoticeText>
      </FormContainer>

      <BottomButtonContainer>
        <Button
          width="100%"
          height="52px"
          borderRadius="12px"
          backgroundColor={canRequestCode ? '#2F2F2F' : '#C4C4C4'}
          color="#FFFFFF"
          _hover={{
            backgroundColor: canRequestCode ? '#1f1f1f' : '#C4C4C4',
          }}
          disabled={!canRequestCode}
          onClick={onClickRequestCode}
        >
          인증코드 받기
        </Button>
      </BottomButtonContainer>
    </>
  )
}

/* ───────────────── ToolTip styled-components ───────────────── */

const LabelWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  &:focus-within {
    outline: none;
  }
`

const LabelAnchor = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
`

const TooltipContainer = styled.div<{
  position: 'top' | 'bottom'
  $open: boolean
}>`
  position: absolute;
  left: 0;
  transform: translateY(${(p) => (p.$open ? '0' : '6px')});
  opacity: ${(p) => (p.$open ? 1 : 0)};
  visibility: ${(p) => (p.$open ? 'visible' : 'hidden')};
  pointer-events: ${(p) => (p.$open ? 'auto' : 'none')};
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

const MattermostLabel = styled(FieldLabel)`
  display: flex;
  align-items: center;
  gap: 4px;
`

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
`

/* ──────────────────────────────────────────────────────────── */