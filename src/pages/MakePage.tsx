import { useState, type CSSProperties } from 'react'
import styled from 'styled-components'
import { useSetAtom } from 'jotai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import pen1 from '@/assets/image/pen_1.svg'
import { itemsData } from '@/constant/items'
import { dialogAtom } from '@/store/dialog'

// --- TYPE DEFINITIONS ---
interface Item {
  name: string
  asset: string
}

type ItemCategory = { [key: string]: Item[] }

interface ItemsData {
  face: ItemCategory
  clothes: ItemCategory
}

interface SelectedItems {
  body: string | null
  eyes: string | null
  mouth: string | null
  hair: string | null
  blush: string | null
  hat: string | null
  top: string | null
  pants: string | null
  onePiece: string | null
}

// --- STYLED COMPONENTS (unchanged) ---

const FlexWrapper = styled.div<{
  direction?: 'row' | 'column'
  justify?: string
  align?: string
  gap?: string
  wrap?: string
  width?: string
  height?: string
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'start'};
  gap: ${(props) => props.gap || '0'};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`

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
  background-color: #e8c7c7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const HeaderWrapper = styled(FlexWrapper)`
  align-items: end;
`

const HeaderLeftWrapper = styled(FlexWrapper)`
  align-items: center;
`

const StyledButton = styled.button`
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  background-color: black;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
`

const GradientButton = styled(StyledButton)`
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
  box-shadow: 0 0 5px rgba(255, 192, 203, 0.7);
  color: white;
`

const CompleteButton = styled(StyledButton)`
  color: white;
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
  transform: translate(-50%, -50%);
  width: 80%;
  height: auto;
  z-index: ${(props) => props.zIndex};
`

const CookiePenImg = styled(CookiePartImg)`
  width: 80%;
`

const BottomSheetWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
`

const Tab = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  color: ${(props) => (props.isActive ? 'black' : '#aaa')};
  cursor: pointer;
  padding: 5px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 5px;
`

const SelectItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  padding-top: 100%;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.isSelected ? '#87CEEB' : 'transparent')};
  transition: border-color 0.2s ease-in-out;
  user-select: none; /* Standard property */
  -webkit-user-drag: none; /* Safari, Chrome */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`

// --- Z-INDEX & STYLE MAPPINGS ---
const zIndexMap: { [key in keyof SelectedItems]?: number } = {
  body: 2,
  onePiece: 3,
  top: 3,
  pants: 3,
  blush: 4,
  mouth: 5,
  eyes: 5,
  hair: 6,
  hat: 7,
}

const styleMap: { [key in keyof SelectedItems]?: CSSProperties } = {
  body: { width: '60%', transform: 'translate(-50%, -50%)' },
  eyes: { width: '15%', transform: 'translate(-50%, -500%)' },
  mouth: { width: '8%', transform: 'translate(-50%, -250%)' },
  hair: { width: '37%', transform: 'translate(-50%, -150%)' },
  blush: { width: '20%', transform: 'translate(-50%, -500%)' },
  hat: { width: '70%', transform: 'translate(-50%, -70%)' },
  top: { width: '60%', transform: 'translate(-50%, -50%)' },
  pants: { width: '60%', transform: 'translate(-50%, -50%)' },
  onePiece: { width: '60%', transform: 'translate(-50%, -50%)' },
}

function MakePage() {
  const navigate = useNavigate()
  const setDialogState = useSetAtom(dialogAtom)

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    body: itemsData.face.body[0].asset,
    eyes: null,
    mouth: null,
    hair: null,
    blush: null,
    hat: null,
    top: null,
    pants: null,
    onePiece: null,
  })

  const [mainCategory, setMainCategory] = useState<keyof ItemsData>('face')
  const [subCategory, setSubCategory] = useState<string>('body')

  const handleItemSelect = (
    keyToUpdate: keyof SelectedItems,
    asset: string | null,
  ) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev, [keyToUpdate]: asset }

      // Exclusive selection logic for clothes
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

  const typedItemsData = itemsData as ItemsData

  const currentSubCategories = Object.keys(typedItemsData[mainCategory])
  const currentItems: Item[] = typedItemsData[mainCategory][subCategory] || []

  return (
    <AppContainer>
      <PageWrapper>
        <HeaderWrapper
          justify="space-between"
          align="start"
          width="100%"
          style={{ padding: '10px' }}
        >
          <HeaderLeftWrapper>
            <BackButton onClick={handleGoBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </BackButton>
            <PageTitle>쿠키만들기</PageTitle>
          </HeaderLeftWrapper>
          <FlexWrapper gap="4px">
            <GradientButton>랜덤 바꾸기</GradientButton>
            <CompleteButton>완성 !</CompleteButton>
          </FlexWrapper>
        </HeaderWrapper>

        <CookieWrapper>
          <CookiePenImg src={pen1} alt="dish" zIndex={1} />
          {Object.entries(selectedItems).map(([key, asset]) => {
            if (!asset) return null
            const typedKey = key as keyof SelectedItems
            return (
              <CookiePartImg
                key={key}
                src={asset}
                alt={`${key} item`}
                zIndex={zIndexMap[typedKey] || 0}
                style={styleMap[typedKey] || {}}
              />
            )
          })}
        </CookieWrapper>

        <BottomSheetWrapper>
          <TabsContainer>
            {Object.keys(typedItemsData).map((cat) => (
              <Tab
                key={cat}
                isActive={mainCategory === (cat as keyof ItemsData)}
                onClick={() => {
                  const newMainCat = cat as keyof ItemsData
                  setMainCategory(newMainCat)
                  // Set subCategory to the first one in the new main category
                  const firstSubCategory = Object.keys(
                    typedItemsData[newMainCat],
                  )[0]
                  setSubCategory(firstSubCategory)
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Tab>
            ))}
          </TabsContainer>

          <TabsContainer>
            {currentSubCategories.map((subCat) => (
              <Tab
                key={subCat}
                isActive={subCategory === subCat}
                onClick={() => setSubCategory(subCat)}
              >
                {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
              </Tab>
            ))}
          </TabsContainer>

          <GridContainer>
            {currentItems.map((item) => (
              <SelectItem
                key={item.name}
                isSelected={
                  selectedItems[subCategory as keyof SelectedItems] ===
                  item.asset
                }
                onClick={() =>
                  handleItemSelect(
                    subCategory as keyof SelectedItems,
                    item.asset,
                  )
                }
              >
                <img src={item.asset} alt={item.name} draggable="false" />
              </SelectItem>
            ))}
            <SelectItem
              isSelected={
                selectedItems[subCategory as keyof SelectedItems] === null
              }
              onClick={() =>
                handleItemSelect(subCategory as keyof SelectedItems, null)
              }
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '14px',
                }}
              >
                None
              </div>
            </SelectItem>
          </GridContainer>
        </BottomSheetWrapper>
      </PageWrapper>
    </AppContainer>
  )
}

export default MakePage
