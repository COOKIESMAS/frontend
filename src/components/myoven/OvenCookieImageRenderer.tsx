// src/components/myoven/OvenCookieImageRenderer.tsx
import styled from 'styled-components'
import { type SelectableSubCategoryKey } from '@/constant/items'
import { zIndexMap, styleMap } from '@/constant/cookieStyleMap'
import type { CookieDesignData } from '../../types/cookie'

interface OvenCookieImageRendererProps {
  designData: CookieDesignData
  isRead: boolean
  onClick?: () => void
}

/**
 * 내 오븐에서 사용하는 쿠키 렌더러
 * - 백엔드에서 받은 design_data를 그대로 그림
 * - is_read=false면 좌상단에 new.png를 올려줌
 */
export default function OvenCookieImageRenderer({
  designData,
  isRead,
  onClick,
}: OvenCookieImageRendererProps) {
  if (!designData) return null

  return (
    <CookieWrapper onClick={onClick}>
      {!isRead && <NewBadge src="/new.png" alt="새 쿠키" />}

      {(Object.entries(designData) as [
        SelectableSubCategoryKey,
        string | null,
      ][]).map(([subKey, src]) => {
        if (!src) return null

        return (
          <CookiePartImg
            key={subKey}
            src={src}
            alt={subKey}
            zIndex={zIndexMap[subKey] ?? 0}
            style={styleMap[subKey]}
          />
        )
      })}
    </CookieWrapper>
  )
}

// ───────────────── styled-components ─────────────────

/**
 * 팬 안의 한 칸 사이즈에 맞춘 래퍼
 */
const CookieWrapper = styled.div`
  position: relative;
  width: 150%;
  height: 15  0%;
  border-radius: 16px;
  overflow: visible;
  cursor: pointer;
`

const NewBadge = styled.img`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 28px;
  height: auto;
  z-index: 999; /* 쿠키 파츠들보다 항상 위 */
  pointer-events: none;
`

const CookiePartImg = styled.img<{ zIndex: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  z-index: ${(p) => p.zIndex};
  pointer-events: none;
`
