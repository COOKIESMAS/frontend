import styled from 'styled-components'

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 3000;
`

const Highlight = styled.div<{
  top: number
  left: number
  width: number
  height: number
}>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 16px;
  box-shadow:
    0 0 0 4px rgba(255, 255, 255, 0.9),
    0 0 30px rgba(255, 255, 255, 0.9);
  pointer-events: none;
`

export default function ActionHighlightOverlay({
  targetRect,
  onClick,
}: {
  targetRect: DOMRect
  onClick: () => void
}) {
  return (
    <Overlay onClick={onClick}>
      <Highlight
        top={targetRect.top}
        left={targetRect.left}
        width={targetRect.width}
        height={targetRect.height}
      />
    </Overlay>
  )
}
