import styled from 'styled-components'
import { useAtom } from 'jotai'
import {
  type SelectableSubCategoryKey,
  MAIN_CATEGORY_SUBS,
  SUB_CATEGORY_LABEL,
} from '@/constant/items'
import { mainCategoryAtom, subCategoryAtom } from '@/store/atoms/cookieAtoms'
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

export default function SubCategoryTabs() {
  const [mainCategory] = useAtom(mainCategoryAtom)
  const [subCategory, setSubCategory] = useAtom(subCategoryAtom)

  const { targetEl, onMouseDown, isDraggingRef } =
    useDragScroll<HTMLDivElement>()

  const subCategoryKeys = MAIN_CATEGORY_SUBS[
    mainCategory
  ] as readonly SelectableSubCategoryKey[]

  const handleClick =
    (key: SelectableSubCategoryKey) => (e: React.MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault()
        return
      }
      setSubCategory(key)
    }

  return (
    <SubTabsContainer ref={targetEl} onMouseDown={onMouseDown}>
      {subCategoryKeys.map((key) => (
        <SubTab
          key={key}
          isActive={subCategory === key}
          onClick={handleClick(key)}
        >
          {SUB_CATEGORY_LABEL[key]}
        </SubTab>
      ))}
    </SubTabsContainer>
  )
}
