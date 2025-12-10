import styled from 'styled-components'
import {
  type SelectedItems,
  type SelectableSubCategoryKey,
} from '@/constant/items'
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

const CookiePartImg = styled.img<{ zIndex: number; type: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  height: auto;
  width: 80%;
  z-index: ${(p) => p.zIndex};
  transform: translate(-50%, -50%);
`

export default function CookieImageRenderer({
  selectedItems,
}: {
  selectedItems: SelectedItems
}) {
  return (
    <CookieWrapper>
      <CookiePartImg src={pen1} alt="pen" zIndex={1} type="pen" />
      {Object.entries(selectedItems).map(([key, asset]) => {
        if (!asset) return null
        const typedKey = key as SelectableSubCategoryKey
        const z = zIndexMap[typedKey] ?? 0
        const style = styleMap[typedKey]
        return (
          <CookiePartImg
            key={key}
            src={asset}
            alt={`${key} item`}
            zIndex={z}
            style={style}
            type={typedKey}
          />
        )
      })}
    </CookieWrapper>
  )
}
