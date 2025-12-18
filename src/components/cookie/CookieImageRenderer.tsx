import styled from 'styled-components'
import { useAtomValue } from 'jotai'
import { type SelectableSubCategoryKey } from '@/constant/items'
import { selectedItemsAtom } from '@/store/atoms/cookieAtoms'
import { useCookieParts } from '@/hooks/queries/useCookieParts'
import { zIndexMap, styleMap } from '@/constant/cookieStyleMap'
import pen1 from '@/assets/image/pen_1.svg'

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

export default function CookieImageRenderer() {
  const selectedItems = useAtomValue(selectedItemsAtom)
  const { data: partsData } = useCookieParts()

  if (!partsData) return null

  return (
    <CookieWrapper>
      {/* 고정 레이어 */}
      <CookiePartImg src={pen1} alt="pen" zIndex={1} />

      {(Object.keys(selectedItems) as SelectableSubCategoryKey[]).map(
        (subKey) => {
          const index = selectedItems[subKey]
          if (index === null) return null

          const src = partsData[subKey]?.[index]
          if (!src) return null

          return (
            <CookiePartImg
              key={`${subKey}-${index}`}
              src={src}
              alt={`${subKey}-${index}`}
              zIndex={zIndexMap[subKey] ?? 0}
              style={styleMap[subKey]}
            />
          )
        },
      )}
    </CookieWrapper>
  )
}
