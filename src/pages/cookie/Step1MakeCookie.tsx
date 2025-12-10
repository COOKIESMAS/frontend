import { useState } from 'react'
import styled from 'styled-components'
import { useSetAtom } from 'jotai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import {
  itemsData,
  type SelectedItems,
  type SelectableSubCategoryKey,
  type MainCategoryKey,
  MAIN_CATEGORY_SUBS,
} from '@/constant/items'
import { dialogAtom } from '@/store/dialog'
import CookieImageRenderer from '@/components/cookie/CookieImageRenderer'
import CategoryTabs from '@/components/cookie/CategoryTabs'
import SubCategoryTabs from '@/components/cookie/SubCategoryTabs'
import ItemsGrid from '@/components/cookie/ItemsGrid'
import { getItemsFor } from '@/utils/items-utils'

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`

const PageWrapper = styled.main`
  position: relative;
  max-width: 375px;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  background-color: #e8c7c7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
`

const PageTitle = styled.h1`
  font-size: 18px;
  margin: 0;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

const GradientButton = styled.button`
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 700;
  background: conic-gradient(
    from 0deg,
    #d70000 5%,
    #e56000 17%,
    #e6cc00 32%,
    #70cc00 51%,
    #00cddb 67%,
    #0408dd 82%,
    #8000d5 96%
  );
  border: 1px solid #ffc0cb;
  color: white;
`

const CompleteButton = styled.button`
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 700;
  background: black;
  color: white;
`

const BottomSheetContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  min-height: 0;
`

export default function Step1MakeCookie() {
  const navigate = useNavigate()
  const setDialogState = useSetAtom(dialogAtom)

  const [mainCategory, setMainCategory] = useState<MainCategoryKey>('face')
  const [subCategory, setSubCategory] =
    useState<SelectableSubCategoryKey>('body')

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    body: itemsData.face.body.data[0].asset,
    eyes: itemsData.face.eyes.data[0].asset,
    mouth: itemsData.face.mouth.data[0].asset,
    hair: null,
    blush: null,
    hat: null,
    top: null,
    pants: null,
    onePiece: null,
    accessory: null,
  })

  const handleItemSelect = (
    keyToUpdate: SelectableSubCategoryKey,
    asset: string | null,
  ) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev, [keyToUpdate]: asset }
      if (keyToUpdate === 'onePiece' && asset !== null) {
        newItems.top = null
        newItems.pants = null
      } else if (
        (keyToUpdate === 'top' || keyToUpdate === 'pants') &&
        asset !== null
      ) {
        newItems.onePiece = null
      }
      return newItems
    })
  }

  const handleGoBack = () => {
    setDialogState({
      isOpen: true,
      title: '나가시겠습니까?',
      message: '만들던 쿠키가 사라져요!',
      onConfirm: () => navigate(-1),
      onCancel: () => {},
    })
  }

  const handleGoNext = () => navigate('/cookie/step2')

  const currentCategoryContent = itemsData[mainCategory]
  const currentSubCategoryKeys = MAIN_CATEGORY_SUBS[
    mainCategory
  ] as readonly SelectableSubCategoryKey[]
  const currentItems = getItemsFor(mainCategory, subCategory, itemsData)

  return (
    <AppContainer>
      <PageWrapper>
        <HeaderWrapper>
          <HeaderLeft>
            <BackButton onClick={handleGoBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </BackButton>
            <PageTitle>쿠키만들기</PageTitle>
          </HeaderLeft>
          <ButtonGroup>
            <GradientButton>랜덤 바꾸기</GradientButton>
            <CompleteButton onClick={handleGoNext}>완성 !</CompleteButton>
          </ButtonGroup>
        </HeaderWrapper>
        <CookieImageRenderer selectedItems={selectedItems} />
        <BottomSheetContainer>
          <CategoryTabs
            mainCategory={mainCategory}
            setMainCategory={(c) => {
              setMainCategory(c)
              const first = MAIN_CATEGORY_SUBS[c][0]
              setSubCategory(first)
            }}
            itemsData={itemsData}
          />
          <SubCategoryTabs
            currentSubCategoryKeys={currentSubCategoryKeys}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            currentCategoryContent={currentCategoryContent}
          />
          <ItemsGrid
            items={currentItems}
            selectedAsset={selectedItems[subCategory]}
            onSelect={(asset) => handleItemSelect(subCategory, asset)}
          />
        </BottomSheetContainer>
      </PageWrapper>
    </AppContainer>
  )
}
