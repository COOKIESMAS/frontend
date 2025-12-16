import styled from 'styled-components'
import { type SelectableSubCategoryKey } from '@/constant/items'
import { zIndexMap, styleMap } from '@/constant/cookieStyleMap'
import type { CookieDesignData } from '../../types/cookie'

interface OvenCookieImageRendererProps {
  designData: CookieDesignData
}

/**
 * 내 오븐에서 사용하는 쿠키 렌더러
 * - 백엔드에서 받은 design_data를 그대로 그림
 * - 에디터 쪽과 같은 z-index / styleMap을 사용
 */
export default function OvenCookieImageRenderer({
  designData,
}: OvenCookieImageRendererProps) {
  if (!designData) return null

  return (
    <CookieWrapper>
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
 * 팬 안의 한 칸(기존 검은 네모) 사이즈에 맞춘 래퍼
 */
const CookieWrapper = styled.div`
  position: relative;
  width: 150%;
  height: 150%;
  border-radius: 16px;
  overflow: visible;
`

const CookiePartImg = styled.img<{ zIndex: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%; /* 필요하면 80%로 줄여도 됨 */
  transform: translate(-50%, -50%);
  z-index: ${(p) => p.zIndex};
  pointer-events: none;
`
