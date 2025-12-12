import styled from 'styled-components'
import { type ItemsData, type MainCategoryKey } from '@/constant/items'

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`
const TabBtn = styled.button<{ active?: boolean }>`
  width: 100%;
  border: none;
  padding: 16px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(p) => (p.active ? '#F3F4F5' : '#ffffff')};
  font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
  color: ${(p) => (p.active ? 'black' : '#969696')};

  &:hover {
    background-color: #f3f4f5;
    color: black;
  }
`

export default function CategoryTabs({
  mainCategory,
  setMainCategory,
  itemsData,
}: {
  mainCategory: MainCategoryKey
  setMainCategory: (c: MainCategoryKey) => void
  itemsData: ItemsData
}) {
  return (
    <TabsContainer>
      {(Object.keys(itemsData) as MainCategoryKey[]).map((cat) => (
        <TabBtn
          key={cat}
          active={mainCategory === cat}
          onClick={() => setMainCategory(cat)}
        >
          {itemsData[cat].type}
        </TabBtn>
      ))}
    </TabsContainer>
  )
}
