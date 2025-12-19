import styled from 'styled-components'
import { useAtom } from 'jotai'
import {
  MAIN_CATEGORY_LABEL,
  MAIN_CATEGORY_SUBS,
  type MainCategoryKey,
} from '@/constant/items'
import { mainCategoryAtom, subCategoryAtom } from '@/store/atoms/cookieAtoms'

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const TabBtn = styled.button<{ active?: boolean }>`
  font-family: 'IM_Hyemin';
  font-weight: 700;
  width: 100%;
  border: none;
  padding: 16px;
  cursor: pointer;
  font-size: 20px;
  background-color: ${(p) => (p.active ? '#F3F4F5' : '#ffffff')};
  font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
  color: ${(p) => (p.active ? 'black' : '#969696')};

  &:hover {
    background-color: #f3f4f5;
    color: black;
  }
`

export default function CategoryTabs() {
  const [mainCategory, setMainCategory] = useAtom(mainCategoryAtom)
  const [, setSubCategory] = useAtom(subCategoryAtom)

  const handleClick = (cat: MainCategoryKey) => {
    if (cat === mainCategory) return

    setMainCategory(cat)

    // 메인 카테고리 변경 시 첫 서브카테고리로 초기화
    const firstSub = MAIN_CATEGORY_SUBS[cat][0]
    setSubCategory(firstSub)
  }

  return (
    <TabsContainer>
      {(Object.keys(MAIN_CATEGORY_SUBS) as MainCategoryKey[]).map((cat) => (
        <TabBtn
          key={cat}
          active={mainCategory === cat}
          onClick={() => handleClick(cat)}
        >
          {MAIN_CATEGORY_LABEL[cat]}
        </TabBtn>
      ))}
    </TabsContainer>
  )
}
