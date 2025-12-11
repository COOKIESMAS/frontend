import { useRef } from 'react'

export default function useDragScroll<T extends HTMLElement>() {
  const targetEl = useRef<T>(null)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollStartRef = useRef(0)

  const onMouseDown = (e: React.MouseEvent<T>) => {
    if (!targetEl.current) return

    isDraggingRef.current = false
    startXRef.current = e.clientX
    scrollStartRef.current = targetEl.current.scrollLeft

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!targetEl.current) return

    const dx = e.clientX - startXRef.current

    // 일정 거리 이상이면 드래그로 판단
    if (Math.abs(dx) > 3) {
      isDraggingRef.current = true
    }

    if (isDraggingRef.current) {
      e.preventDefault()
      targetEl.current.scrollLeft = scrollStartRef.current - dx
    }
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  return { targetEl, onMouseDown, isDraggingRef }
}
