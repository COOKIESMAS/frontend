import React, { useState } from 'react'
import styled from 'styled-components'
import pen1 from '../assets/image/pen_1.svg'
import body1 from '../assets/image/body_1.png'
import hairTwin from '../assets/image/hair_twin.png'
import { itemsData } from '../constant/items'

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
  align-items: ${(props) => props.align || 'stretch'};
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
  background-color: #f0f2f5; /* A neutral background for the whole page */
`

const PageWrapper = styled.main`
  position: relative;
  max-width: 375px;
  width: 100%;
  height: 100%; /* Typical mobile screen height */
  background-color: #e8c7c7;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevents content from spilling out */
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px 0;
`

const CookieWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 380px;
  margin: 0 auto;
  flex-shrink: 0; /* Prevents the cookie from shrinking */
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
const CookieBodyImg = styled(CookiePartImg)`
  width: 60%;
`
const CookieHairImg = styled(CookiePartImg)`
  width: 60%;
  transform: translate(-50%, -64%);
`

const BottomSheetWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex-grow: 1; /* Fills available vertical space */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures content within is scrollable if needed */
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
  flex-grow: 1; /* Occupies remaining space */
  overflow-y: auto; /* Enables scrolling */
  padding: 10px 5px;
`

const SelectItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  padding-top: 100%;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.isSelected ? '#87CEEB' : 'transparent')}; /* Light blue border */
  transition: border-color 0.2s ease-in-out;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px; /* Restored to 8px to match outer border radius */
  }
`
function MakePage() {
  const [selectedItems, setSelectedItems] = useState({
    face: null,
    hat: hairTwin, // Default hair
    outfit: null,
    decorations: null,
  })
  const [mainCategory, setMainCategory] = useState('clothes')
  const [subCategory, setSubCategory] = useState('hat')

  const handleItemSelect = (keyToUpdate, asset) => {
    setSelectedItems((prev) => ({ ...prev, [keyToUpdate]: asset }))
  }

  const currentSubCategories = Object.keys(itemsData[mainCategory])
  const currentItems = itemsData[mainCategory][subCategory] || []

  // This key determines which property in `selectedItems` to check/update.
  const selectionKey =
    mainCategory === 'face' || mainCategory === 'decorations'
      ? mainCategory
      : subCategory

  return (
    <AppContainer>
      <PageWrapper>
        <FlexWrapper>
          <FlexWrapper></FlexWrapper>
          <FlexWrapper gap="4px">
            <GradientButton>랜덤 바꾸기</GradientButton>
            <CompleteButton>완성 !</CompleteButton>
          </FlexWrapper>
        </FlexWrapper>

        <CookieWrapper>
          <CookiePenImg src={pen1} alt="dish" zIndex={1} />
          <CookieBodyImg src={body1} alt="cookie body" zIndex={2} />
          {Object.entries(selectedItems).map(
            ([key, asset]) =>
              asset && (
                <CookieHairImg
                  key={key}
                  src={asset}
                  alt={`${key} item`}
                  zIndex={key === 'outfit' ? 3 : 4} // Example z-index logic
                />
              ),
          )}
        </CookieWrapper>

        <BottomSheetWrapper>
          <TabsContainer>
            {Object.keys(itemsData).map((cat) => (
              <Tab
                key={cat}
                isActive={mainCategory === cat}
                onClick={() => {
                  setMainCategory(cat)
                  setSubCategory(Object.keys(itemsData[cat])[0])
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Tab>
            ))}
          </TabsContainer>

          {currentSubCategories.length > 1 && (
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
          )}

          <GridContainer>
            {currentItems.map((item) => (
              <SelectItem
                key={item.name}
                isSelected={selectedItems[selectionKey] === item.asset}
                onClick={() => handleItemSelect(selectionKey, item.asset)}
              >
                <img src={item.asset} alt={item.name} />
              </SelectItem>
            ))}
            <SelectItem
              isSelected={selectedItems[selectionKey] === null}
              onClick={() => handleItemSelect(selectionKey, null)}
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
