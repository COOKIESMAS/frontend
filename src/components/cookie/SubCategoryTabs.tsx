import styled from 'styled-components'
import {
  type SelectableSubCategoryKey,
  type SubCategory,
} from '@/constant/items'
import useDragScroll from '@/hooks/useDragScroll'

const SubTabsContainer = styled.div`
  display: flex;
  padding: 12px 8px 0px;
  gap: 10px;
  background: #f3f4f5;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  user-select: none;
  cursor: grab;
`

const SubTab = styled.button<{ isActive?: boolean }>`
  border: none;
  width: 88px;
  border-radius: 16px;
  padding: 8px 12px;
  background: ${(p) => (p.isActive ? '#D9D9D9' : '#ffffff')};
  flex: 0 0 auto;
  cursor: pointer;
  font-size: 15px;
  scroll-snap-align: start;

  &:hover {
    background-color: #d9d9d9;
    color: black;
  }
`

export default function SubCategoryTabs({
  currentSubCategoryKeys,
  subCategory,
  setSubCategory,
  currentCategoryContent,
}: {
  currentSubCategoryKeys: readonly SelectableSubCategoryKey[]
  subCategory: SelectableSubCategoryKey
  setSubCategory: (s: SelectableSubCategoryKey) => void
  currentCategoryContent: { [k: string]: SubCategory | string }
}) {
  const { targetEl, onMouseDown, isDraggingRef } =
    useDragScroll<HTMLDivElement>()

  const handleClick =
    (key: SelectableSubCategoryKey) => (e: React.MouseEvent) => {
      // 드래그 상태면 click 무효
      if (isDraggingRef.current) {
        e.preventDefault()
        return
      }
      setSubCategory(key)
    }

  return (
    <SubTabsContainer ref={targetEl} onMouseDown={onMouseDown}>
      {currentSubCategoryKeys.map((sub) => (
        <SubTab
          key={sub}
          isActive={subCategory === sub}
          onClick={handleClick(sub)}
        >
          {(currentCategoryContent[sub] as SubCategory).type}
        </SubTab>
      ))}
    </SubTabsContainer>
  )
}
