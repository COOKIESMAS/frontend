import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

/**
 * Tutorial step 형태
 * - image: 중앙에 보여줄 이미지 (쿠키 등)
 * - bubbleImage?: 말풍선 배경 이미지(선택)
 * - text?: 말풍선에 들어갈 텍스트 (HTML 아님, 단순 텍스트/줄바꿈 허용)
 * - durationMs?: 이 스텝을 자동으로 넘길 시간(밀리초). undefined면 자동 진행 안 함.
 */
export type TutorialStep = {
  id?: string
  image?: string
  textImg?: string
  text?: string
  durationMs?: number
}

const Overlay = styled.div<{ visible: boolean }>`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  box-sizing: border-box;
`

const Card = styled.div`
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  /* 전체 튜토리얼 카드에 장미체 적용 */
  font-family: 'NanumJangMiCe', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
`

const CenterImageWrapper = styled.div`
  position: relative;
`

const CenterImage = styled.img`
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`

const TextImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-10%, -60%);
`

const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 6px;
`

const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${({ primary }) =>
    primary ? '#111' : 'rgba(255,255,255,0.95)'};
  color: ${({ primary }) => (primary ? '#fff' : '#111')};
  font-weight: 600;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08);

  /* 버튼도 장미체로 고정 */
  font-family: 'NanumJangMiCe', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
`

const Dots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const Dot = styled.div<{ active?: boolean }>`
  width: ${({ active }) => (active ? '12px' : '8px')};
  height: 8px;
  border-radius: 8px;
  background: ${({ active }) => (active ? '#fff' : 'rgba(255,255,255,0.5)')};
  transition: all 140ms ease;
`

export default function TutorialOverlay({
  steps,
  open,
  autoAdvanceMs = 3500,
  enableAutoAdvance = true,
  onFinish,
}: {
  steps: TutorialStep[]
  /** 열림 여부 */
  open: boolean
  /** 자동 진행 여부 */
  enableAutoAdvance?: boolean
  /** 기본 자동 진행 시간 (각 step의 durationMs가 없을 때 사용) */
  autoAdvanceMs?: number
  /** 튜토리얼 끝났을 때 호출 */
  onFinish?: () => void
}) {
  const [visible, setVisible] = useState<boolean>(open)
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  // 자동 진행: 현재 스텝의 duration 설정을 우선 사용, 없으면 autoAdvanceMs, 없으면 비활성
  useEffect(() => {
    if (!visible) return
    if (!enableAutoAdvance) return
    const step = steps[index]
    const dur = step?.durationMs ?? autoAdvanceMs
    if (!dur || dur <= 0) return
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return
      if (index < steps.length - 1) {
        setIndex((i) => i + 1)
      } else {
        finish()
      }
    }, dur)
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, visible])

  const finish = () => {
    setVisible(false)
    onFinish?.()
  }

  const goNext = () => {
    if (index < steps.length - 1) {
      setIndex((i) => i + 1)
    } else {
      finish()
    }
  }

  const goPrev = () => setIndex((i) => Math.max(0, i - 1))

  if (!visible) return null

  const cur = steps[index] ?? {}

  return (
    <Overlay
      visible={visible}
      role="dialog"
      aria-modal="true"
      aria-label="홈 튜토리얼"
    >
      <Card>
        <CenterImageWrapper>
          {cur.image && (
            <CenterImage src={cur.image} alt={`step-${index + 1}`} />
          )}
          {cur.textImg && <TextImage src={cur.textImg} />}
        </CenterImageWrapper>

        <Controls>
          <Button
            onClick={goPrev}
            disabled={index === 0}
            aria-disabled={index === 0}
          >
            이전
          </Button>

          <Dots aria-hidden>
            {steps.map((_, i) => (
              <Dot key={i} active={i === index} />
            ))}
          </Dots>

          <Button primary onClick={goNext}>
            {index === steps.length - 1 ? '완료' : '다음'}
          </Button>
        </Controls>

        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}
        />
      </Card>
    </Overlay>
  )
}
