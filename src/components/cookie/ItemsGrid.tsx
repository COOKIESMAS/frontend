import styled from 'styled-components'
import { type Item } from '@/constant/items'

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
  border: 4px solid ${(p) => (p.isSelected ? '#009DFF' : 'transparent')};

  ${(p) =>
    p.isSelected &&
    `
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default function ItemsGrid({
  items,
  selectedAsset,
  onSelect,
}: {
  items: Item[]
  selectedAsset: string | null
  onSelect: (asset: string | null) => void
}) {
  return (
    <GridContainer>
      {items.map((item) => (
        <SelectItem
          key={item.name}
          isSelected={selectedAsset === item.asset}
          onClick={() => onSelect(item.asset)}
        >
          <img src={item.asset} alt={item.name} draggable={false} />
        </SelectItem>
      ))}
    </GridContainer>
  )
}
