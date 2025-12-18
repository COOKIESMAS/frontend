import styled from 'styled-components'
import type { SelectableSubCategoryKey } from '@/constant/items'
import { zIndexMap, styleMap } from '@/constant/cookieStyleMap'
import pen1 from '@/assets/image/pen_1.svg'
import type { CookieDesignImgDataCamel } from '@/types/cookie'

const CookieWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 380px;
  margin: 0 auto;
  flex-shrink: 0;
`

const CookiePartImg = styled.img<{ zIndex: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  z-index: ${(p) => p.zIndex};
  pointer-events: none;
`

export default function CookieImageRenderer2({
  designData,
}: {
  designData: CookieDesignImgDataCamel
}) {
  return (
    <CookieWrapper>
      {/* 고정 레이어 */}
      <CookiePartImg src={pen1} alt="pen" zIndex={1} />

      {(Object.keys(designData) as SelectableSubCategoryKey[]).map((subKey) => {
        const src = designData[subKey]
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
