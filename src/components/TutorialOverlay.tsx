import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

export type TutorialStep = {
  id?: string
  image?: string
  textImg?: string
  textImgTranslate?: {
    x: number | string
    y: number | string
  }
  durationMs?: number
}

// --- Styled Components (애니메이션 수정) ---

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
  font-family:
    'NanumJangMiCe',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
`

const CenterImageWrapper = styled.div`
  position: relative;
`

// 위치(tx, ty)를 고정한 상태에서 등장하는 애니메이션
const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) translateY(12px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(var(--tx), var(--ty)) translateY(0) scale(1);
  }
`

const CenterImage = styled.img`
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  --tx: 0px;
  --ty: 0px;
  animation: ${fadeSlideIn} 240ms ease-out backwards;
`

const TextImage = styled.img<{
  $translateX?: number | string
  $translateY?: number | string
}>`
  position: absolute;
  user-select: none;
  pointer-events: none;

  /* 위치 좌표를 먼저 정의 */
  --tx: ${({ $translateX }) =>
    typeof $translateX === 'number'
      ? `${$translateX}px`
      : $translateX || '-70%'};
  --ty: ${({ $translateY }) =>
    typeof $translateY === 'number'
      ? `${$translateY}px`
      : $translateY || '-60%'};

  /* 위치 고정 및 애니메이션 적용 */
  transform: translate(var(--tx), var(--ty));
  animation: ${fadeSlideIn} 240ms ease-out backwards;
`

// --- UI Components ---
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
  background: ${({ primary }) => (primary ? '#111' : 'rgba(255,255,255,0.95)')};
  color: ${({ primary }) => (primary ? '#fff' : '#111')};
  font-weight: 600;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08);
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* 버튼도 장미체로 고정 */
  font-family:
    'NanumJangMiCe',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
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
  open: boolean
  enableAutoAdvance?: boolean
  autoAdvanceMs?: number
  onFinish?: () => void
}) {
  const [visible, setVisible] = useState<boolean>(open)
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const mountedRef = useRef(true)

  // 1. 에러 해결 핵심: finish와 핸들러들을 useEffect보다 위로 올립니다.
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

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  // 2. 이제 finish가 위에 선언되어 있으므로 여기서 에러가 나지 않습니다.
  useEffect(() => {
    if (!visible) return
    if (!enableAutoAdvance) return
    const step = steps[index]
    const dur = step?.durationMs ?? autoAdvanceMs
    if (!dur || dur <= 0) return

    if (timerRef.current) window.clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return
      goNext() // finish를 직접 부르는 대신 goNext를 사용하면 로직이 더 깔끔합니다.
    }, dur)

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [index, visible])

  if (!visible) return null

  const cur = steps[index] ?? {}

  return (
    <Overlay visible={visible} role="dialog" aria-modal="true">
      <Card>
        <CenterImageWrapper key={index}>
          {cur.image && (
            <CenterImage src={cur.image} alt={`step-${index + 1}`} />
          )}
          {cur.textImg && (
            <TextImage
              src={cur.textImg}
              $translateX={cur.textImgTranslate?.x}
              $translateY={cur.textImgTranslate?.y}
            />
          )}
        </CenterImageWrapper>

        <Controls>
          <Button onClick={goPrev} disabled={index === 0}>
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
