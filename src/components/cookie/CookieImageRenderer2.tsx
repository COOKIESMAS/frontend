import styled from 'styled-components'
import type { SelectableSubCategoryKey } from '@/constant/items'
import { zIndexMap, styleMap2 } from '@/constant/cookieStyleMap'
import ovenpan from '/ovenpan.png'
import type { CookieDesignImgDataCamel } from '@/types/cookie'

const CookieWrapper = styled.div<{ isRound: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 380px;
  margin: 0 auto;
  flex-shrink: 0;
  background-color: inherit;

  /* isRound가 true일 때만 border-radius 적용 */
  border-radius: ${({ isRound }) => (isRound ? '999px' : '0')};

  /* 만약 둥근 모양을 유지하면서 내용이 넘치지 않게 하려면 아래 속성도 권장합니다 */
  overflow: ${({ isRound }) => (isRound ? 'hidden' : 'visible')};
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

export default function CookieImageRenderer2({
  designData,
  isPen = true,
  isRound = false,
}: {
  designData: CookieDesignImgDataCamel
  isPen?: boolean
  isRound?: boolean
}) {
  return (
    <CookieWrapper isRound={isRound}>
      {/* 고정 레이어 */}
      {isPen && <CookiePartImg src={ovenpan} alt="pen" zIndex={1} />}

      {(Object.keys(designData) as SelectableSubCategoryKey[]).map((subKey) => {
        const src = designData[subKey]
        if (!src) return null

        return (
          <CookiePartImg
            key={subKey}
            src={src}
            alt={subKey}
            zIndex={zIndexMap[subKey] ?? 0}
            style={styleMap2[subKey]}
          />
        )
      })}
    </CookieWrapper>
  )
}
