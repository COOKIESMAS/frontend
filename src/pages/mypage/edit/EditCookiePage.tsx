import styled from 'styled-components'
import { useAtomValue, useSetAtom } from 'jotai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { dialogAtom } from '@/store/dialog'
import CookieImageRenderer from '@/components/cookie/CookieImageRenderer'
import CategoryTabs from '@/components/cookie/CategoryTabs'
import SubCategoryTabs from '@/components/cookie/SubCategoryTabs'
import ItemsGrid from '@/components/cookie/ItemsGrid'
import { useEditUser } from '@/hooks/mutations/useEditUser'
import { selectedItemsAtom } from '@/store/atoms/cookieAtoms'
import { useQueryClient } from '@tanstack/react-query'

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

export default function EditCookiePage() {
  const navigate = useNavigate()
  const setDialogState = useSetAtom(dialogAtom)
  const selectedItems = useAtomValue(selectedItemsAtom)
  const { mutate } = useEditUser()
  const queryClient = useQueryClient()

  const handleGoBack = () => {
    setDialogState({
      isOpen: true,
      title: '나가시겠습니까?',
      message: '만들던 쿠키가 사라져요!',
      onConfirm: () => navigate('/mypage'),
      onCancel: () => {},
    })
  }

  const handleSubmit = () => {
    mutate(
      {
        designData: selectedItems,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
          navigate('/mypage')
        },
        onError: () => {
          alert('알 수 없는 에러 발생.')
          navigate('/home')
        },
      },
    )
  }

  return (
    <AppContainer>
      <PageWrapper>
        <HeaderWrapper>
          <HeaderLeft>
            <BackButton onClick={handleGoBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </BackButton>
            <PageTitle>대표쿠키</PageTitle>
          </HeaderLeft>
          <ButtonGroup>
            <CompleteButton onClick={handleSubmit}>저장</CompleteButton>
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
