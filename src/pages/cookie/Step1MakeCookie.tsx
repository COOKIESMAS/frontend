import styled from 'styled-components'
import { useSetAtom } from 'jotai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { dialogAtom } from '@/store/dialog'
import CookieImageRenderer from '@/components/cookie/CookieImageRenderer'
import CategoryTabs from '@/components/cookie/CategoryTabs'
import SubCategoryTabs from '@/components/cookie/SubCategoryTabs'
import ItemsGrid from '@/components/cookie/ItemsGrid'
import { randomizeSelectedItemsAtom } from '@/store/effects/cookieRandomEffects'
import { useCookieParts } from '@/hooks/queries/useCookieParts'
import { cookieStepAtom } from '@/store/atoms/cookieStepAtoms'

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
  background-color: #e8c696;
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
  font-family: 'Galmuri14';
  font-size: 15px;
  margin: 0;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

const GradientButton = styled.button`
  font-family: 'IM_Hyemin';
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
  border: none;
  color: white;
  box-shadow: 2px 2px 1px #666;
`

const CompleteButton = styled.button`
  font-family: 'IM_Hyemin';
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 700;
  background: black;
  color: white;
  box-shadow: 2px 2px 1px #666;
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
  const setCookieStep = useSetAtom(cookieStepAtom)
  const { data } = useCookieParts()

  const triggerRandomize = useSetAtom(randomizeSelectedItemsAtom)

  const handleGoBack = () => {
    setDialogState({
      isOpen: true,
      title: '나가시겠습니까?',
      message: '만들던 쿠키가 사라져요!',
      onConfirm: () => navigate('/home'),
      onCancel: () => {},
    })
  }

  const handleGoNext = () => {
    setCookieStep('step2')
    navigate('/cookie/step2')
  }

  const randomizeAllParts = () => {
    if (!data) return

    triggerRandomize({
      partsData: data,
      keepProbability: 0.5,
    })
  }

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
            <GradientButton onClick={randomizeAllParts}>
              랜덤 바꾸기
            </GradientButton>
            <CompleteButton onClick={handleGoNext}>완성 !</CompleteButton>
          </ButtonGroup>
        </HeaderWrapper>
        <CookieImageRenderer />
        <BottomSheetContainer>
          <CategoryTabs />
          <SubCategoryTabs />
          <ItemsGrid />
        </BottomSheetContainer>
      </PageWrapper>
    </AppContainer>
  )
}
