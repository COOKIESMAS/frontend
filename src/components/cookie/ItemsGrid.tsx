import styled from 'styled-components'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCookieParts } from '@/hooks/queries/useCookieParts'
import { selectedItemsAtom, subCategoryAtom } from '@/store/atoms/cookieAtoms'
import { selectCookiePartAtom } from '@/store/effects/selectCookiePartAtom'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex: 1;
  gap: 10px;
  background: #f3f4f5;
  padding: 10px 5px;
  overflow-y: auto;
  align-content: start;
  grid-auto-rows: 120px;
`

const SelectItem = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  background: #aea7a7;
  overflow: hidden;
  border: 4px solid ${(p) => (p.isSelected ? '#009dff' : 'transparent')};

  ${(p) =>
    p.isSelected &&
    `
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}

  & > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    pointer-events: none;
  }
`

export default function ItemsGrid() {
  const { data } = useCookieParts()
  const selectedItems = useAtomValue(selectedItemsAtom)
  const [subCategory] = useAtom(subCategoryAtom)
  const selectPart = useSetAtom(selectCookiePartAtom)

  if (!data) return null

  const items = data[subCategory]
  if (!items || !items.length) return null

  const selectedIndex = selectedItems[subCategory]

  const handleSelect = (index: number) => {
    selectPart({ subCategory, index })
  }

  return (
    <GridContainer>
      {items.map((src, index) => (
        <SelectItem
          key={`${subCategory}-${index}`}
          isSelected={selectedIndex === index}
          onClick={() => handleSelect(index)}
        >
          <img src={src} alt={`item-${index}`} draggable={false} />
        </SelectItem>
      ))}
    </GridContainer>
  )
}
